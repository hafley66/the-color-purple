import fastdom from 'fastdom'
import resume from './resume/resume'
import 'normalize.css'
import templateFn from './components/resume.pug';
import 'components/login/.sass'
import './custom/bootstrap.scss';
import './print-fix.css'


var template = templateFn();
var app = angular.module('muh-demo', []);
app.directive('muhApp', ()=> ({template}));

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

app.controller('fuck', ['$scope', function controller($scope) {
	var activeItem = null;
	this.items = ['Chris Hafley'];
	Object.assign(this, {
		toggle(item) {
			this.isActive(item) ? this.deactivate(item) : this.activate(item);
		},
		isActive(item) {
			if(!item) return(!!activeItem)
				else return(activeItem === item)
			},
		activate(item) { activeItem = item },
		deactivate(item) { activeItem = null }
	});
}]);

app.directive('floatTop', function() {
	return({
		link($scope, $elem){
			var floating = false;
			var mez = mezr.place($elem[0], {
				my: 'left top',
				at: 'left top',
				of: $elem.parent()[0]
			})
			var offset = mez.top;
			$elem.on('click', toggleFloat);
			function toggleFloat() {
				if(floating) clear($elem)
					else translate($elem, `0px, ${offset}px`);
				floating = !floating;
			}}})
})

app.directive('squarePlease', function() {
	return {
		link($scope, $elem) {
			$elem.width($elem.height());
		}
	}
})

app.directive('hoverState', function() {
	return {
		link($scope, $elem) {
			console.log($elem);
			$elem.on('mouseenter', (e)=>{
				$elem.addClass('hovering')
			})

			$elem.on('mouseleave', e=>$elem.removeClass('hovering'))
		}
	}
})

app.directive('postMeasure', ()=>{
	return {
		link($scope, $elem, $attr) {
			var command = $attr.mezrHeight.split(' ');
			var [myAttribute, parentType, fromAttribute] = command
			target = $elem[parentType]() || $elem;
			$elem[myAttribute](target[attribute]);
		}
	}
});

app.directive('flowIn', ()=>{
	return {
		link($scope, $elem, $attr) {
			var [elem] = $elem
			var height = 
			$scope.$watch($attr.flowIn, (newValue, oldValue)=> {
				if(!!newValue) 
					elem.style.maxHeight = Array.prototype.reduce.call(elem.childNodes, (p, c)=> p + (c.offsetHeight || 0), 0) + 'px';
				else
					elem.style.maxHeight = 0
			});
		}}})

app.controller('Resumer', function() {
	Object.assign(this, resume);
})

app.directive('relative-d', function() {
	return {
		link($scope, $elem, $attr){
			var W, H, d;
			var relX = str => (Number(str)/100) * W
			var relY = str => (Number(str)/100) * H

			var replaceFunctions = [
			[/[MLH] ?(\d+%)/gi, relX], 
			[/[V] ?(\d+%)/gi, relY], 
			[/[ML] ?\d+[^\s]*\s*,?\s*(\d+%)/gi, relY]
			]
			var replacePercents = (pathString, [percentageRegex, percentageFunction])=> 
			pathString.replace(percentageRegex, percentageFunction)
			var reducePercents = (pathString) => 
			replaceFunctions.reduce(reducePercents, pathString)

			var getPath = () => fastdom.measure( () => d=$elem.attr('relative-d') )
			var setPath = () => fastdom.mutate(()=> element.setAttribute('d', replacePercents(pathString)))
			var updatePath= () => getPath().then(setPath)

			$scope.$on('view-box-change', (e, data)=> {
				[W, H] = data
				updatePath()
			})

			$scope.$watch('relative-d', pathString =>{
				d = pathString
				setPath()
			})

		}
	}
})

app.directive('viewBoxFit', function() {
	return {
		link($scope, $elem, $attr) {
			var W, H, element = $elem[0];
			var getViewBox = e=> fastdom.measure(x=>{
				W = $elem.width();
				H = $elem.height();
			})
			var setViewBox = e => fastdom.mutate(x=>{
				element.setAttribute(`0 0 ${W} ${H}`)
			})
			var broadcastViewBox = e => $scope.$broadcast('view-box-change', [0, 0, W, H]);
			var doThings = e => getViewBox().then(setViewBox).then(broadcastViewBox);
			onResize(doThings)
			doThings();
		}
	}
})

function onResize(fn, debounceThreshold=100) {
	$(window).on('resize', _.debounce(fn, debounceThreshold));
}

export default app;