import React, { useState, useEffect, useMemo } from 'react'
import fetchWWEChampions from './APICall.jsx'
import DataTable from 'react-data-table-component';
import styled, {keyframes} from 'styled-components';


const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	margin: 16px;
	animation: ${rotate360} 1s linear infinite;
	transform: translateZ(0);
	border-top: 2px solid grey;
	border-right: 2px solid grey;
	border-bottom: 2px solid grey;
	border-left: 4px solid black;
	background: transparent;
	width: 80px;
	height: 80px;
	border-radius: 50%;
`;

const CustomLoader = () => (
	<div style={{ padding: '24px' }}>
		<Spinner />
		<div>Loading Champions...</div>
	</div>
);


const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Championship',
        selector: row => row.championship.map(c=>c.title).join(','),
        sortable: false,
        wrap: true,
    },
    {
        name: 'Reigns',
        selector: row => row.totalReigns,
        sortable: true,
    },
    {
        name: 'Total Days Held',
        selector: row => row.totalDaysHeld,
        sortable: true,
        format: row => row.totalDaysHeld.toLocaleString(),
    },
];




export const WrestlerTable = () => {
    
    // Remember to add search functionality
    const [pending, setPending] = React.useState(true);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchWWEChampions()
            .then((result) => {
                setData(result);
                setPending(false);
            });
        },2000);
        return () => clearTimeout(timeout);
    },[]);

    const filteredData = data.filter(wrestler => {
        const term = searchTerm.toLowerCase();

        const name = wrestler.name.toLowerCase().includes(term);

        const reigns = wrestler.totalReigns.toString().includes(term);

        const days = wrestler.totalDaysHeld.toString().includes(term);

        return name || days || reigns
    })
    
    return (
        <div>

            <input
                placeholder="Search"
                type = "text"
                value = {searchTerm}
                onChange = {(e) => setSearchTerm(e.target.value)}
                className = "form-control-sm border ps-3"
            />

            <DataTable
                columns={columns}
                data={filteredData}
                progressPending={pending}
                progressComponent={<CustomLoader />}
                pagination
                paginationPerPage={20}
                highlightOnHover
                dense
                striped
                
                //title = "WWE Champions"
            />



        </div>
        
    );

};
