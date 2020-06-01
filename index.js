require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

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
    Person.find({}).then(persons => {
        response.json(persons)
    })   
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for 
    ${persons.length} people</p> ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }      
    })
    .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (request, response) => {
    
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
        if (result) {
            response.status(204).end()
        } else {
            response.status(404).send('Contact not in database')
        }       
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const name = body.name
    const number = body.number

    if (name === undefined || name === '' 
    || number === undefined || number === '') {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })  
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

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
