/***************************************
* Class: Registration Model
* Author: Adam Gerhartz
* Purpose: to handle the model logic and retrieve
*          data from the DB on other threads.
****************************************/
export default class RegistrationModel {

	/***********************************
	* This method starts a new thread and
	* makes a call request to the server
	************************************/
	async existsInDB(param1, type, param2='') {
		const promise = this.getPromiseRetrieve(param1, type, param2);
		let result = await promise;
		return result;
	}

	/***********************************
	* This method awaits a response to send
	* from server to client
	************************************/
	async addToDB(un, em, fn, ln, pw) {
		const promise = this.getPromiseSend(un, em, fn, ln, pw, 'add');
		let result = await promise;
		return result;
	}
	
	/***********************************
	* This method sends the request to server
	************************************/
	getPromiseRetrieve(param1, type, param2) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: '../db/dbController.php',
				type: 'post',
				data: {
					value1: `${param1}`,
					type: type,
					value2: `${param2}`
				},
				success: function(data) {
					resolve(data);
				},
				error: function(err) {
					reject(err);
				}
			});
		});
	}

	/***********************************
	* This method sends the request to server
	************************************/
	getPromiseSend(un, em, fn, ln, pw, type) {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: '../db/dbController.php',
				type: 'post',
				data: {
					un: `${un}`,
					em: `${em}`,
					fn: `${fn}`,
					ln: `${ln}`,
					pw: `${pw}`,
					type: type
				},
				success: function(data) {
					resolve(data);
				},
				error: function(err) {
					reject(err);
				}
			});
		});
	}
}