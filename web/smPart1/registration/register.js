import RegistrationController from './registrationController.js';

const registrationController = new RegistrationController('registration-form');
window.addEventListener('load', ()=> {
	registrationController.showRegistrationForm();
});