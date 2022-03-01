import React, { useState } from "react";
import "./App.css";
import contactsData from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));

  const randomContact = () => {
    const random =
      contactsData[Math.floor(Math.random() * contactsData.length)];
      
    setContacts([random, ...contacts]);
  };

  const sortName = () => {
    const sorted = [...contacts];

    sorted.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    setContacts(sorted);
  };

  const sortPop = () => {
    const sorted = [...contacts];

    sorted.sort((a, b) => {
      return b.popularity - a.popularity
    })
    setContacts(sorted)
  }

  const deleteContact = (contactId) => {
    const filteredContacts = contacts.filter((contact) => {
      return contact.id !== contactId;
    });
    setContacts(filteredContacts);
  };

  return (
    <div className="App">
      <h1>Ironcontacts</h1>
      <div className="buttons">
      <button onClick={() => randomContact()}>Add random Contact</button>
      <button onClick={() => sortPop()}>Sort By Popularity</button>
      <button onClick={() => sortName()}>Sort By Name</button>
      </div>
      <table>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Actions</th>
        </tr>
        {contacts.map((person) => {
          return (
            <tr key={person._id}>
              <td>
                <img
                  src={person.pictureUrl}
                  alt={person.name}
                  className="person"
                />
              </td>
              <td>{person.name}</td>
              <td>{Math.round(person.popularity * 100) / 100}</td>
              <td>{person.wonOscar ? <p>🏆</p> : <p></p>}</td>
              <td>{person.wonEmmy ? <p>🌟</p> : <p></p>}</td>
              <td>
                <button onClick={() => deleteContact(person.id)}>Remove</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
