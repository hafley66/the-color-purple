import './prefix.js'
import resume from '../components/resume/.js'
import header from '../components/header/directive.js'

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

// app.directive(...resume);
app.directive(...header);

export default app;