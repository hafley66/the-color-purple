import templateFn from './.pug'
const directiveName = 'myPaths'
const controllerAs = 'paths'

const template = templateFn();

const controller = function() {
	console.log('hello paths');
}

var triD = [[0, -1], [0, 0], [50, 100], [100, 0], [100, -1]]
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
		template
	}
}

export default [directiveName, directiveFunction]

function linkPath(T) {
	var start = 25, end = 75;
	var decay = (1-T)
	var growth = (100 - end) * T

	var decays = start * decay
	var grows = end + growth
	return makeString([[ start, start ], [ 50, decays ], [ end, start ],
		[ grows, 50 ] , [ end, end ], [ 50, grows ], [ start, end ], [decays, 50]])+ 'Z'
}

function mobileLinkPath(T) {

}

function contactPath(T) {
var left = `M -10% -40% L 100% -40% L 100% 50% L -10% 100% Z`	
var right =`M 0 -40% L 0 50%  L 110% 100% L 110% -40% Z`
}

function makeString(points, unit='%') {
	var makeString = (pathString, [x,y])=> pathString.push(`${x + unit} ${y + unit} L`) && pathString
	return points.reduce(makeString, ['M']).join(' ').trimLast();
}