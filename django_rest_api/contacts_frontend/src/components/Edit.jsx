import React, { useState } from "react";

const Edit = (props) => {
  // let emptyperson = {name: '', age: ''};
  const [person, setPerson] = useState({ ...props.person });

  const handleChange = (event) => {
    setPerson({ ...person, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleUpdate(person);
  };

  return (
    <>
      <details>
        <summary>Edit Person</summary>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            value={person.name}
            onChange={handleChange}
          />
          <br />
          <br />
          <label htmlFor="age">Age: </label>
          <input
            type="number"
            name="age"
            value={person.age}
            onChange={handleChange}
          />
          <input type="submit" />
        </form>
      </details>
    </>
  );
};

export default Edit;
