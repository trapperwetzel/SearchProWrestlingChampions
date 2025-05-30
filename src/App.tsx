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

            const table = doc.querySelector("table.wikitable.sortable");
// <table class="mw-datatable wikitable sortable sticky-header-multi jquery-tablesorter"
            if (!table) {
                console.warn("❌ Table not found.");
                return;
            }

            const rows = table.querySelectorAll("tbody tr");
            const result = [];

            for (const row of rows) {
                const cells = row.querySelectorAll("td, th");

                // Some rows (like headers or federation rows) won't have enough cells
                if (cells.length < 9) continue;

                // Extract relevant cell text
                const values = Array.from(cells).map((cell) =>
                    cell.textContent.trim().replace(/\[\d+\]/g, '') // Remove reference numbers like [1]
                );

                const item = {
                    no: values[0],
                    champion: values[1],
                    date: values[2],
                    event: values[3],
                    location: values[4],
                    reign: values[5],
                    days: values[6],
                    daysRecognized: values[7],
                    notes: values[8]
                };

                result.push(item);
            }

            console.log(`✅ Parsed ${result.length} WWE champion entries`);
            console.log("🔍 First 5 entries:");
            console.table(result.slice(0, 5));
        })
        .catch((err) => {
            console.error("⚠️ Error fetching/parsing Wikipedia:", err);
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
