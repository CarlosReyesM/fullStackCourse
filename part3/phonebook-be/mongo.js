const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'please provide the password as an argument: node mongo.js <password>',
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://carlosFullStack:${password}@personscluster.jnfnc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({})
    .then((result) => {
      result.forEach((person) => {
        console.log(person)
      })
    })
    .then(() => mongoose.connection.close())
    .catch((e) => {
      console.log(e)
      mongoose.connection.close()
    })
}

if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person
    .save()
    .then((result) => {
      console.log(`added ${result.name} number ${result.number} to phoneBook`)
      mongoose.connect.close()
    })
    .catch((e) => {
      console.log(e)
      mongoose.connection.close()
    })
}

