import { useEffect, useState } from 'react';
import fetchWWEChampions from './APICall';

const useWWEChampions = () => {
    const [data, setData] = useState([]);
    

    useEffect(() => {
        fetchWWEChampions().then((data) => {
            setData(data);
            
        })
    
    .catch((err) => {
        console.log("oops");
    });
},[]);

return {data}
}






export default useWWEChampions;