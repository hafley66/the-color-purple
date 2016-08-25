import fastdom from 'fastdom'
import resume from './resume'
import 'normalize.css'
import templateFn from './components/resume.pug';
import 'components/login/.sass'

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

export default app;