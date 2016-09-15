import './prefix.js'
import resumePage from '../components/pages/resume.js'
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

function resizeWindow() {
	window.dispatchEvent(new Event('resize'))
}
window.resize = resizeWindow

app.directive(...resumePage);
app.directive(...headerNeo)
app.directive(...headerNyeoh)

export default app;