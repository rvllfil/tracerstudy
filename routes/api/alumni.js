const express = require('express')
const router = express.Router()
const pool = require('./../../db')
const format = require('pg-format')
const { data, dataAnd, arrStr, batch } = require('../../function')
const bcrypt = require('bcryptjs')


// // @route   GET api/alumni/all
// // @desc    Get All Alumni nested
// // @access  Public
// router.get('/all', async (req, res) => {
//   const sql = `
//     select
//       array_to_json(array_agg(alumni))
//       from (
//         select id, urutan_bab, judul_bab,
//         (
//           select array_to_json(array_agg(s))
//           from (
//             select sub_bab_id, urutan_sub_bab, judul_sub_bab, 
//             (
//               select array_to_json(array_agg(m)) 
//               from (
//                 select materi_id, urutan_materi, judul_materi, isi_materi
//                 from materi where materi.sub_bab_id = sub_bab.sub_bab_id
//               ) m
//             ) as materi,
//             (
//               select array_to_json(array_agg(q))
//               from (
//                 select quiz_id, judul_quiz,
//                 (
//                   select array_to_json(array_agg(sq))
//                   from (
//                     select soal_quiz_id, text_soal,
//                     (
//                       select array_to_json(array_agg(jq)) 
//                       from (
//                         select jawaban_quiz_id, text_jawaban, benar
//                         from jawaban_quiz where jawaban_quiz.soal_quiz_id = soal_quiz.soal_quiz_id
//                       ) jq
//                     ) as jawaban_quiz
//                     from soal_quiz where soal_quiz.quiz_id = quiz.quiz_id
//                   ) sq
//                 ) as soal_quiz
//                 from quiz where quiz.sub_bab_id = sub_bab.sub_bab_id
//               ) q
//             ) as quiz
//             from sub_bab where sub_bab.id = alumni.id
//           ) s
//         ) as sub_bab
//         from alumni
//       ) alumni
//     ` 
//   try {
//     const alumni = await pool.query(sql)
//     if(!alumni) throw Error("Data Alumni tidak ditemukan")
//     res.status(200).json(alumni.rows[0].array_to_json)
//   } catch (e) {
//     res.status(400).json({
//       msg: e.message
//     })
//   }
// })



// @route   GET api/alumni
// @desc    Get All Alumni
// @access  Public
router.get('/', async (req, res) => {
  const query = req.query
  const keys = Object.keys(query)
  let sql
  if(keys.length < 1) {
    sql = format('SELECT * FROM alumni;')
  } else {
    const data = dataAnd(query, keys)
    sql = format('SELECT * FROM alumni WHERE %s', data)
  }
  try {
    const alumni = await pool.query(sql)
    if(!alumni) throw Error("Data Alumni tidak ditemukan")
    res.status(200).json(alumni.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})


// @route   GET api/alumni
// @desc    Get One Alumni
// @access  Public
router.get('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const alumni = await pool.query("SELECT * FROM alumni WHERE id = $1", [id])
    if(!alumni) throw Error("Data Alumni tidak ditemukan")
    res.status(200).json(alumni.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   POST api/alumni
// @desc    Create Alumni
// @access  Public
router.post('/', async (req, res) => {
  const b = req.body
  let nama = b.nama
  let email = b.nisn
  let password = new Date(b.tanggal_lahir).toLocaleDateString('id-ID')
  let role = 'alumni'
  let sql
  let sqlUser
  if(Array.isArray(b)){
    const body = batch(b)
    const keys = Object.keys(req.body[0]).toString()
    sql = format('INSERT INTO alumni (%s) VALUES %s RETURNING *;', keys, body)
  } else {
    const keys = Object.keys(req.body).toString()
    const body = arrStr(Object.values(b))
    sql = format('INSERT INTO alumni (%s) VALUES (%s) RETURNING *;', keys, body)
  }
  try {
    const newAlumni = await pool.query(sql)
    if(!newAlumni.rows) throw Error('Terjadi Kesalahan ketika menyimpan Data Alumni')
    let newUser

    if(Array.isArray(b)) {
      // Create Salt & Hash
      b.map(data => {
        let pass = new Date(data.tanggal_lahir).toLocaleDateString('id-ID')
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(pass, salt, async (err, hash) => {
            if(err) throw err
            pass = hash
            // Save User
            sqlUser = format('INSERT INTO users (nama, email, password, role) VALUES (%L, %L, %L, %L) RETURNING *;', data.nama, data.nisn, pass, role)
            newUser = await pool.query(sqlUser)
            if(!newUser.rows) throw Error('Terjadi Kesalahan ketika menyimpan Data Akun User ALumni')
          })
        })
      })
    } else {
      // Create Salt & Hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if(err) throw err
          password = hash
          // Save User
          sqlUser = format('INSERT INTO users (nama, email, password, role) VALUES (%L, %L, %L, %L) RETURNING *;', nama, email, password, role)
          newUser = await pool.query(sqlUser)
          if(!newUser.rows) throw Error('Terjadi Kesalahan ketika menyimpan Data Akun User ALumni')
          else console.log('berhasil')
        })
      })  
    }
    
    res.status(201).json(newAlumni.rows)
  
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   PUT api/alumni
// @desc    Edit Alumni
// @access  Public
router.put('/:id', async (req, res) => {
  const {id} = req.params
  const keys = Object.keys(req.body)
  const updateData = data(req.body, keys)
  const sql = format("UPDATE alumni SET %s WHERE id = %L RETURNING *", updateData, id)
  try {
    const alumni = await pool.query("SELECT * FROM alumni WHERE id = $1", [id])
    if(!alumni.rows) throw Error("Data Alumni tidak ditemukan")
    if(req.body.nama !== undefined && req.body.nama !== null) {
      const updateUser = await pool.query("UPDATE users SET nama=$1 WHERE email = $2 RETURNING *;", [req.body.nama, alumni.rows[0].nisn])
      if(!updateUser) throw Error('Terjadi Kesalahan ketika menyimpan Data User')
    } 
    if(req.body.nisn !== undefined && req.body.nisn !== null) {
      const updateUser = await pool.query("UPDATE users SET email=$1 WHERE email = $2 RETURNING *;", [req.body.nisn, alumni.rows[0].nisn])
      if(!updateUser) throw Error('Terjadi Kesalahan ketika menyimpan Data User')
    } 
    if(req.body.tanggal_lahir !== undefined && req.body.tanggal_lahir !== null) {
      password = req.body.tanggal_lahir
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if(err) throw err
          password = hash
          // Save User
          const updateUser = await pool.query("UPDATE users SET password=$1 WHERE email = $2 RETURNING *;", [password, alumni.rows[0].nisn])
          if(!updateUser) throw Error('Terjadi Kesalahan ketika menyimpan Data User')
        })
      })  
    }
    const updateAlumni = await pool.query(sql)
    if(!updateAlumni) throw Error('Terjadi Kesalahan ketika menyimpan Data Alumni')
    res.status(200).json(updateAlumni.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   DELETE api/alumni
// @desc    Remove a Alumni
// @access  Public
router.delete('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const deleteAlumni = await pool.query("DELETE FROM alumni WHERE id = $1 RETURNING *;", [id])
    if(!deleteAlumni) throw Error("Data Alumni Gagal Dihapus")
    const deleteUser = await pool.query("DELETE FROM users WHERE email = $1 RETURNING *;", [deleteAlumni.rows[0].nisn])
    if(!deleteUser) throw Error("Data User Gagal Dihapus")
    res.status(200).json(deleteAlumni.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   DELETE api/alumni
// @desc    Remove all Alumni
// @access  Public
router.delete('/', async (req, res) => {
  try {
    const deleteAlumni = await pool.query("DELETE FROM alumni WHERE id > 0 RETURNING *;")
    if(!deleteAlumni) throw Error("Data Alumni tidak ditemukan")
    deleteAlumni.rows.map(data => {
      const deleteUser = pool.query("DELETE FROM users WHERE email = $1 RETURNING *;", [data.nisn])
      if(!deleteUser) throw Error("Data User Gagal Dihapus")
    })
    res.status(200).json(deleteAlumni.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

module.exports = router