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
		this.usernameElement, this.username, this.emailElement, this.email = '';
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
			const isValidUsername = this.isValidUsername();
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
			const fitsInDBCell = this.isNotLong(this.email.length);
			if (!fitsInDBCell && !this.loginView.isErrorMessageDisplayed()) {
				this.loginView.renderErrorMesssage('em-char');
			} else if (fitsInDBCell && this.loginView.isErrorMessageDisplayed()) {
				this.loginView.getRidOfErrorMessage();
			}
		});

		// First name element

		// Last Name element

		// Password Element

		// handle submit events (check username, valid email format, )

	}

	/**************************************
	* This code checks the following:
	*     - the username doesn't exceed 100 chars
	*     - first character is an alpha character
	*     - security
	***************************************/
	isValidUsername() {
		if (!isNotLong(this.username.length)) {
			return false;
		}

		this.username = this.escapeHtml();

		if (!this.isAlpha() && !this.isEmpty()) {
			return false;
		}

		if (this.isWhiteSpace()) {
			return false;
		}

		return true;
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
	escapeHtml() {
	    var map = {
	        '&': '&amp;',
	    	'<': '&lt;',
	    	'>': '&gt;',
	    	'"': '&quot;',
	    	"'": '&#039;'
	  	};
  
  		return this.username.replace(/[&<>"']/g, function(m) { return map[m]; });
	}

	/*************************************
	* This method checks if the first letter is an alpha character 
	**************************************/
	isAlpha() {
		const char = this.username.charCodeAt(0);
	    if (!(char > 64 && char < 91) && // upper alpha (A-Z)
	        !(char > 96 && char < 123)) { // lower alpha (a-z)
	      return false;
	    }
	  	return true;
	}

	/*************************************
	* This method checks if the first letter is empty
	**************************************/
	isEmpty() {
		const char = this.username.charCodeAt(0);
		if (!(Number.isNaN(char))) {
			return false;
		}
		return true;
	}

	/************************************
	* This method checks for whitespace in the string
	*************************************/
	isWhiteSpace() {
		return this.username.indexOf(' ') >= 0;
	}
}