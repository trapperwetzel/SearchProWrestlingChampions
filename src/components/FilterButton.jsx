import React from "react";
import fetchWWEChampions from "./APICall";
// filter button for filtering the results


export const FilterButton = ({ data, setData, originalData }) => {
  const sortDataAZ = () => {
    const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
    setData(sorted);
  };

  const sortDataTimesHeld = () => {
    const sorted = [...data].sort((a, b) => 
      parseInt(b.championships[0].times) - parseInt(a.championships[0].times)
    );
    setData(sorted);
  };

  const sortDataDaysHeld = () => {
    const sorted = [...data].sort((a, b) => 
      parseInt(b.totaldaysHeld) - parseInt(a.totaldaysHeld)
    );
    setData(sorted);
  };

  const clearFilters = () => {
    setData([...originalData]); // reset to the original unmodified data
  };

  return (
    <>
      <button onClick={sortDataAZ}>Sort A-Z</button>
      <button onClick={sortDataTimesHeld}>Sort by Reigns</button>
      <button onClick={sortDataDaysHeld}>Sort by Days</button>
      <button onClick={clearFilters}>Clear Filters</button>
    </>
  );
};




  






