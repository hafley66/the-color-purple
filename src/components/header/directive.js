import templateFn from './.pug'
const directiveName = 'newHeader'
const controllerAs = 'header'

const template = templateFn();

const controller = function() {
	this.links = ['home', 'resume', 'demos'];
	this.active = this.links[0];
}

var triD = [[0, -10], [0, 0], [50, 100], [100, 0], [100, -10]]
var triU = triD.map(([x,y])=> [x, 100 - y])
var triL = triD.map(([x,y])=> [y, x])
var triR = triL.map(([x,y])=> [100-x, y])
function triangleDown(T) {
	return makeString(triD)
}
function triangleUp(T) {
	return makeString(triU)
}
Object.assign(controller.prototype, {
	linkPath,
	triangleDown,
	triangleUp
})

const directiveFunction = function( ){
	return {
		controller,
		controllerAs,
		template,
		link($scope, $elem, $attr, C) {
			console.log('hello new header');
		}
	}
}

export default [
directiveName,
directiveFunction
]



function linkPath(T) {
	var start = 25, end = 75;
	var decay = (1-T)
	var growth = (100 - end) * T

	var decays = start * decay
	var grows = end + growth
	return makeString([[ start, start ], [ 50, decays ], [ end, start ],
		[ grows, 50 ] , [ end, end ], [ 50, grows ], [ start, end ], [decays, 50]])+ 'Z'
}
function makeString(points, unit='%') {
	var makeString = (pathString, [x,y])=> pathString.push(`${x + unit} ${y + unit} L`) && pathString
	return points.reduce(makeString, ['M']).join(' ').trimLast();
}