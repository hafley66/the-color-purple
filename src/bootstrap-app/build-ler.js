import './prefix.js'
import resumePage from '../components/pages/resume.js'
import headerNeo from '../components/paths/directive.js'
import headerNyeoh from '../components/header/directive.js'
import aboutPage from '../components/pages/about.js'
import mySite from '../components/site/Directive.js'
var app = angular.module('my-website', ['svg-helpers', 'my-tools', 'my-tweens']);

function scale(elem, value) {
	elem.css({transform: `scale(${value})`});
}

function translate(elem, value) {
	elem.css({
		transform: `translate(${value})`
	})
}

function clear(elem) {
	elem.css({transform: ''})
}

function resizeWindow() {
	var evt = document.createEvent('UIEvents'); evt.initUIEvent('resize', true, false, window, 0); window.dispatchEvent(evt);
	// window.dispatchEvent(new Event('resize'))
}


window.resize = resizeWindow

app.directive(...resumePage);
app.directive(...headerNeo)
app.directive(...headerNyeoh)
app.directive(...aboutPage)
app.directive(...mySite)

export default app;