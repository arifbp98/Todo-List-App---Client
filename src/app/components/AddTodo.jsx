"use client";

import { useState } from "react";
import axios from "axios";

export default function AddTodo() {
  const [activity, setActivity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleAdd(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const id = localStorage.getItem("id");
      await axios.post(`http://localhost:8088/api/todo`, {
        activity,
        userId: Number(id),
      });
      setIsLoading(false);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <button
        className="btn btn-info text-white hover:bg-blue-500"
        onClick={() => modal_add.showModal()}
      >
        Add New Todo
      </button>
      <dialog id="modal_add" className="modal">
        <form
          method="dialog"
          className="modal-box text-white"
          onSubmit={handleAdd}
        >
          <h3 className="font-bold text-lg">Add New Todo</h3>
          <p className="py-4 text-sm">Fill the form</p>
          <div className="form-control w-full">
            <label className="label font-bold">Activity</label>
            <input
              type="text"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="input input-bordered"
              placeholder="Activity Name"
              required
            />
          </div>
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-error"
              onClick={() => modal_add.close()}
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Add"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
