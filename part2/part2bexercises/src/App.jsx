import { useEffect, useState } from 'react'
import contactsService from './services/contactsService'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Person = ({id, name, number, setPersons, persons}) => {

  const confirmDelete = () => {
    
    if(window.confirm(`Delete ${name} ?`)){
      contactsService
      .del(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id ))
      })
    }
}

  return (
    <div>
      <li>{name}, {number} <button onClick={confirmDelete}>delete</button></li>
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

const FormPersons = ({persons, setPersons, newName, newNumber, handleNameChange, handleNumberChange, setNewName, setNewNumber, setAddMessage}) => {

  const addPerson = (event) => {

    const existingPerson = personFind(newName)
    event.preventDefault()

    if(isValidContact(newName)) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if(confirm){

        const person = { 
          ...existingPerson,
          number: newNumber
         }
         contactsService
        .update(existingPerson.id, person)
        .then(updatedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))

          setAddMessage(
            `Contact "${existingPerson.name}" modified successfully`
          )
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
          
        })
        .catch(error => {
          setAddMessage(
            `${error.response.data.error}`
          )
          setTimeout(() => {
            setAddMessage(null)
          }, 5000)
        })
      }
    } 
    else {

      const person = {
        name: newName,
        number: newNumber
       }
      contactsService
      .create(person)
      .then(person => {
        setPersons(persons.concat(person))

        setAddMessage(
          `Contact "${person.name}" added successfully`
        )
        setTimeout(() => {
          setAddMessage(null)
        }, 5000)

      })
      .catch(error => {
        setAddMessage(
          `${error.response.data.error}`
        )
        setTimeout(() => {
          setAddMessage(null)
        }, 5000)
      })
    }

      /*
      axios
          .post('http://localhost:3001/persons', person)
          .then(response => {
          setPersons(persons.concat(response.data));
          })
          */
    
    setNewName("");
    setNewNumber("");
  }
  
  const isValidContact = (name) => persons.some(person => person.name === name);
  const personFind = (name) => persons.find(person => person.name === name);

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

const Persons = ({persons, setPersons,nameFilter}) => {

  return (
      persons
      .filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
      .map(person => (
        <Person key={person.id} id={person.id} name={person.name} number={person.number} setPersons={setPersons} persons={persons}/>
      ))
  )
}

const App = () => {
  
  useEffect( () => {

    contactsService
    .getAll()
    .then(contacts => {
      setPersons(contacts)
    })
    /*
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
      */
  }, [])

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [addMessage, setAddMessage] = useState(null)

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
        <Notification message={addMessage} />
        <FormPersons newName = {newName} newNumber = {newNumber}
        setNewName = {setNewName} setNewNumber = {setNewNumber}
        handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange}
        persons = {persons} setPersons = {setPersons}
        setAddMessage = {setAddMessage}
        />
      <h2>Numbers</h2>
        <Persons persons = {persons} setPersons = {setPersons} nameFilter = {nameFilter}/>
    </div>
  )
}

export default App