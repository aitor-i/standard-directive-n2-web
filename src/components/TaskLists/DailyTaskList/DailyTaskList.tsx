"use client";
import React, { useState } from "react";

export default function DailyTaskList() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submit!!!");
    closeModalHandler();
  };
  return (
    <div className="flex flex-col flex-1 p-4 ">
      <h3>Daily Tasks</h3>
      <button onClick={() => openModalHandler()} className="primary">
        {" "}
        +{" "}
      </button>
      {isModalOpen ? (
        <div className="debug p-4">
          <h4>Add a tasks</h4>
          <form onSubmit={onSubmitHandler}>
            <section>
              <label htmlFor="">Task Name</label>
              <input type="text" name="taskName" />
            </section>
            <section>
              <label htmlFor="">Start Time</label>
              <select>
                <option>1AM </option>
              </select>
            </section>
            <div className="flex gap-4">
              <button onClick={() => console.log("AAAAA")} className="primary">
                Save
              </button>
              <button className="danger">Dismiss</button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
