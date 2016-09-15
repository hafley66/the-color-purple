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
	triangleUp,
	contactButton,
	headingBg
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

function contactButton(T=0, tip=50, topSlack=3, bottomSlack=topSlack) {

	var midtop = [50, 0 - (T * tip)]
	var midbottom = [(T * 50), 100 + (T * tip)]
	var rightbottom = [100, 50 + (50 * T)]
	var topleft = [-topSlack*(1-T), 0]
	var bottomleft = [-bottomSlack*(1-T), 100, ' ']
	var pts = [topleft, midtop, [100, 0], rightbottom, midbottom, bottomleft]
	return makeString(pts) + 'Z';
}

function headingBg(T=0, left=10, right=10, ylift = 50) {
	var _lift = (50 - ylift), dir = 1
	if(_lift > 0)
		dir = -1
	var currLift = ylift + dir * _lift * (T)
	var leftPt = [-left, currLift]
	var rightPt = [100 + right, currLift]
	var pts = [leftPt, [0, 0], [100, 0], rightPt, [100, 100], [0, 100]];
	return makeString(pts) + 'Z'
}

function makeString(points, unit='%') {
	var makeString = (pathString, [x,y, xunit='%', yunit='%'])=> {
		if(x.hasExp())
			x = 0
		if(y.hasExp())
			y = 0
		pathString.push(`${x + xunit} ${y + yunit} L`)
		return pathString
	}
	return points.reduce(makeString, ['M']).join(' ').trimLast();
}