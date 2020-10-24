
export default class LoginView {

	constructor(formElement) {
		this.formElement = formElement;
	}

	renderForm() {
		this.formElement.innerHTML = '';
		const childOne = `Username`;
		const childTwo = `Password`;
		this.formElement.appendChild(this.renderInputDiv(childOne));
		this.formElement.appendChild(this.renderInputDiv(childTwo));
		this.formElement.appendChild(this.renderSubmitDiv());
		this.formElement.appendChild(this.renderAnchorRegister());
	}

	renderInputDiv(child) {
		const div = document.createElement('div');
		div.innerHTML = (`
			<label for='${child.toLowerCase()}'>${child}</label><br/>
			<input type='${child === 'Password' ? 'password' : 'text'}' class='light' name='${child.toLowerCase()}' autocomplete='off'>
		`);
		return div;
	}

	renderSubmitDiv() {
		const div = document.createElement('div');
		div.innerHTML = `<input type='submit' class='light' name='submit'>`;
		return div;
	}

	renderAnchorRegister() {
		const div = document.createElement('div');
		div.innerHTML = `<a href='../registration/register.html' id='registration-link'>Create an account</a>`;
		return div;
	}

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
					span.innerHTML += ` Username doesn't exist in the database`;
					break;
				case 'un-e':
					span.innerHTML += ` Please enter a username`;
					break;
				case 'pw':
					span.innerHTML += ` Please enter a password`;
					break;
				case 'inPw':
					span.innerHTML += ` Password does not match the password we have on record.`;
					break;
				default:
					span.innerHTML += '';
			}
			return span;
		}
		this.formElement.appendChild(newChild());		
	}

	getRidOfErrorMessage() {
		if (this.formElement.childNodes.length > 4) {
			for (let i = this.formElement.childNodes.length - 1, min = 3; i > min; i--) {
				this.formElement.removeChild(this.formElement.children[i]);
			}
		}
	}

	isErrorMessageDisplayed() {
		console.log(this.formElement.children);
		if (this.formElement.childNodes.length > 4) {
			return true;
		}
		return false;
	}
}