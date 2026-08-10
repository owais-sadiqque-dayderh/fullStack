const express = require("express")
const path = require('path')

const morgan = require('morgan')
// const cors = require('cors')
const app = express()

const port = 3002

morgan.token('body', (request, response) => {
    if (request.body && Object.keys(request.body).length > 0) {
        return (JSON.stringify(request.body))
    }
    return ' '
})
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'dist')));
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// app.use(cors())
let notes = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Main Page</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id === id)
    response.json(note)
})

app.get('/api/info', (request, response) => {
    const time = new Date()
    response.send(`
        <p>Phonebook has info for ${notes.length} people</p>
        <p>${time}</p>`)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()



})


const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}


app.post('/api/notes', (request, response) => {
    const id = getRandomInt(10, 80001).toString()
    const body = request.body
    const name = body.name
    const number = body.number

    if (!name || !number) {

        return response.status(400).json({
            error: "content missing"
        })
    }

    const note = {
        id: id,
        name: name,
        number: number

    }

    notes = notes.concat(note)
    response.json(note)

})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
}
)