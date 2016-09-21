import './prefix.js'
import paths from '../components/site/PathGen.js'
import mySite from '../components/site/Directive.js'
var app = angular.module('my-website', ['svg-helpers', 'my-tools']);

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

app.directive(...paths)
app.directive(...mySite)

export default app;