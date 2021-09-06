const express = require('express')
const router = express.Router()
const pool = require('./../../db')
const format = require('pg-format')
const { data, dataAnd, arrStr, batch } = require('../../function')



// @route   GET api/kuesioner
// @desc    Get All Kuesioner
// @access  Public
router.get('/', async (req, res) => {
  const query = req.query
  const keys = Object.keys(query)
  let sql
  if(keys.length < 1) {
    sql = format('SELECT * FROM kuesioner;')
  } else {
    const data = dataAnd(query, keys)
    sql = format('SELECT * FROM kuesioner WHERE %s', data)
  }
  try {
    const kuesioner = await pool.query(sql)
    if(!kuesioner) throw Error("Data Kuesioner tidak ditemukan")
    res.status(200).json(kuesioner.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})


// @route   GET api/kuesioner
// @desc    Get One Kuesioner
// @access  Public
router.get('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const kuesioner = await pool.query("SELECT * FROM kuesioner WHERE id = $1", [id])
    if(!kuesioner) throw Error("Data Kuesioner tidak ditemukan")
    res.status(200).json(kuesioner.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   POST api/kuesioner
// @desc    Create Kuesioner
// @access  Public
router.post('/', async (req, res) => {
  const b = req.body
  let sql
  if(Array.isArray(b)){
    const body = batch(b)
    const keys = Object.keys(req.body[0]).toString()
    sql = format('INSERT INTO kuesioner (%s) VALUES %s RETURNING *;', keys, body)
  } else {
    const keys = Object.keys(req.body).toString()
    const body = arrStr(Object.values(b))
    sql = format('INSERT INTO kuesioner (%s) VALUES (%s) RETURNING *;', keys, body)
  }
  try {
    console.log(sql)
    const newAlumni = await pool.query(sql)
    if(!newAlumni) throw Error('Terjadi Kesalahan ketika menyimpan Data Kuesioner')
    res.status(201).json(newAlumni.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   PUT api/kuesioner
// @desc    Edit Kuesioner
// @access  Public
router.put('/:id', async (req, res) => {
  const {id} = req.params
  const keys = Object.keys(req.body)
  const updateData = data(req.body, keys)
  const sql = format("UPDATE kuesioner SET %s WHERE id = %L RETURNING *", updateData, id)
  try {
    const updateBab = await pool.query(sql)
    if(!updateBab) throw Error('Terjadi Kesalahan ketika menyimpan Data Kuesioner')
    res.status(200).json(updateBab.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   DELETE api/kuesioner
// @desc    Remove a Kuesioner
// @access  Public
router.delete('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const deleteBab = await pool.query("DELETE FROM kuesioner WHERE id = $1 RETURNING *;", [id])
    if(!deleteBab) throw Error("Data Kuesioner tidak ditemukan")
    res.status(200).json(deleteBab.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   DELETE api/kuesioner
// @desc    Remove all Kuesioner
// @access  Public
router.delete('/', async (req, res) => {
  try {
    const deleteBab = await pool.query("DELETE FROM kuesioner WHERE id > 0;")
    if(!deleteBab) throw Error("Data Kuesioner tidak ditemukan")
    res.status(200).json('Berhasil menghapus semua data kuesioner.')
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

module.exports = router