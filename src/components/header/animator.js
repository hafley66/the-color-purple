import _ from 'lodash';
import genWaves from './pathGen.js'



const TOP = 0, 
LEFT = 1,
BOTTOM = 2,
RIGHT = 3;

const sides= {
	TOP,
	LEFT,
	BOTTOM,
	RIGHT
}

var ddo = ['pathAnimator0', function() {
	return {
		bindToController: {
			time: '=aniTime'
		},
		controllerAs: 'ani',
		controller: DirectionalPathAnimator,
		link: ($scope, $elem, $a, C)=>{
			$scope.$watch('ani.time', time=> C.animate(time))
		}
	}
}]

function DirectionalPathAnimator() {
	console.log('hello animation controller');
	this.position = -100
	this.size = 0;
	this.setSide(sides.TOP);
}

var proto = {
	setSideFromEvent($event) {
		var side = getEventSideEntrance($event);
		this.setSide(side);
	},
	setSide(side){
		this.side = side
		if(side === TOP || side === BOTTOM)
			this.animation = this.fromCenter
		else if(side === LEFT)
			this.animation = this.fromLeft
		else if(side === RIGHT)
			this.animation = this.fromRight
	},
	animate(time100=this.time) {
		this.animation(time100);
		console.log('size is...', this.size);
	},
	fromCenter(time100) {
		this.position = -(50 - time100/2)
		this.size = time100
	},
	fromLeft(time100) {
		this.position = (100 - time100)
		this.size = 100
	},
	fromRight(time100) {
		this.position = -(100-time100)
		this.size = 100
	}
}

Object.assign(DirectionalPathAnimator.prototype, proto)

function getEventSideEntrance($event) {
	var target = $($event.currentTarget)
	var rectangle = offsetRectangle(target);
	var point = [$event.offsetX, $event.offsetY]
	var side = getClosestSide(rectangle, point);
	console.log('side...', _.invert(sides)[side]);
	return side;
}


function getClosestSide([T, L, B, R], [X,Y]) {
	var ary = [T-Y, L-X, B-Y, R-X].map(Math.abs)
	var min = Infinity, minI = -1;
	ary.forEach((v,i)=>{
		if(v < min){
			minI = i
			min = v
		}
	})
	if(minI > -1)
		return minI
	return null;
}

function offsetRectangle($element) {
	return [0, 0, $element.height(), $element.width()]
}
function rectAsPoints([T, L, B, R]) {
	return [
	[L, T],
	[R, T],
	[L, B],
	[R, B]
	]
}

export default ddo