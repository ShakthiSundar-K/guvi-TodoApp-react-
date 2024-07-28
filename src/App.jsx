import React from "react";
import Create from "./components/Create";
import View from "./components/View";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [editItem, setEditItem] = useState(null); // State to store item being edited

  const getData = async () => {
    try {
      const res = await axios.get(
        "https://66a5ee0523b29e17a1a14b1b.mockapi.io/Todo"
      );
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='App'>
      <h2 className='text-center'>My Todo</h2>
      <Create getData={getData} editItem={editItem} setEditItem={setEditItem} />
      <View
        data={data}
        error={error}
        getData={getData}
        setEditItem={setEditItem}
      />
    </div>
  );
}

export default App;
