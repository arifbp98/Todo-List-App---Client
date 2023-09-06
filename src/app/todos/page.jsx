"use client";

import { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import axios from "axios";
// import EditTodo from "../components/EditTodo";

export default function TodosPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await axios.get(
          `http://localhost:8088/api/todo/${id}`
        );
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  async function handleDelete(id) {
    await axios.delete(`http://localhost:8088/api/todo/${id}`);
    window.location.reload()
  }

  return (
    <>
      <div className="px-10 mt-10">
        <AddTodo />
      </div>
      <div className="overflow-x-auto p-10 min-h-screen">
        <table className="table">
          <thead>
            <tr className="text-white">
              <th>#</th>
              <th>Activity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((todo, index) => (
              <tr key={todo.id}>
                <th>{index + 1}</th>
                <td>{todo.activity}</td>
                <td>{todo.completed ? "Completed" : "Not Completed"}</td>
                <td className="flex gap-4">
                  {/* <button className="btn btn-primary"
                  
                  onClick={() => handleEdit(todo.id)}>Edit</button> */}
                  {/* <EditTodo /> */}

                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
