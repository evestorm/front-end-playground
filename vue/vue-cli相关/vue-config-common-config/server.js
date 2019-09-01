const express = require('express')

let app = express()

app.get('/getUser', (req, res) => {
  res.json({ name: 'Lance' })
})
app.listen(3000)