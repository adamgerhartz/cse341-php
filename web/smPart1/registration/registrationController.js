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
		this.usernameElement = '';
		this.username = '';
		this.emailElement = '';
		this.email = '';
		this.firstNameElement = '';
		this.firstName = '';
		this.lastNameElement = '';
		this.lastName = '';
		this.passwordElement = '';
		this.hashedPassword = '';
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
			this.registrationView.getRidOfErrorMessage();
		});

		this.usernameElement.addEventListener('keyup', (event)=> {
			this.username = event.target.value;
			if (this.username !== '') {
				const isValidUsername = this.isValidUsername(this.username);
				if (!isValidUsername && !this.registrationView.isErrorMessageDisplayed()) {
					this.registrationView.renderErrorMessage('un');
				} else if (isValidUsername && this.registrationView.isErrorMessageDisplayed()) {
					this.registrationView.getRidOfErrorMessage();
				}
			}
			
		});

		// Email Element
		this.emailElement.addEventListener('keydown', ()=> {
			this.registrationView.getRidOfErrorMessage();
		});

		this.emailElement.addEventListener('keyup', (event)=> {
			this.email = event.target.value;
			if (this.email !== '') {
				const isPartiallyValid = this.isPartiallyValidEmail(this.email);
				if (!isPartiallyValid && !this.registrationView.isErrorMessageDisplayed()) {
					this.registrationView.renderErrorMessage('em-char');
				} else if (isPartiallyValid && this.registrationView.isErrorMessageDisplayed()) {
					this.registrationView.getRidOfErrorMessage();
				}
			}
		});

		// First name element
		this.firstNameElement.addEventListener('keydown', ()=> {
			this.registrationView.getRidOfErrorMessage();
		})

		this.firstNameElement.addEventListener('keyup', (event)=> {
			this.firstName = event.target.value;
			if (this.firstName !== '') {
				const isValidName = this.isValidName(this.firstName);
				if(!isValidName && !this.registrationView.isErrorMessageDisplayed()) {
					this.registrationView.renderErrorMessage('fnm');
				} else if (isValidName && this.registrationView.isErrorMessageDisplayed()) {
					this.registrationView.getRidOfErrorMessage();
				}
			}
		})

		// Last Name element
		this.lastNameElement.addEventListener('keydown', ()=> {
			this.registrationView.getRidOfErrorMessage();
		})

		this.lastNameElement.addEventListener('keyup', (event)=> {
			this.lastName = event.target.value;
			if (this.lastName !== '') {
				const isValidName = this.isValidName(this.lastName);
				if(!isValidName && !this.registrationView.isErrorMessageDisplayed()) {
					this.registrationView.renderErrorMessage('lnm');
				} else if (isValidName && this.registrationView.isErrorMessageDisplayed()) {
					this.registrationView.getRidOfErrorMessage();
				}
			}	
		})

		// Password Element
		this.passwordElement.addEventListener('keydown', ()=> {
			this.hashedPassword = '';
			this.registrationView.getRidOfErrorMessage();
		});

		this.passwordElement.addEventListener('keyup', (event)=> {
			if (event.target.value !== '') {
				this.hashedPassword = this.hashPassword(event.target.value).toString();
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
		if (!this.isNotLong(username.length)) {
			return false;
		}

		username = this.escapeHtml(username);

		if (!this.isAlpha(username)) {
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
		if (!this.isNotLong(email.length)) {
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
		if (!this.isNotLong(name.length)) {
			return false;
		}

		if (this.isWhiteSpaceFront(name)) {
			return false;
		}

		const regName = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
		if (!regName.test(name)) {
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
			if (isEmptyUsername || isEmptyEmailAddress || isEmptyFirstName || isEmptyLastName || isEmptyPassword || this.registrationView.isErrorMessageDisplayed()) {
				if (isEmptyUsername) {
					this.registrationView.renderErrorMessage('un-e');
				}
				if (isEmptyEmailAddress) {
					this.registrationView.renderErrorMessage('ea-e');
				}
				if (isEmptyFirstName) {
					this.registrationView.renderErrorMessage('fnm-e');
				}
				if (isEmptyLastName) {
					this.registrationView.renderErrorMessage('lnm-e');
				}
				if (isEmptyPassword) {
					this.registrationView.renderErrorMessage('pw-e');
				}
			}

			// check for valid email address
			const isValidEmailAddress = this.isValidEmailAddress(this.email);
			if (!isValidEmailAddress && !isEmptyEmailAddress) {
				this.registrationView.renderErrorMessage('ea-in');
			}

			// check for unique username
			if (!isEmptyUsername) {
				this.registrationModel.existsInDB(this.username, 'username').then((value) => {
					if (value === 'true') {
						this.registrationView.renderErrorMessage('inUn');
					}
					// } else {
					// 	this.registrationModel.addToDB(this.username, this.email, this.firstName, this.lastName, this.hashedPassword).then((value) => {
					// 		if (value === 'true') {
					// 			window.location.href = './registrationConfirmation.php';
					// 		} else {
					// 			this.registrationView.renderErrorMessage('er-upload');
					// 		}
					// 	});
						
					// }
				});
			}
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
	isWhiteSpaceFront(str) {
		const char = str.charCodeAt(0);
		console.log(char);
		if (char === parseInt('32')) {
			return true;
		}
		return false;
	}

	/*************************************
	* This method checks if there is no value whatsover
	**************************************/
	isEmpty(str) {
		const char = str.charCodeAt(0);
		console.log(char);
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