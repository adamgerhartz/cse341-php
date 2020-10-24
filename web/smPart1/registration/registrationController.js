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
	}

	/****************************************
	* This method renders the form and adds 
	* event listeners.
	*****************************************/
	showRegistrationForm() {

	}
}