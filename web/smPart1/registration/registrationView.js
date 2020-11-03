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
		this.formParentElement.appendChild(this.renderInputDiv('Email'));
		this.formParentElement.appendChild(this.renderNestedDiv('full-name'));
		this.formParentElement.appendChild(this.renderInputDiv('Password'));
		this.formParentElement.appendChild(this.renderSubmitDiv());
	}

	/*********************************
	* This method renders a single div 
	* input field
	**********************************/
	renderInputDiv(child) {
		const div = document.createElement('div');
		div.innerHTML = (`
			<label for='${child.toLowerCase()}'>${child}</label><br/>
			<input type="${child === 'Password' ? 'password' : 'text'}" class='light form-control' name='${child.toLowerCase()}' autocomplete='off'>
		`);
		return div;
	}

	/*********************************
	* <div full-name>
	*   <div>FirstName</div>
	*   <div>LastName</div>
	* </div>
	**********************************/
	renderNestedDiv(id) {
		const div = document.createElement('div');
		div.setAttribute('id', id);
		div.innerHTML = (`
			<div id='firstNameContainer'>
			  <label for='firstname'>First Name:</label><br/>
			  <input type='text' class='light form-control' name='firstname' autocomplete='off'>
			</div>
			<div id='lastNameContainer'>
			  <label for='lastname'>Last Name:</label><br/>
			  <input type='text' class='light form-control' name='lastname' autocomplete='off'>
			</div>
		`);
		return div;
	}

	/********************************
	* This method renders the submit button
	*********************************/
	renderSubmitDiv() {
		const div = document.createElement('div');
		div.innerHTML = `<input type='submit' class='btn light btn-primary' name='submit' value='Register'>`;
		return div;
	}

	/********************************
	* This method gets rid of the error message(s) 
	* that exist below the important form-children nodes
	*********************************/
	getRidOfErrorMessage() {
		if (this.formParentElement.childNodes.length > 5) { 
			for (let i = this.formParentElement.childNodes.length - 1, min = 4; i > min; i--) {
				this.formParentElement.removeChild(this.formParentElement.children[i]);
			}
		}
	}

	/*******************************
	* This method checks if there are 
	* more child nodes than there should be. If 
	* there are more, then error messsages exist
	********************************/
	isErrorMessageDisplayed() {
		if (this.formParentElement.childNodes.length > 5) {
			return true;
		}
		return false;
	}

	/******************************
	* This method renders the error message 
	* as specified by the client to this
	* method.
	*******************************/
	renderErrorMessage(type) {
		let newChild = ()=> {
			const span = document.createElement('span');
			span.setAttribute('id', 'error');
			span.innerHTML = `<br/>Error:`;
			switch (type) {
				case 'un':
					span.innerHTML += ` Username must (1) start with a letter from the alphabet, (2) limit itself to 100 characters, and (3) contain no white spaces.`;
					break;
				case 'inUn':
					span.innerHTML += ` Username already exists in the database. Please specifiy another username.`;
					break;
				case 'un-e':
					span.innerHTML += ` Please enter a username.`;
					break;
				case 'em-char':
					span.innerHTML += ` Email must (1) limit itself to 100 characters and (2) contain no white spaces.`
					break;
				case 'ea-e':
					span.innerHTML += ` Please enter an email address.`;
					break;
				case 'ea-in':
					span.innerHTML += ` Invalid email address.`;
					break;
				case 'fnm':
					span.innerHTML += ` Firstname must (1) be all alpha characters, (2) cannot start with a white space, and (3) limit itself to 100 characters.`;
					break;
				case 'fnm-e':
					span.innerHTML += ` Please enter a first name.`;
					break;
				case 'lnm':
					span.innerHTML += ` Lastname must (1) be all alpha characters, (2) cannot start with a white space, and (3) limit itself to 100 characters.`;
					break;
				case 'lnm-e':
					span.innerHTML += ` Please enter a last name.`;
					break;
				case 'pw-e':
					span.innerHTML += ` Please enter a password`;
					break;
				case 'er-upload':
					span.innerHTML += ` Error adding credentials into the database`;
					break;
				default:
					span.innerHTML += '';
			}
			return span;
		}
		this.formParentElement.appendChild(newChild());
	}
}