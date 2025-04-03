import { useState } from 'react'

const Person = ({name}) => {
  return <li>{name}</li>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if(isValidContact(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName
      } 
      setPersons(persons.concat(person));
    }
    setNewName("");

  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const isValidContact = (name) => persons.some(person => person.name === name);
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handleNoteChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(person =>
          <Person key={person.name} name={person.name} />
        )}
    </div>
  )
}

export default App