// TODO: CRUD + Valdiation + styling 

const fs = require('fs')
const { urlencoded } = require('express')
const express = require('express')
const app = express()
const port = 3000

const id = require('uniqid')

app.set('view engine' , 'pug')

app.use(express.json())
app.use(urlencoded({extended : false}))
app.use(express.static('public'))


app.get('/', (req, res) => {

  let created = req.query.created  

  let students = getAll('students')
  if(created) { 
    res.render('list', {created: true, students: students})
  } else {
    res.render('list', {created: false, students: students})
  }
  
})

app.get('/create', (req, res) => {
    res.render('create', {})
})

app.post('/create', (req, res) => {
    
    let data = req.body


    let student = {
        id: id(),
        fullname: data.fullname,
        phone: data.phone,
        email: data.email,
        address: data.address,
        postcode: data.postcode
    }

    let students = getAll('students')

    students.push(student)

    writeAll('students', students)

    res.redirect('/?created=true')

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function getAll(filename) {
    return JSON.parse(fs.readFileSync(`./data/${filename}.json`))
}

function writeAll(filename, data) {
    return fs.writeFileSync(`./data/${filename}.json`, JSON.stringify(data))
}