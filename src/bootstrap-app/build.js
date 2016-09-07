import './prefix.js'
import resume from '../components/resume/.js'

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

app.directive(...resume);

export default app;