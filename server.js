const express = require("express")
const app = express()

app.use(express.json())


// ROUTES
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/alumni', require('./routes/api/alumni'))


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on PORT ${port}`))