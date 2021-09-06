const express = require('express')
const router = express.Router()
const pool = require('../../db')
const format = require('pg-format')
const { data, dataAnd, arrStr } = require('../../function')

// @route   GET api/pelatihan
// @desc    Get All Pelatihan
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
          from users where users.id = pelatihan.admin_id
        ) s
      ) as admin
    from pelatihan
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
            from users where users.id = pelatihan.admin_id
          ) s
        ) as admin
      from pelatihan where %s
    `, data)
  }
  try {
    const pelatihan = await pool.query(sql)
    if(!pelatihan) throw Error("Data Pelatihan tidak ditemukan")
    res.status(200).json(pelatihan.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})


// @route   GET api/pelatihan
// @desc    Get One Pelatihan
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
          from users where users.id = pelatihan.admin_id
        ) s
      ) as admin
    from pelatihan where id = %L
    `, id)
  try {
    const pelatihan = await pool.query(sql)
    if(!pelatihan) throw Error("Data Pelatihan tidak ditemukan")
    res.status(200).json(pelatihan.rows)
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})


// @route   POST api/pelatihan
// @desc    Create Pelatihan
// @access  Public
router.post('/', async (req, res) => {
  const body = arrStr(Object.values(req.body))
  const keys = Object.keys(req.body).toString()
  const sql = format('INSERT INTO pelatihan (%s) VALUES (%s) RETURNING *;', keys, body)
  console.log(sql)
  try {
    const newPelatihan = await pool.query(sql)
    if(!newPelatihan) throw Error('Terjadi Kesalahan ketika menyimpan Data Lowongan Kerja')
    res.status(201).json(newPelatihan.rows[0])
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   PUT api/pelatihan
// @desc    Edit Pelatihan
// @access  Public
router.put('/:id', async (req, res) => {
  const {id} = req.params
  const keys = Object.keys(req.body)
  const updateData = data(req.body, keys)
  const sql = format("UPDATE pelatihan SET %s WHERE id = %L RETURNING *", updateData, id)
  try {
    const updatePelatihan = await pool.query(sql)
    if(!updatePelatihan) throw Error('Terjadi Kesalahan ketika menyimpan Data Pelatihan')
    res.status(200).json(updatePelatihan.rows[0])
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})

// @route   DELETE api/pelatihan
// @desc    Remove a Pelatihan
// @access  Public
router.delete('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const deletePelatihan = await pool.query("DELETE FROM pelatihan WHERE id = $1 RETURNING *", [id])
    if(!deletePelatihan) throw Error("Data Pelatihan tidak ditemukan")
    res.status(200).json(deletePelatihan.rows[0])
  } catch (e) {
    res.status(400).json({
      msg: e.message
    })
  }
})


module.exports = router