const express = require('express')
const app = express()
const port = 3000

const saveToFile = require('./saveToFile')

saveToFile();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

module.exports = app