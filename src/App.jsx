import React, { useState, useEffect } from 'react'
import './App.css'
import styled from '@emotion/styled';
import { WrestlerRows, WrestlerMoreInfo } from './components/WrestlerRows.jsx';
import fetchWWEChampions from './components/APICall.jsx';
import useWWEChampions from './components/useWWEChampions.jsx';

const Title = styled.h1`
    text-align: center;
    
`;

const TwoColumnLayout = styled.div`
    display: "grid",
    grid-template-columns: "repeat(auto-fit, minmax(200px, 1fr))",
    grid-column-gap: "1rem",
`;

function App() {
    const {data:wrestler} = useWWEChampions();
    const [filter, filterSet] = React.useState("");
    const [selectedItem, selectedItemSet] = React.useState(null);

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
                                <th>Championship</th>
                                <th>Total Days Held</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wrestler
                                .filter((wrestler) => wrestler.name.toLowerCase().includes(filter.toLowerCase()))
                                .map((wrestler) => (
                                    <WrestlerRows
                                    key={wrestler.id} 
                                    wrestler={wrestler}
                                    />
                                ))}
                        </tbody>
                    </table>
                </div>
                
            </div>

        </div>
    );
}

export default App
