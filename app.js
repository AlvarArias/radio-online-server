const express = require('express')
const app = express()
//const port = 3000
const PORT = process.env.PORT || 3000;

app.use(express.static('my-radio'))


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
