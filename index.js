require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('type', function (req, res) { return JSON.stringify(req.body) })

app.use(express.static('build'))
app.use(express.json())
app.use(morgan
    (':method :url :status :res[content-length] - :response-time ms :type'))
app.use(cors())

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`<p>Phonebook has info for 
        ${persons.length} people</p> ${new Date()}`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
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

    Person.find({name: body.name}).then(person => {
        
        if (person.length === 1) {
            console.log('duplicate', body.name)
            response.status(400).json({
                error: `${body.name} already exists in database`
            })
        } else {
            const person = new Person({
                name: body.name,
                number: body.number,
            })
        
            person.save().then(savedPerson => {
                response.json(savedPerson)
            })
        }
    })   
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        number: body.number,
    }

    Person.findByIdAndUpdate(request.params.id, person,
        { new: true })
        .then(updatePerson => {
            response.json(updatePerson)
        })
        .catch(error => next(error))
})

const unknownEndPoint = (request, response) => {
    response.status(404)
    .send({ error: 'unknown endpoint'})
}

app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})