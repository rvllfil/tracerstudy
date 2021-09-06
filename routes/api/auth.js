const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const pool = require('../../db')
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')

// @route   POST api/auth
// @desc    Auth Admin
// @access  Public
router.post('/admin', async (req, res) => {
  const { email, password } = req.body

  // Simple Validation
  if(!email || !password) {
    return res.status(400).json({msg: '*Harap masukan email dan password'})
  }

  // Check for existing user
  const User = await pool.query("SELECT * FROM users where email = $1 OR email = $1", [email])
  const user = User.rows[0]
  if(!user) return res.status(400).json({msg: '*User tidak ditemukan!'})

  // Validate Password
  bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(!isMatch) return res.status(400).json({msg: 'Password Salah!'})
      jwt.sign(
        { id: user.id },
        config.get('jwtSecret'),            
        (err, token) => {
          if(err) throw err
          res.json({
            token,
            user: { 
              id: user.id,
              nama: user.nama,
              email: user.email,
            }
          })
        }
      )
    })
})


// @route   GET api/auth/admin
// @desc    Get user data
// @access  Private
router.get('/admin', auth, async (req, res) => {
  console.log(req.id)
  const User = await pool.query("SELECT * FROM users WHERE id = $1", [req.user.id])
  const user = User.rows[0]
  if(!user) return res.status(400).json({msg: '*User tidak ditemukan!'})
  res.status(200).json(user)
})


// @route   POST api/auth/alumni
// @desc    Auth Alumni
// @access  Public
router.post('/alumni', async (req, res) => {
  const { nisn, tanggal_lahir } = req.body

  // Simple Validation
  if(!nisn || !tanggal_lahir) {
    return res.status(400).json({msg: '*Harap masukan nisn dan tanggal lahir'})
  }

  // Check for existing user
  const Alumni = await pool.query("SELECT * FROM alumni where nisn = $1", [nisn])
  const user = Alumni.rows[0]
  if(!user) return res.status(400).json({msg: '*Alumni tidak ditemukan!'})
  let born = new Date(user.tanggal_lahir).toLocaleDateString('id-ID')
  if(born !== tanggal_lahir) return res.status(400).json({msg: 'Tanggal Lahir Salah!'})  
  else {
    jwt.sign(
      { id: user.id },
      config.get('jwtSecret'),            
      (err, token) => {
        if(err) throw err
        res.json({
          token,
          user: user
        })
      }
    )
  }
})


// @route   GET api/auth/alumni
// @desc    Get user data
// @access  Private
router.get('/alumni', auth, async (req, res) => {
  console.log(req.id)
  const Alumni = await pool.query("SELECT * FROM alumni WHERE id = $1", [req.user.id])
  const user = Alumni.rows[0]
  if(!user) return res.status(400).json({msg: '*Alumni tidak ditemukan!'})
  res.status(200).json(user)
})

module.exports = router