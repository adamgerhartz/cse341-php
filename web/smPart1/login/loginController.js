import LoginModel from './loginModel.js';
import LoginView  from './loginView.js';

export default class LoginController {
	constructor(parentId) {
		this.parentElement = document.getElementById(parentId);
		this.loginModel = new LoginModel();
		this.loginView = new LoginView(this.parentElement);
		this.usernameElement = '';
		this.passwordElement = '';
		this.submitElement = '';
		this.username = '';
		this.hashedPassword = '';
		this.validInDb = '';
		this.allowSubmit = false;
	}

	showLoginForm() {
		// because I don't need to fetch any data, this will just render the form
		this.loginView.renderForm();
		this.setLocationProperties();
		this.addLoginListeners();	
	}

	addLoginListeners() {
		// Check if the input rules are being followed
		this.usernameElement.addEventListener('keydown', (event)=> {
			this.loginView.getRidOfErrorMessage();
			this.username = event.target.value;
			const isValidUsername = this.isValidUsername(this.username);
			if (!isValidUsername && !this.loginView.isErrorMessageDisplayed()) {
				this.loginView.renderErrorMessage('un');
			} else if (isValidUsername && this.loginView.isErrorMessageDisplayed()) {
				this.loginView.getRidOfErrorMessage();
			}
		});

		this.usernameElement.addEventListener('keyup', (event)=> {
			this.username = event.target.value;
		});

		this.passwordElement.addEventListener('keydown', ()=> {
			this.hashedPassword = '';
			this.loginView.getRidOfErrorMessage();
		});

		this.passwordElement.addEventListener('keyup', (event)=> {
			if (event.target.value !== '') {
				this.hashedPassword = (this.hashPassword(event.target.value)).toString();
			}
		});

		// check if username and password are empty. Double check the data actually is verified.
		this.handleSubmitEvent();
		
	}

	/**************************
	* This finds the form children. We want to use these for event listeners
	***************************/
	setLocationProperties() {
		this.usernameElement = [...[...this.parentElement.children][0].children][2];
		this.passwordElement = [...[...this.parentElement.children][1].children][2];
		this.submitElement = [...[...this.parentElement.children][2].children][0];
	}


	/*******************************
	* This code here checks for the following:
	*    the username doesn't exceed 100 chars
	*    first character is an alpha character 
	*    changes security vulnerabilities
	********************************/
	isValidUsername(username) {
		if (username.length > 100) {
			return false;
		}

		// security
		username = this.escapeHtml(username);

		// error checking if username does not start with an alpha character
		if (!this.isAlpha(username) && !this.isEmpty(username)) {
			console.log('FALSE');
			return false;
		} 

		// final check — no whitespace whatsoever
		if (this.isWhiteSpace(username)) {
			return false;
		}

		return true;
	}

	/*************************
	* Credit for the JavaScript version of htmlspecialchars goes to 
	* 'Kip' on stackoverflow: https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
	**************************/
	escapeHtml(text) {
	    var map = {
	        '&': '&amp;',
	    	'<': '&lt;',
	    	'>': '&gt;',
	    	'"': '&quot;',
	    	"'": '&#039;'
	  	};
  
  		return text.replace(/[&<>"']/g, function(m) { return map[m]; });
	}

	/**************************
	* Credit for this hashing algorithm goes to 'bryc' on stackoverflow: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
	***************************/
	hashPassword(str, seed = 0) {
    	let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    	for (let i = 0, ch; i < str.length; i++) {
        	ch = str.charCodeAt(i);
        	h1 = Math.imul(h1 ^ ch, 2654435761);
        	h2 = Math.imul(h2 ^ ch, 1597334677);
    	}
    	h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    	h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    	return 4294967296 * (2097151 & h2) + (h1>>>0);
	};

	/**************************
	***************************/
	isAlpha(str) {
		const char = str.charCodeAt(0);
		console.log(char);
	    if (!(char > 64 && char < 91) && // upper alpha (A-Z)
	        !(char > 96 && char < 123)) { // lower alpha (a-z)
	      return false;
	    }
	  	return true;
	}

	isEmpty(str) {
		const char = str.charCodeAt(0);
		console.log(char);
		if (!(Number.isNaN(char))) {
			return false;
		}
		return true;
	}


	isWhiteSpace(str) {
		console.log(str.indexOf(' ') >= 0);
		return str.indexOf(' ') >= 0;
	}

	run = async (event) => {
		await this.sleep(0.1);
		event.preventDefault();
		console.log('awake');
	}

	sleep(duration) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve('resolved')
			}, duration * 1000)
		})
	}

	/******************************************************************
	* This took me forever to do, and I still don't like it. This 
	* seems like a very hacky way of logging in.
	*******************************************************************/
	handleSubmitEvent() {
		this.parentElement.addEventListener('submit', (event)=> {
		 	event.preventDefault();
			const isEmptyUsername = this.isEmpty(this.username);
			const isEmptyPassword = this.isEmpty(this.hashedPassword);
			if (isEmptyUsername || isEmptyPassword || this.loginView.isErrorMessageDisplayed()) {
				if (isEmptyUsername) {
					this.loginView.renderErrorMessage('un-e');
				}
				if (isEmptyPassword) {
					this.loginView.renderErrorMessage('pw');
				}
				return;
			}

			if (!isEmptyUsername && this.isValidUsername(this.username)) {
				this.loginModel.existsInDB(this.username, 'username').then((value) => {
					if (value === 'false') {
						this.loginView.renderErrorMessage('inUn');
					} else {
						if (!isEmptyPassword && !this.loginView.isErrorMessageDisplayed()) {
							this.loginModel.existsInDB(this.hashedPassword, 'password', this.username).then((value) => {
								if (value === 'false') {
									this.loginView.renderErrorMessage('inPw');
								}  else {
									window.location.href = "../home/home.php";			
								}
							});
						}
					}
				});
			}
		});

	
		
	}
} 