import './prefix.js'
import resume from '../components/resume/.js'
import header from '../components/old/header/directive.js'
import headerAni from '../components/old/header/animator.js'

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

// app.directive(...resume);
app.directive(...header);
app.directive(...headerAni)

export default app;