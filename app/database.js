const mysql = require('mysql');
const dbInfo = require("../config.json");
const promise = require ('Promise');

// const query = async (SQLquery, ...arguments) => {
//   const connection = await mysql.createConnection({
//     host: dbInfo.host,
//     user: dbInfo.user,
//     password: dbInfo.password,
//     database: dbInfo.database
//   })

//   return new Promise ((resolve, reject) =>{
//   	connection.query(SQLquery, arguments, (err, result) =>{
//   		if(err){
//   			console.log("error");
//   			return reject(err);
//   		}
//   		console.log(result);
//   		return resolve({result: result});
//   	})
//   })

  // const result = await connection.query(query, arguments[0])
  // connection.end()

  // return result;
// }

const query = (SQLquery, ...arguments) => {
	let connection = mysql.createConnection({
		host: dbInfo.host,
		user: dbInfo.user,
		password: dbInfo.password,
		database: dbInfo.database
	})

  return new Promise ((resolve, reject) =>{
  	connection.query(SQLquery, arguments, (err, result) =>{
  		if(err){
  			console.log("error");
  			return reject(err);
  		}
  		console.log(result);
  		return resolve({result: result});
  	})
  })
}


const model = {
	select: async (table, columns, conditions) => {
		console.log("SELECT stetemant called");

	    let selectString = '';
		
		if (columns.length <= 0) {
			selectString = `SELECT * FROM ${table}`;
		} 
		else {

			selectString = `SELECT `;

			for (var i = 0; i < columns.length; i++) {
				selectString = selectString + columns[i];
				if ((i + 1) < columns.length) {
					selectString = selectString + ", ";
				}
			}
		}

		if(columns.length > 0){
			if(conditions.length <= 0 ){
				selectString = selectString + ` FROM ${table}`;	
			} 
			else{
				selectString = selectString + ` FROM ${table} WHERE `;
				for (var i = 0; i < conditions.length; i++){
					selectString = selectString + conditions[i];
					if(i + 1 < conditions.length){
						selectString = selectString + " AND ";
					}
					else{
						selectString = selectString + ";";
					}
				}
			}
		}
		
		console.log('something')

		const result = await query(selectString);

		return result;

  //   	return result

  		// console.log("bla +++");
  		// query(selectString).then(function(result){
  		// 	console.log(result);
  		// })

		// let promprom = new Promise((resolve, reject)=>{
		// 	let results = query(selectString);
		// 	resolve(results);
		// })
		// promprom.then((resolve)=>{
		// 	console.log("test bla: "+resolve);
		// 	console.log("returning data @ database SELECT method");
		// 	return resolve;
		// })
		
 	}
}

module.exports = {
	query: query,
	model: model
}
