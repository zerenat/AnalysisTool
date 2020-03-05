const database = require ('./database');

const model = {
	get: async (columns = {}, where = {}) => {
		return new Promise((resolve, reject)=>{
			let data = database.model.select('users', columns, where);
			return resolve({result: data});
		}).then((resolve)=>{
			console.log("returning data at users files");
			return resolve;
		})
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
