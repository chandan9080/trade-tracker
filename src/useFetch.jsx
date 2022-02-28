import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [Data, setData] = useState([]);
  const [Error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  }, [url]);
  return { Data, Error, isLoading };
};
export default useFetch;
