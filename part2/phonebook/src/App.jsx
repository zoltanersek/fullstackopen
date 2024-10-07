import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Prompt from "./components/Prompt"
import Error from "./components/Error"
import personService from './services/PersonService'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [notification, setNotification] = useState(null)
    const [error, setError] = useState(null)

    const addNewPerson = (event) => {
        event.preventDefault()

        if (persons.map(p => p.name).includes(newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const person = persons.find(p => p.name === newName)
                const newPerson = {...person, number: newNumber}
                personService.update(person.id, newPerson).then(newPerson => {
                    setPersons(persons.map(p => p.id !== person.id ? p : newPerson))
                    setNewName('')
                    setNewNumber('')
                    setNotification(`Phone number for ${newName} has been updated`)
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000)
                }).catch((error) => {
                    setError(`Information of ${newName} has already been removed from server`)
                    setPersons(persons.filter(p => p.id !== person.id))
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                })
                return;
            } else {
                alert(`${newName} is already added to phonebook`)
                return;
            }
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }

        personService.create(newPerson)
            .then(person => {
                setPersons([...persons, person])
                setNewName('')
                setNewNumber('')
                setNotification(`${newName} has been added`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

    const deletePerson = (person) => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            personService.deletePerson(person.id).then(data => {
                setPersons(persons.filter(p => p.id !== person.id))
                setNotification(`${person.name} has been deleted`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
        }
    }

    const personsToShow = persons.filter(person => filter === '' ? true : person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

    useEffect(() => {
        personService.getAll()
            .then(initialPersons => setPersons(initialPersons))
    }, []);

    return (
        <div>
            <h2>Phonebook</h2>
            <Prompt message={notification} />
            <Error message={error} />
            <Filter filter={filter} setFilter={setFilter} />
            <h2>add a new</h2>
            <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addNewPerson={addNewPerson} />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} deletePerson={deletePerson} />
        </div>
    )
}

export default App