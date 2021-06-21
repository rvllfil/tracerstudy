const express = require('express')
const router = express.Router()
const pool = require('./../../db')
const format = require('pg-format')
const { data, dataAnd, arrStr, batch } = require('../../function')

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
  let sql
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
    console.log(sql)
    const newAlumni = await pool.query(sql)
    if(!newAlumni) throw Error('Terjadi Kesalahan ketika menyimpan Data Alumni')
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
    const updateBab = await pool.query(sql)
    if(!updateBab) throw Error('Terjadi Kesalahan ketika menyimpan Data Alumni')
    res.status(200).json(updateBab.rows[0])
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
    const deleteBab = await pool.query("DELETE FROM alumni WHERE id = $1", [id])
    if(!deleteBab) throw Error("Data Alumni tidak ditemukan")
    res.status(200).json({msg: 'data berhasil dihapus'})
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})


module.exports = router