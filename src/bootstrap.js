import fastdom from 'fastdom'

import 'normalize.css'
import templateFn from './components/muh-app.pug';
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
	this.items = ['login', 'register', 'skip'];
	Object.assign(this, {
		toggle(item) {
			this.isActive(item) ? this.deactivate(item) : this.activate(item);
		},
		isActive(item) {
			if(!item)
				return !!activeItem;
			return activeItem === item;
		},
		activate(item) {
			activeItem = item;
		},
		deactivate(item) {
			activeItem = null;
		}
	});
}]);

app.directive('floatTop', function() {
	return {
		link($scope, $elem){
			var floating = false;
			var mez = mezr.place($elem[0], {
				my: 'left top',
				at: 'left top',
				of: $elem.offsetParent()[0]
			})
			var offset = mez.top;
			$elem.on('click', toggleFloat);
			function toggleFloat() {
				if(floating)
					clear($elem)
				else
					translate($elem, `0px, ${offset}px`);
				floating = !floating;
				console.log($elem, 'offset', offset);
			}
		}
	}
})

export default app;