const express = require('express')
const router = express.Router()
const pool = require('../../db')
const format = require('pg-format')
const { data, dataAnd, arrStr } = require('../../function')

// @route   GET api/loker
// @desc    Get All Loker
// @access  Public
router.get('/', async (req, res) => {
  const query = req.query
  const keys = Object.keys(query)
  let sql
  if(keys.length < 1) {
    sql = format(`
    select
    id, judul, isi, gambar, create_at,
      (
        select array_to_json(array_agg(s))
        from (
          select id, nama, email
          from users where users.id = lowongan.admin_id
        ) s
      ) as admin
    from lowongan
    `)
  } else {
    const data = dataAnd(query, keys)
    sql = format(`
      select
      id, judul, isi, gambar, create_at,
        (
          select array_to_json(array_agg(s))
          from (
            select id, nama, email
            from users where users.id = lowongan.admin_id
          ) s
        ) as admin
      from lowongan where %s
    `, data)
  }
  try {
    const loker = await pool.query(sql)
    if(!loker) throw Error("Data Loker tidak ditemukan")
    res.status(200).json(loker.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})


// @route   GET api/loker
// @desc    Get One Loker
// @access  Public
router.get('/:id', async (req, res) => {
  const {id} = req.params
  sql = format(`
    select
    id, judul, isi, gambar, create_at,
      (
        select array_to_json(array_agg(s))
        from (
          select id, nama, email
          from users where users.id = lowongan.admin_id
        ) s
      ) as admin
    from lowongan where id = %L
    `, id)
  try {
    const loker = await pool.query(sql)
    if(!loker) throw Error("Data Loker tidak ditemukan")
    res.status(200).json(loker.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})


// @route   POST api/loker
// @desc    Create Loker
// @access  Public
router.post('/', async (req, res) => {
  const body = arrStr(Object.values(req.body))
  const keys = Object.keys(req.body).toString()
  const sql = format('INSERT INTO lowongan (%s) VALUES (%s) RETURNING *;', keys, body)
  console.log(sql)
  try {
    const newLoker = await pool.query(sql)
    if(!newLoker) throw Error('Terjadi Kesalahan ketika menyimpan Data Lowongan Kerja')
    res.status(201).json(newLoker.rows[0])
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   PUT api/loker
// @desc    Edit Loker
// @access  Public
router.put('/:id', async (req, res) => {
  const {id} = req.params
  const keys = Object.keys(req.body)
  const updateData = data(req.body, keys)
  const sql = format("UPDATE lowongan SET %s WHERE id = %L RETURNING *", updateData, id)
  try {
    const updateLoker = await pool.query(sql)
    if(!updateLoker) throw Error('Terjadi Kesalahan ketika menyimpan Data Loker')
    res.status(200).json(updateLoker.rows[0])
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   DELETE api/loker
// @desc    Remove a Loker
// @access  Public
router.delete('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const deleteLoker = await pool.query("DELETE FROM lowongan WHERE id = $1 RETURNING *", [id])
    if(!deleteLoker) throw Error("Data Loker tidak ditemukan")
    res.status(200).json(deleteLoker.rows[0])
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})


module.exports = router