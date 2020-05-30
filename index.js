const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('type', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

let persons = [
    {
        name: "Arto Hellas",
        number: "045-31235234",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for 
    ${persons.length} people</p> ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contactToDelete = persons.find(person => person.id === id)
    persons = persons.filter(person => person.id !== id)
    console.log(contactToDelete)
    
    if (contactToDelete) {
        response.status(204).end()
    } else {
        response.status(404).end()
    }   
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const name = body.name
    const number = body.number
    const nameChecker = 
    persons.filter(p => p.name === name)

    if (!name) {
        return response.status(400).json({
            error: 'name can not be empty'
        })
    } if (!number) {
        return response.status(400).json({
            error: 'number can not be empty'
        })
    } if (nameChecker.length >= 1) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: idGenerator(),
    }

    persons = persons.concat(person)
    response.json(person)
})

const idGenerator = () => {

    const idArray = persons.map(p => p.id)
    const maxId = persons.length * 5
    const minId = 1
    console.log(maxId)

    const id = Math.floor(Math.random() *
        (maxId - minId + 1)) + minId

    const idFilter = idArray.filter(a => a === id)

    if (idFilter.length === 0) {
        return id
    } else {
        return (Math.floor(Math.random() *
            (maxId + 1)) + maxId)
    }
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
