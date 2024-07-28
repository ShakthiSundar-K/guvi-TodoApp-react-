import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function View({ data, error, getData, setEditItem }) {
  const [filter, setFilter] = useState("All");

  const handleStatusChange = async (id, event) => {
    const newStatus = event.target.value === "Completed";
    try {
      await axios.put(
        `https://66a5ee0523b29e17a1a14b1b.mockapi.io/Todo/${id}`,
        {
          Status: newStatus,
        }
      );
      toast.success("Status changed successfully");
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://66a5ee0523b29e17a1a14b1b.mockapi.io/Todo/${id}`
      );
      toast.success("Task deleted successfully");
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredData = data.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Completed") return item.Status;
    if (filter === "Not Completed") return !item.Status;
    return true;
  });

  return (
    <div className='container'>
      <div className='row mb-4 d-flex justify-content-end'>
        <div className='col d-flex justify-content-end'>
          <label htmlFor='filter' className='form-label me-2'>
            Status Filter:
          </label>
          <select id='filter' value={filter} onChange={handleFilterChange}>
            <option value='All'>All</option>
            <option value='Completed'>Completed</option>
            <option value='Not Completed'>Not Completed</option>
          </select>
        </div>
      </div>
      {error ? (
        <p>Error: {error}</p>
      ) : filteredData.length > 0 ? (
        <div className='row'>
          {filteredData.map((item) => (
            <div key={item.id} className='col-md-4 mb-4 mt-4'>
              <div className='card taskdetails'>
                <div className='card-body d-flex flex-column justify-content-between'>
                  <div>
                    <p>Name : {item.Name}</p>
                    <p>Description : {item.Description}</p>
                    <label htmlFor={`status-${item.id}`} className='form-label'>
                      Status :
                    </label>
                    <select
                      id={`status-${item.id}`}
                      value={item.Status ? "Completed" : "Not Completed"}
                      onChange={(event) => handleStatusChange(item.id, event)}
                      className='ms-3'
                    >
                      <option value='Not Completed'>Not Completed</option>
                      <option value='Completed'>Completed</option>
                    </select>
                  </div>
                  <div className='mt-3 d-flex justify-content-end'>
                    <button
                      className='btn btn-primary me-2'
                      onClick={() => setEditItem(item)}
                    >
                      Edit
                    </button>
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default View;
