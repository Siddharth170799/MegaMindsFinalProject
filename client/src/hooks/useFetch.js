import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = (url, type) => {     /// custom hook is being created using use keyword
  const [data, setData] = useState([]);    /// here the data is initially an empty array
  const [loading,setLoading] = useState(false)  /// to display the loading spinner initially
  const navigate = useNavigate();

  const fetchingData = async (
    body1 = null,
    methodType = type,
    customUrl = url
  ) => {
    setLoading(true)
    try {
      const object = {
        method: methodType,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,  /// here retrieving and setting the token with req body everytime
        },
      };

      if (body1) {
        object.body = JSON.stringify(body1);
      }
      const response = await fetch(customUrl, object);

      if (response.status === 401 || response.status === 403) {  /// if the token does not exists if middleware returns 403 we are navigating to the signin
        navigate("/signIn");
        return;
      }
      const response2 = await response.json();
      setData(response2);

      return response2;  /// returning reponse for every api call
    } catch (err) {
      return err.message   /// returning an error message
    }finally{
      setLoading(false)   /// loading is set to false when the finally block runs
    }
  };
  useEffect(() => {
    fetchingData();
  }, []);

  return { data, fetchingData,loading,setLoading };  /// returning the state varibales and functions when the custom hook is called
};

export default useFetch;
