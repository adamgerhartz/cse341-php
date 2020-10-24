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
	}

	/***************************************
	* This handles user interaction and form validation
	****************************************/
	addRegistrationListeners() {

	}
}