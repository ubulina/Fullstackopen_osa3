const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

//määritellään skeema
const personSchema = new mongoose.Schema({
    name: String,
    number: String, 
})

//määritellään, miten mongoosen palauttamat oliot muotoillaan
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//määritellään skeemaa vastaava model 
//ja exportataan se samalla   
module.exports = mongoose.model('Person', personSchema)