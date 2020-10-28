import HomeController from './homeController.js';

const homeController = new HomeController('main-page');
window.addEventListener('load', ()=> {
	homeController.showHomePage();
});