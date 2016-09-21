const controller = function() {
	console.log('hello paths');
}

var triD = [[0, 0], [0, 0], [50, 95], [100, 0], [100, 0]]
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

export default new controller()

function linkPath(T) {
	var start = 25, end = 75;
	var decay = (1-T)
	var growth = (100 - end) * T

	var decays = start * decay
	var grows = end + growth
	return makeString([[ start, start ], [ 50, decays ], [ end, start ],
		[ grows, 50 ] , [ end, end ], [ 50, grows ], [ start, end ], [decays, 50]])+ 'Z'
}

function contactButton(T=0, tip=50, topSlack=3, bottomSlack=topSlack) {
	if(T > 0)
		return "M 0 0 L 50% -50% L 100% 0 L 100% 100% L 50% 150% L 0 100% Z"
	else
		return `M -2.5% 0 L 50% 0 L 100% 0 L 100% 50% L 50% 75% L 0 100% Z`
}

function headingBg(T=0){
	if(T === 1)
		return `M 0% 100% L 10% 0 L 90% 0 L 100% 100% L 90% 100%  L 10% 100% Z`
	else
		return `M 5% 50% L 10% 0 L 90% 0 L 95% 50% L 90% 100% L 10% 100% Z`
}


function makeString(points, unit='') {
	var makeString = (pathString, [x,y, xunit=unit, yunit=unit])=> {
		if(x.hasExp())
			x = 0
		if(y.hasExp())
			y = 0
		pathString.push(`${x + xunit} ${y + yunit} L`)
		return pathString
	}
	return points.reduce(makeString, ['M']).join(' ').trimLast();
}