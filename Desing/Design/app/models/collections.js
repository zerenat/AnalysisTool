const db = require('../database')

const model = {
	get: async (where = {}) => {
		return await db.model.select('collections', where)
	},

	save: async (options = {}) => {
		return await db.model.insert('collections', options)
	},

	update: async (options = {}, where = {}) => {
		return await db.model.update('collections', options, where)
	},

	delete: async (where = {}) => {
		return await db.model.delete('collections', where)
	}
}


module.exports = model
