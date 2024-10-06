import { useState } from 'react'

const Filter = ({filter, setFilter}) => (
    <div>
        filter shown with <input value={filter} onChange={e => setFilter(e.target.value)}/>
    </div>
)

const PersonForm = ({newName, newNumber, setNewName, setNewNumber, addNewPerson}) => (
    <form onSubmit={addNewPerson}>
        <div>
            name: <input value={newName} onChange={e => setNewName(e.target.value)}/>
        </div>
        <div>
            number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

const Persons = ({ persons }) =>
    (persons.map(person =>
            (<div key={person.name}>{person.name} {person.number}</div>))
    )


const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    const addNewPerson = (event) => {
        event.preventDefault()

        if (persons.map(p => p.name).includes(newName)) {
            alert(`${newName} is already added to phonebook`)
            return;
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }
        setPersons([...persons, newPerson])
        setNewName('')
        setNewNumber('')
    }

    const personsToShow = persons.filter(person => filter === '' ? true : person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <h2>add a new</h2>
            <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addNewPerson={addNewPerson} />
            <h2>Numbers</h2>
            <Persons persons={personsToShow}  />
        </div>
    )
}

export default App