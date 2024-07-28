import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Create({ getData, editItem, setEditItem }) {
  const [todoName, setTodoName] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  useEffect(() => {
    if (editItem) {
      setTodoName(editItem.Name);
      setTodoDescription(editItem.Description);
    }
  }, [editItem]);

  const handleNameChange = (e) => {
    setTodoName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTodoDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editItem) {
      // Update existing item
      try {
        const res = await axios.put(
          `https://66a5ee0523b29e17a1a14b1b.mockapi.io/Todo/${editItem.id}`,
          {
            Name: todoName,
            Description: todoDescription,
            Status: editItem.Status,
          }
        );
        if (res.status === 200) {
          toast.success("Task updated successfully");
          getData();
          setEditItem(null);
          setTodoName("");
          setTodoDescription("");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // Add new item
      try {
        const res = await axios.post(
          "https://66a5ee0523b29e17a1a14b1b.mockapi.io/Todo",
          {
            Name: todoName,
            Description: todoDescription,
            Status: false,
          }
        );
        if (res.status === 201) {
          toast.success("Task created successfully");
          getData();
          setTodoName("");
          setTodoDescription("");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form
        className='mt-3 d-flex justify-content-center'
        onSubmit={handleSubmit}
      >
        <div
          className='row justify-content-center align-items-end'
          style={{ width: "100%", maxWidth: "800px" }}
        >
          <div className='col-12 col-md-4 mb-3'>
            <label htmlFor='todoname' className='form-label'></label>
            <input
              type='text'
              id='todoname'
              className='form-control custom-outline'
              placeholder='Todo Name'
              value={todoName}
              onChange={handleNameChange}
              style={{ width: "100%" }}
            />
          </div>
          <div className='col-12 col-md-4 mb-3'>
            <label htmlFor='tododescription' className='form-label'></label>
            <input
              type='text'
              id='tododescription'
              className='form-control custom-outline'
              placeholder='Todo Description'
              value={todoDescription}
              onChange={handleDescriptionChange}
              style={{ width: "100%" }}
            />
          </div>
          <div className='col-12 col-md-2 mb-3 d-flex justify-content-center'>
            <button type='submit' className='btn btn-success'>
              {editItem ? "Save Changes" : "Add Todo"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Create;
