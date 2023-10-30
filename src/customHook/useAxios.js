import { useEffect } from "react";
import axios from "axios";

/**
 * Hook created for the axios call 
 * @argument url and setData method
 * @returns data array or false.
 */
const useAxios = (url, setData) => {
    useEffect(
      () => {
        let mounted = true;
  
        const loadData = async () => {
          const result = await axios.get(url);
          if (mounted) {
            setData(result.data);
          }
        };
        loadData();
  
        return () => {
          mounted = false;
        };
      },
      [url, setData]
    );
  };

export default useAxios;