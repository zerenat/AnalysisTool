const database = require ('./database');

const model = {
	get: async (columns = {}, where = {}) => {
		return await database.model.select('users', columns, where)
		console.log("users.save get");
	},
	save: async (options = {}) => {
		console.log("users.save called");
		return await database.model.insert('users', options)
	},

	update: async (options = {}, where = {}) => {
		console.log("users.update called");
		return await database.model.update('users', options, where)
	},

	delete: async (where = {}) => {
		console.log("users.delete called");
		return await database.model.delete('users', where)
	}
}

module.exports = model
