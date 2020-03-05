const db = require('../database')

const model = {
	get: async (where = {}) => {
		return await db.model.select('users', where)
	},

	save: async (options = {}) => {
		return await db.model.insert('users', options)
	},

	update: async (options = {}, where = {}) => {
		return await db.model.update('users', options, where)
	},

	delete: async (where = {}) => {
		return await db.model.delete('users', where)
	}
}


module.exports = model
