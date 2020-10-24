/**************************************
* Class: Registration View
* Author: Adam Gerhartz
* Purpose: This class renders the form 
*          and receives direction from the
*          controller to display error messages
***************************************/
export default class RegistrationView {
	constructor(formParentElement) {
		this.formParentElement = formParentElement;
	}

	/**********************************
	* This method renders everything on the
	* form. 
	***********************************/
	renderForm() {
		this.formParentElement.innerHTML = '';
		this.formParentElement.appendChild(this.renderInputDiv('Username'));
	}

	/*********************************
	* This method renders a single div 
	* input field
	**********************************/
	renderInputDiv(label) {
		const div = document.createElement('div');
		div.innerHTML = (`
			<label for='${label.toLowerCase()}'>${label}</label><br/>
			<input type='${label === 'Password' ? 'password' : 'text'}' class='light' name='${label.toLowerCase()}' autocomplete='off'>
		`);
		return div;
	}
}