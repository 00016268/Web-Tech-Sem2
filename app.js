// TODO: CRUD + Valdiation + styling 

const { urlencoded } = require('express')
const express = require('express')
const app = express()
const port = 3000

app.set('view engine' , 'pug')
app.use(express.json())
app.use(urlencoded({extended : false}))


app.get('/', (req, res) => {
  res.render('list', {})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})