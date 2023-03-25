import React, { useState, useEffect } from "react";

// only need props as a param if we are passing in props t this component

const Add = (props) => {
  let emptyperson = { name: "", age: "" };
  const [person, setPerson] = useState(emptyperson);

  //`const handleChange = (event) => { ... }`
  // This defines a constant variable named handleChange and assigns an arrow function to it. The arrow function takes a single argument, event, which represents the event object passed to the function when an input change occurs.

  // setPerson({...person, [event.target.name]: event.target.value})
  // Inside the arrow function, the setPerson function is called, which is likely a state updater function from a useState hook in a React functional component. The purpose of this function is to update the person object with the new input value.

  // ...person (spread operator)
  // This syntax creates a shallow copy of the existing person object. This is done to ensure immutability, a core concept in React state management. By creating a new object, you avoid modifying the original state directly, which could lead to unexpected side effects.

  // [event.target.name]: event.target.value
  // This is a computed property name, which uses the name attribute of the input element (event.target.name) as the property key and assigns the input value (event.target.value) as the corresponding value.

  // When the handleChange function is called upon an input change, it will update the person object with the new input value for the corresponding property, based on the input element's name attribute.

  const handleChange = (event) => {
    setPerson({ ...person, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleCreate(person);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="age">Age: </label>
        <input type="number" name="age" onChange={handleChange} />
        <input type="submit" />
      </form>
    </>
  );
};
export default Add;
