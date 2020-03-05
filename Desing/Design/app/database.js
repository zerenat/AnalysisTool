const mysql = require('mysql2/promise')
const config = require('../config.json')

//create new query, retrieve database information a file
const query = async (query, ...arguments) => {
  const connection = await mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  })

  const [result] = await connection.query(query, arguments[0])
  connection.end()

  return result
}

const model = {
  select: async (table, ...arguments) => {
    let columns = arguments[0] || []
    let where = arguments[1] || {}

    if (arguments.length <= 1) {
      const temp = columns

      columns = []
      where = temp
    }

    const options = [table]
    let fields = '*'

    if (columns.length) {
      fields = '??'
      options.unshift(columns)
    }


    let where_sql = ''

    if (Object.keys(where).length) {
      const condition = Object.keys(where)
        .map(value => '?? = ?')
        .join(' AND ')

      const entries = Object.entries(where)
        .flat()

      where_sql = `WHERE ${condition}`
      options.push(...entries)
    }

    let sql = `SELECT ${fields} FROM ?? ${where_sql}`
    const result = await query(sql, options)

    return result.length === 1 ? result[0] : result
  },

  insert: async (table, ...arguments) => {
    const options = arguments[0] || {}
    const result = await query('INSERT INTO ?? SET ?', [table, options])

    return result.insertId
  },

  update: async (table, ...arguments) => {
    const options = arguments[0] || {}
    const where = arguments[1] || {}

    const condition = Object.keys(where)
      .map(value => '?? = ?')
      .join(' AND ')

    const entries = Object.entries(where)
      .flat()

    const result = await query(`UPDATE ?? SET ? WHERE ${condition}`, [table, options, ...entries])

    return result.affectedRows
  },

  delete: async (table, ...arguments) => {
    const where = arguments[0] || {}

    const condition = Object.keys(where)
      .map(value => '?? = ?')
      .join(' AND ')

    const entries = Object.entries(where)
      .flat()

    const result = await query(`DELETE FROM ?? WHERE ${condition}`, [table, ...entries])

    return result.affectedRows
  }
}


module.exports = {
  escape: mysql.escape,
  query: query,
  model: model
}
