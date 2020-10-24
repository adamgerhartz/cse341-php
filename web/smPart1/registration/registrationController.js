import RegistrationView from './registrationView.js';
import RegistrationModel from './registrationModel.js';

/********************************************
* Class: Registration Controller
* Author: Adam Gerhartz
* Purpose: This class handles the business logic
*          and user interation of the registration
*          process.
*********************************************/
export default class RegistrationController {
	constructor(parentId) {
		this.parentElement = document.getElementById(parentId);
		this.registrationView = new RegistrationView(this.parentElement);
		this.registrationModel = new RegistrationModel();
		this.usernameElement, this.username, this.emailElement, this.email, this.firstNameElement, this.firstName, this.lastNameElement, this.lastName, this.passwordElement, this.hashedPassword = '';
	}

	/****************************************
	* This method renders the form and adds 
	* event listeners.
	*****************************************/
	showRegistrationForm() {
		this.registrationView.renderForm();
		this.setLocationProperties();
		this.addRegistrationListeners();
	}

	/***************************************
	* The controller wants to save important 
	* form element locations
	****************************************/
	setLocationProperties() {
		this.usernameElement = [...[...this.parentElement.children][0].children][2];
		this.emailElement = [...[...this.parentElement.children][1].children][2];
		this.firstNameElement = [...[...[...this.parentElement.children][2].children][0].children][2];
		this.lastNameElement = [...[...[...this.parentElement.children][2].children][1].children][2];
		this.passwordElement = [...[...this.parentElement.children][3].children][2];
	}

	/***************************************
	* This handles user interaction and form validation
	****************************************/
	addRegistrationListeners() {
		// Username Element
		this.usernameElement.addEventListener('keydown', ()=> {
			this.loginView.getRidOfErrorMessage();
		});

		this.usernameElement.addEventListener('keyup', (event)=> {
			this.username = event.target.value;
			const isValidUsername = this.isValidUsername(this.username);
			if (!isValidUsername && !this.loginView.isErrorMessageDisplayed()) {
				this.loginView.renderErrorMesssage('un');
			} else if (isValidUsername && this.loginView.isErrorMessageDisplayed()) {
				this.loginView.getRidOfErrorMessage();
			}
		});

		// Email Element
		this.emailElement.addEventListener('keydown', ()=> {
			this.loginView.getRidOfErrorMessage();
		});

		this.emailElement.addEventListener('keyup', (event)=> {
			this.email = event.target.value;
			const isPartiallyValid = this.isPartiallyValidEmail(this.email);
			if (!isPartiallyValid && !this.loginView.isErrorMessageDisplayed()) {
				this.loginView.renderErrorMesssage('em-char');
			} else if (isPartiallyValid && this.loginView.isErrorMessageDisplayed()) {
				this.loginView.getRidOfErrorMessage();
			}
		});

		// First name element
		this.firstNameElement.addEventListener('keydown', ()=> {
			this.loginView.getRidOfErrorMessage();
		})

		this.firstNameElement.addEventListener('keyup', (event)=> {
			this.firstName = event.target.value;
			const isValidName = this.isValidName(this.firstName);
			if(!isValidName && !this.loginView.isErrorMessageDisplayed()) {
				this.loginView.renderErrorMesssage('fnm');
			} else if (isValidName && this.loginView.isErrorMessageDisplayed()) {
				this.loginView.getRidOfErrorMessage();
			}
		})

		// Last Name element
		this.lastNameElement.addEventListener('keydown', ()=> {
			this.loginView.getRidOfErrorMessage();
		})

		this.lastNameElement.addEventListener('keyup', (event)=> {
			this.lastName = event.target.value;
			const isValidName = this.isValidName(this.lastName);
			if(!isValidName && !this.loginView.isErrorMessageDisplayed()) {
				this.loginView.renderErrorMesssage('lnm');
			} else if (isValidName && this.loginView.isErrorMessageDisplayed()) {
				this.loginView.getRidOfErrorMessage();
			}
		})

		// Password Element
		this.passwordElement.addEventListener('keydown', ()=> {
			this.hashedPassword = '';
			this.loginView.getRidOfErrorMessage();
		});

		this.passwordElement.addEventListener('keyup', (event)=> {
			if (event.target.value !== '') {
				this.hashedPassword = this.hashPassword(event.tartget.value).toString();
			}
		});

		// handle submit events (check username, valid email format, empty)
		this.handleSubmitEvent();
	}

	/**************************************
	* This code checks the following:
	*     - the username doesn't exceed 100 chars
	*     - first character is an alpha character
	*     - security
	***************************************/
	isValidUsername(username) {
		if (!isNotLong(username.length)) {
			return false;
		}

		this.username = this.escapeHtml(username);

		if (!this.isAlpha(username) && !this.isEmpty(username)) {
			return false;
		}

		if (this.isWhiteSpace(username)) {
			return false;
		}

		return true;
	}

	/**************************************
	* This method partially validates and email. 
	* It checks that there are no whitespaces and the length
	* is able to fit in a DB cell. It does not check if the
	* email is a valid email
	***************************************/
	isPartiallyValidEmail(email) {
		if (!isNotLong(email.length)) {
			return false;
		}

		if (this.isWhiteSpace(email)) {
			return false;
		}

		return true;

	}

	/**************************************
	* Valid name just checks for no white space as the beginning
	* character, and looks that the user doesn't use anything but alpha characters
	***************************************/
	isValidName(name) {
		if (!isNotLong(name.length)) {
			return false;
		}

		const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
		if (!regName.test(name)) {
			return false;
		}

		if (isEmpty(name)) {
			return false;
		}

		return true;
	}

	/**************************************
	* This method handles the following when a user taps on the
	* submit event:
	*   1. no empty fields
	*   2. username is unique from the DB
	*   3. the email is a valid email address
	***************************************/
	handleSubmitEvent() {
		this.parentElement.addEventListener('submit', (event)=> {
			event.preventDefault();
			const isEmptyUsername = this.isEmpty(this.username);
			const isEmptyEmailAddress = this.isEmpty(this.email);
			const isEmptyFirstName = this.isEmpty(this.firstName);
			const isEmptyLastName = this.isEmpty(this.lastName);
			const isEmptyPassword = this.isEmpty(this.hashedPassword);
			
			// check if we are empty
			if (isEmptyUsername || isEmptyEmailAddress || isEmptyFirstName || isEmptyLastName || isEmptyPassword || this.loginView.isErrorMessageDisplayed()) {
				if (isEmptyUsername) {
					this.loginView.renderErrorMesssage('un-e');
				}
				if (isEmptyEmailAddress) {
					this.loginView.renderErrorMesssage('ea-e');
				}
				if (isEmptyFirstName) {
					this.loginView.renderErrorMesssage('fnm-e');
				}
				if (isEmptyLastName) {
					this.loginView.renderErrorMesssage('lnm-e');
				}
				if (isEmptyPassword) {
					this.loginView.renderErrorMesssage('pw-e');
				}
			}

			// check for valid email address
			const isValidEmailAddress = this.isValidEmailAddress(this.email);
			if (!isValidEmailAddress) {
				this.loginView.renderErrorMesssage('ea-in');
			}

			// check for unique username
			// if (!isEmptyUsername) {
			// 	this.loginModel.existsInDB(this.username, 'username').then((value) => {
			// 		if (value === 'true') {
			// 			this.loginView.renderErrorMesssage('inUn');
			// 		} else {
			// 			this.loginModel.addToDB(this.username, this.hashedPassword).then((value) => {
			// 				if (value === 'true') {
			// 					window.location.href = './registrationConfirmation.php';
			// 				} else {
			// 					this.loginView.renderErrorMesssage('er-upload');
			// 				}
			// 			});
						
			// 		}
			// 	});
			// }
		});
	}

	/**************************************
	* This method ensures an input is not longer
	* than 100 characters
	***************************************/
	isNotLong(length) {
		if (length > 100) {
			return false;
		}
		return true;
	}

	/**************************************
	* Credit for the JavaScript version of htmlspecialchars goes to 
	* 'Kip' on stackoverflow: https://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
	***************************************/
	escapeHtml(str) {
	    var map = {
	        '&': '&amp;',
	    	'<': '&lt;',
	    	'>': '&gt;',
	    	'"': '&quot;',
	    	"'": '&#039;'
	  	};
  
  		return str.replace(/[&<>"']/g, function(m) { return map[m]; });
	}

	/*************************************
	* This method checks if the first letter is an alpha character 
	**************************************/
	isAlpha(str) {
		const char = str.charCodeAt(0);
	    if (!(char > 64 && char < 91) && // upper alpha (A-Z)
	        !(char > 96 && char < 123)) { // lower alpha (a-z)
	      return false;
	    }
	  	return true;
	}

	/*************************************
	* This method checks if the first letter is empty
	**************************************/
	isEmpty(str) {
		const char = str.charCodeAt(0);
		if (!(Number.isNaN(char))) {
			return false;
		}
		return true;
	}

	/************************************
	* This method checks for whitespace in the string
	*************************************/
	isWhiteSpace(str) {
		return str.indexOf(' ') >= 0;
	}

	/************************************
	* This method hashes a password into 
	* a set of integers
	*   Credit for this hashing algorithm goes to 'bryc' on stackoverflow: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
	*************************************/
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

	/***********************************
	* This method returns true if we have a valid email address
	* Credit goes to whoever posted here: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
	************************************/
	isValidEmailAddress(email) {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    	if (!re.test(String(email).toLowerCase())) {
    		return false; 
    	}
    	return true;
	}

}