import { useEffect, useState } from 'react';
import fetchWWEChampions from './APICall';

const useWWEChampions = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWWEChampions().then((data) => {
            setData(data);
            setLoading(false);
        })
    
    .catch((err) => {
        setError(err);
        setLoading(false);
    });
},[]);

return {data, loading, error};
}






export default useWWEChampions;