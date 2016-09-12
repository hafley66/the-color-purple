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
	eyePath,
	chinPath,
	foreheadPath,
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
function eyePath(T) {
	var midY = 50;
	var left = 40;
	var right = 100 - left
	var midX = left + (right - left)/2
	return makeString([[ -10, 0 ], [ left, 0 ] , [ midX, midY ] ,[ 110, 110 ], [110, -10], [ 100, 0 ], [right, 0] , [50, midY] ,[ -10, 110 ]]) + 'Z'
}
function chinPath(T) {
	return makeString(triangleDown)
}
function foreheadPath(T) {
	return makeString([[ -10, -10 ], [ 50, 100 ], [ 110, -10 ], [110, 150], [-10, 150]]) + 'Z'	
}

function makeString(points, unit='%') {
	var makeString = (pathString, [x,y])=> pathString.push(`${x + unit} ${y + unit} L`) && pathString
	return points.reduce(makeString, ['M']).join(' ').trimLast();
}