import React, { useState } from 'react'
import './App.css'
import styled from '@emotion/styled';
import { WrestlerMoreInfo, WrestlerRows, } from './WrestlerRows';
import type { Wrestler } from './WrestlerRows';

const Title = styled.h1`
    text-align: center;
`;

const TwoColumnLayout = styled.div`
    display: "grid",
    grid-template-columns: "repeat(auto-fit, minmax(200px, 1fr))",
    grid-column-gap: "1rem",
`;

function App() {

    const [filter, filterSet] = React.useState("");
    const [wrestler, wrestlerSet] = React.useState<Wrestler[]>([]);
    const [selectedItem, selectedItemSet] = React.useState<Wrestler | null>(null);
    React.useEffect(() => {
    fetch("https://en.wikipedia.org/w/api.php?action=parse&page=List_of_WWE_Champions&format=json&origin=*")
        .then((resp) => resp.json())
        .then((data) => {
            const htmlContent = data?.parse?.text?.["*"];
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, "text/html");

            const tables = doc.querySelectorAll("table.wikitable.sortable");
            const table = tables[2]; // Confirmed target

            if (!table) {
                console.warn("❌ Target table not found.");
                return;
            }

            const rows = table.querySelectorAll("tbody tr");
            const result = [];

            rows.forEach((row, index) => {
                if (index < 2) return; // Skip first two rows

                const cells = row.querySelectorAll("th, td");
                const values = Array.from(cells).map((cell) =>
                    cell.textContent.trim().replace(/\[\d+\]/g, '')
                );

                const item = {
                    rank: parseInt(values[0]),
                    champion: values[1],
                    reigns: values[2],
                    daysActual: values[3],
                };

                result.push(item);
            });

            result.sort((a, b) => a.rank - b.rank);
            console.log(typeof result[0].rank);
            console.log(` Parsed ${result.length} entries from combined reigns table`);
            console.table(result);

        })
        .catch((err) => {
            console.error(" Error fetching/parsing Wikipedia:", err);
        });
}, []);





    React.useEffect(() => {
        fetch("http://localhost:5173/wrestlers.json")
            .then((resp) => resp.json())
            .then((data) => wrestlerSet(data));
    },[]);

    return (
        <div
            style={{
                margin: "auto",
                width: 800,
                paddingTop: "1rem",
            }}
        >
            <Title>Pro Wrestler Search</Title>

            <div>
                <div>
                    <input
                        value={filter}
                        onChange={(evt) => filterSet(evt.target.value)}
                    />
                    <table className="wrestlertable" width="100%">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Championships</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wrestler
                                .filter((wrestler) => wrestler.name.toLowerCase().includes(filter.toLowerCase()))
                                .map((wrestler) => (
                                    <WrestlerRows wrestler={wrestler}
                                    key={wrestler.id}
                                    onSelect={(wrestler) => selectedItemSet(wrestler)} />
                                ))}
                        </tbody>
                    </table>
                </div>
                {selectedItem && <WrestlerMoreInfo wrestler={selectedItem} />}
            </div>

        </div>
    );
}

export default App
