const express = require('express')
const router = express.Router()
const pool = require('./../../db')
const format = require('pg-format')
const { data, dataAnd, dataLiteral } = require('../../function')
const bcrypt = require('bcryptjs')

// @route   GET api/users
// @desc    Get All User
// @access  Public
router.get('/', async (req, res) => {
  const query = req.query
  const keys = Object.keys(query)
  let sql
  if(keys.length < 1) {
    sql = format('SELECT * FROM users;')
  } else {
    const data = dataAnd(query, keys)
    sql = format('SELECT * FROM users WHERE %s', data)
  }
  try {
    const users = await pool.query(sql)
    if(!users) throw Error("Data User tidak ditemukan")
    res.status(200).json(users.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})


// @route   GET api/users/id
// @desc    Get One User
// @access  Public
router.get('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const users = await pool.query("SELECT * FROM users WHERE id = $1", [id])
    if(!users) throw Error("Data User tidak ditemukan")
    res.status(200).json(users.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})


// @route   POST api/users
// @desc    Register New Admin
// @access  Public
router.post('/', async (req, res) => {
  let { nama, email, password} = req.body
  let role = 'admin'
  if(!nama || !email || !password ) {
    return res.status(400).json({msg: 'Harap Masukan Semua Data'})
  }

  try {
    // Check email
    const userEmail = await pool.query("SELECT email from users WHERE email = $1", [email])
    if(userEmail.rows.length > 0) {
      if(userEmail.rows[0].email === email) throw Error('*Alamat email user telah digunakan')
    }

    // Create Salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if(err) throw err
        password = hash
        // Save User
        const newUser = await pool.query("INSERT INTO users (nama, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *", [nama, email, password, role])
        res.status(201).json(newUser.rows)
      })
    })
    
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   PUT api/users
// @desc    Edit Users
// @access  Public
router.put('/:id', async (req, res) => {
  const {id} = req.params
  let body = req.body
  const keys = Object.keys(req.body)
  
  try {
    // Check email
    if(body.email){
      const userEmail = await pool.query("SELECT email from users WHERE email = $1", [body.email])
      if(userEmail.rows.length > 0) {
        if(userEmail.rows[0].email === body.email) throw Error('*Alamat email user telah digunakan')
      }
    }

    if(body.password){
      // Create Salt & Hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(body.password, salt, async (err, hash) => {
          if(err) throw err
          body.password = hash

          // UPDATE USERS
          const updateData = data(body, keys)
          const sql = format("UPDATE users SET %s WHERE id = %L RETURNING *", updateData, id)
          
          const updateUsers = await pool.query(sql)
          if(!updateUsers) throw Error('Terjadi Kesalahan ketika mengubah data user')
          res.status(200).json(updateUsers.rows[0])
        })
      })
    } else {
      // UPDATE USERS
      const updateData = data(body, keys)
      const sql = format("UPDATE users SET %s WHERE id = %L RETURNING *", updateData, id)

      const updateUsers = await pool.query(sql)
      if(!updateUsers) throw Error('Terjadi Kesalahan ketika mengubah data user')
      res.status(200).json(updateUsers.rows[0])
    }

  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   DELETE api/users
// @desc    Remove a User
// @access  Public
router.delete('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [id])
    if(!deleteUser) throw Error("Data User tidak ditemukan")
    res.status(200).json({msg: 'data berhasil dihapus'})
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})


module.exports = router