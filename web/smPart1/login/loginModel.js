export default class LoginModel {
  constructor() {
    this.isValidUsername = false;
  }

	getAllData() {
		alert('YES');
	}

	async existsInDB(param1, type, param2='') {
    const promise = this.getPromise(param1, type, param2);
    let result = await promise;
    return result;
  }

  getPromise(param1, type, param2) {
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
  
	
}