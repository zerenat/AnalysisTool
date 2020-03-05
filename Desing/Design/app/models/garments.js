const db = require('../database')

const model = {
	get: async (where = {}) => {
		return await db.model.select('garments', where)
	},

	save: async (options = {}) => {
		return await db.model.insert('garments', options)
	},

	update: async (options = {}, where = {}) => {
		return await db.model.update('garments', options, where)
	},

	delete: async (where = {}) => {
		return await db.model.delete('garments', where)
	}
}


module.exports = model
