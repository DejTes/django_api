import React, { useState, useEffect } from "react";
import axios from "axios";

import Add from "./components/Add";
import Edit from "./components/Edit";

const App = () => {
  let [people, setPeople] = useState([]);

  const getPeople = () => {
    axios
      .get("http://localhost:8000/contacts")
      .then(
        (res) => setPeople(res.data),
        (error) => console.log(error)
      )
      .catch((error) => console.error(error));
  };

  const handleCreate = (newPerson) => {
    axios.post("http://localhost:8000/contacts", newPerson).then((res) => {
      console.log(res);
      getPeople(); // we are calling this to update the state of the current component no matter what happens
    });
  };

  const handleDelete = (event) => {
    axios
      .delete(`http://localhost:8000/contacts/${event.target.value}`)
      // we use curly brackets b/c we are not returning value -> {getPeople()}
      .then((res) => {
        getPeople();
      });
  };

  const handleUpdate = (editPerson) => {
    console.log(editPerson);
    axios
      .put(`http://localhost:8000/contacts/${editPerson.id}`, editPerson)
      .then((res) => {
        getPeople();
      });
  };

  // useEffect
  useEffect(() => {
    getPeople();
  }, []);

  return (
    <>
      {/* in this case Add.jsx is a child of App.jsx */}
      <Add handleCreate={handleCreate} />
      <div className="people">
        {people.map((person) => {
          return (
            <div className="person" key={person.id}>
              <h4>Name: {person.name}</h4>
              <h5>Age: {person.age}</h5>
              <Edit handleUpdate={handleUpdate} person={person} />
              <button onClick={handleDelete} value={person.id}>
                X
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
