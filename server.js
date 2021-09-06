const express = require("express")
const fileUpload = require("express-fileupload")
const app = express() 

app.use(express.json())
app.use(fileUpload())

// ROUTES
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/alumni', require('./routes/api/alumni'))
app.use('/api/kuesioner', require('./routes/api/kuesioner'))
app.use('/api/loker', require('./routes/api/loker'))
app.use('/api/pelatihan', require('./routes/api/pelatihan'))



const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on PORT ${port}`))