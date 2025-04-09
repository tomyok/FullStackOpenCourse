import { useEffect, useState } from 'react'
import axios from 'axios'

const Person = ({name, number}) => {
  return (
    <div>
      <li>{name}, {number}</li>
    </div>
  )
}

const Filter = ({nameFilter, handleFilterChange}) => {
  
  return (
    <div>
    Filter shown with  <input value={nameFilter}
    onChange={handleFilterChange}/>
  </div>
  )
}

const FormPersons = ({persons, setPersons, newName, newNumber, handleNameChange, handleNumberChange, setNewName, setNewNumber}) => {

  const addPerson = (event) => {
    event.preventDefault()
    if(isValidContact(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const person = {
        name: newName,
        number: newNumber
      }
      axios
          .post('http://localhost:3001/persons', person)
          .then(response => {
          setPersons(persons.concat(response.data));
          })
    }
    setNewName("");
    setNewNumber("");
  }
  
  const isValidContact = (name) => persons.some(person => person.name === name);

  return (
  <form onSubmit={addPerson}>
      <div>
        name: <input value={newName}
        onChange={handleNameChange}/>
        <br />
        number: <input value={newNumber}
        onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
  </form>

  )
}

const Persons = ({persons, nameFilter}) => {

  return (
      persons
      .filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
      .map(person => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))
  )
}

const App = () => {
  
  useEffect( () => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNameFilter(event.target.value)
  }
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter nameFilter = {nameFilter} handleFilterChange = {handleFilterChange}/>
      <h2>Add a new</h2>
        <FormPersons newName = {newName} newNumber = {newNumber}
        setNewName = {setNewName} setNewNumber = {setNewNumber}
        handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange}
        persons = {persons} setPersons = {setPersons}
        />
      <h2>Numbers</h2>
        <Persons persons = {persons} nameFilter = {nameFilter}/>
    </div>
  )
}

export default App