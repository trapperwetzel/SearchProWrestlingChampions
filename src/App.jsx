import React, { useState, useEffect } from 'react'
import './App.css'
import styled from '@emotion/styled';
import { WrestlerRows, WrestlerMoreInfo } from './components/WrestlerRows.jsx';
import fetchWWEChampions from './components/APICall.jsx';
import useWWEChampions from './components/useWWEChampions.jsx';
import { FilterButton } from './components/FilterButton.jsx';
const Title = styled.h1`
    text-align: center;
    font-color: white;
`;

const TwoColumnLayout = styled.div`
    display: "grid",
    grid-template-columns: "repeat(auto-fit, minmax(200px, 1fr))",
    grid-column-gap: "1rem",
`;

function App() {
    const {data:wrestlerData} = useWWEChampions();
    const [filter, filterSet] = React.useState("");
    const [selectedItem, selectedItemSet] = React.useState(null);
    const [filteredData, setFilterData] = React.useState(wrestlerData);


    React.useEffect(() => {
        setFilterData(wrestlerData); 
    }, [wrestlerData]);


    return (
        <div
            style={{
                margin: "auto",
                width: 800,
                paddingTop: "1rem",
            }}
        >
            <Title>Pro Wrestler Search</Title>
            <FilterButton data={filteredData} setData={setFilterData} originalData = {wrestlerData} />

            

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
                            {filteredData
                                .filter((wrestlerData) => wrestlerData.name.toLowerCase().includes(filter.toLowerCase()))
                                .map((wrestlerData) => (
                                    <WrestlerRows
                                    key={wrestlerData.id} 
                                    wrestler={wrestlerData}
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
