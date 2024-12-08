import { useState,useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const SuccessMsg = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='success'>
      {message}
    </div>
  )
}

const ErrorMsg = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Filter = ({handler}) => (
  <div>
    filter shown with <input onChange={handler}  />
  </div>
)

const PersonForm = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange}) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons,filterInput,deleteHandler}) => {
  return(
    <>
      {persons
      .filter(p=>p.name.toLowerCase().includes(filterInput.toLowerCase()))
      .map(p=> <p key={p.name}>
        {p.name} {p.number} <button onClick={()=>deleteHandler(p.id)}>Delete</button>
        </p>)
      }
    </>
  )

}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filterInput,setFilterInput] = useState('')
  const [successMsg,setSuccessMsg] = useState(null)
  const [errorMsg,setErrorMsg] = useState(null)

  useEffect(()=>{
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const addPerson= (event) => {
    event.preventDefault()
    
    if (persons.some(person => person.name===newName)){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(p=>p.name === newName)
        const updatesPerson = {...person, number: newNumber}
        personService
          .update(person.id,updatesPerson)
          .then(returnedPerson=>{
            setPersons(persons.map(p=>p.name===newName ? returnedPerson : p))
          })
          .catch(error=>{
            setErrorMsg(`Information of ${newName} has already been removed from the server`)
            setTimeout(()=> {
              setErrorMsg(null)
            },5000)
            setPersons(persons.filter(p=>p.name !== newName))
          })
      }
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setSuccessMsg(`Added ${newName}`)
          setTimeout(()=> {
            setSuccessMsg(null)
          },5000)
          setNewName("")
          setNewNumber("")
        })
    }
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterInput(event.target.value)
  }

  const handleDelete = id => {
    if (window.confirm("Are you sure you want to delete this person?")){
      personService
      .deletePerson(id)
      .then(()=>setPersons(persons.filter(p=> p.id !==id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMsg message={successMsg} />
      <ErrorMsg message={errorMsg} />
      <Filter handler={handleFilterChange} />
      <h2>Add a new:</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterInput={filterInput} deleteHandler={handleDelete} />
    </div>
  )
}

export default App