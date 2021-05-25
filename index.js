import express from 'express'
import DataStore from 'nedb'

const PORT = 3000

//BDD
const db = new DataStore({ filename: 'perso'})
db.loadDatabase()


//Start express
const app = express();
app.use(express.json())


// API CRUD

//Create
app.post('/api/perso' , (req, res) => {
  db.insert(req.body)
  res.send(req.body)
})
//Read ALl
app.get('/api/perso' , (req, res) =>{
  db.find({}, (err, docs)=>{
    if(err) console.log(err)

    res.send(docs)
  })
})

//Read One
app.get('/api/perso/:id' , (req, res) =>{
  db.find({ _id: req.params.id }, (err, docs)=>{
    if(err) console.log(err)

    res.send(docs)
  })
})


//UPDATE
app.patch('/api/perso/:id', (req, res)=>{
  db.update({_id: req.params.id}, req.body)
  res.send(req.body)
})

app.listen(PORT, () => {
console.log(`le serveur est lancer sur le port : ${PORT}`)
})