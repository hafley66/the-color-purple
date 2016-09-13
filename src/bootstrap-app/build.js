import './prefix.js'
import resume from '../components/resume/.js'
import header from '../components/header/old/directive.js'
import headerAni from '../components/header/old/animator.js'
import headerNeo from '../components/paths/directive.js'
import headerNyeoh from '../components/header/directive.js'
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
// app.directive(...header);
app.directive(...headerNeo)
app.directive(...headerNyeoh)

export default app;