import LoginController from './loginController.js';

const loginController = new LoginController('login-form');
window.addEventListener('load', ()=> {
	loginController.showLoginForm();
});