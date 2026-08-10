import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
const port = 'api/notes'
const App = () => {
  // Store the full objects array instead of just a string array
  const [persons, setPersons] = useState([])
  const [name, setName] = useState('')
  const [num, setNum] = useState('')

  useEffect(() => {
    axios.get(port)
      .then(response => {
        setPersons(response.data) // Save the entire array of objects
      })
      .catch(error => console.error("Error fetching data:", error))
  }, [])

  const addRecord = (event) => {
    event.preventDefault()

    const newObj = {
      name: name,
      number: num
    }

    axios.post(port, newObj).then(response => {
      setPersons(persons.concat(response.data))
      setName('')
      setNum('')
    })


  }

  const Delete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      axios.delete(`/api/notes/${id}`).then(() => {
        setPersons(persons.filter(persons => persons.id !== id))

      })
    }
  }
  return (
    <div>
      <h1>PhoneBook</h1>
      <div>
        {/* Map over objects and use the real item.id as a stable React key */}
        {persons.map(person => (
          <div key={person.id}>
            {person.id} - {person.name} — {person.number} {' '}
            <button onClick={() => { Delete(person.id, person.name) }}>Delete</button>
          </div>
        ))}
      </div>

      <form onSubmit={addRecord}>
        <div>
          Name: <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          Number: <input value={num} onChange={(e) => setNum(e.target.value)} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default App
