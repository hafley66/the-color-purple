import angular from 'angular'

var app = angular.module('my-tools', []);

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

app.directive('squareHeight', function() {
	return {
		link($scope, $elem) {
			$elem.width($elem.height());
		}
	}
})
app.directive('squareWidth', function() {
	return {
		link($scope, $elem) {
			$elem.height($elem.width());
		}
	}
})


app.directive('hoverState', function() {
	return {
		link($scope, $elem) {
			$elem.on('mouseenter', (e)=>{
				$elem.addClass('hovering')
			})

			$elem.on('mouseleave', e=>$elem.removeClass('hovering'))
		}
	}
})
app.directive('clickState', function() {
	return {
		link($scope, $elem) {
			$elem.on('click', e=>$elem.toggleClass('clicked'))
		}
	}
})

app.directive('collapseTarget', function() {
	return {
		bindToController: {
			'target': '@collapseTarget',
			'when': '=collapseWhen',
			'parent': '@?collapseParent'
		},
		controllerAs: 'collapser',
		controller(){
			this.$target = $(this.target)
			this.hide = ()=>this.$target.collapse('hide')
			this.show = ()=>this.$target.collapse('show')
		},
		link($scope, $elem, $attr, C) {
			var collapsing = null;
			var currentState = null;
			$scope.$watch('collapser.when', nvalue=>{
				if(!!nvalue)
					C.hide()
				else
					C.show()
			})
			$scope.$watch('collapser.target', nvalue=>{
				if(!!nvalue)
					C.$target = $(nvalue)
			})
			$elem.on('click', e=>$().collapse)
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
		bindToController: {
			'open': '@flowIn'
		},
		controllerAs: 'collapser',
		controller() {},
		link($scope, $elem, $attr) {
			var [elem] = $elem
			$scope.$watch('collapser.open', (newValue, oldValue)=> {
				if(newValue === 'true')
					newValue = true
				else
					newValue = false
				var val = 0;
				if(!!newValue) {
					val = Array.prototype.reduce.call(elem.childNodes, (p, c)=> {
						return p + (c.offsetHeight || 0);
					}, 0) + 'px';
				}
				console.log('new value is...', val);
				elem.style.maxHeight = val
			});
		}}})

app.directive('windowTracker', ()=> {
	return {
		link($scope, $elem, $attr) {
			
		}
	}
})

export default app;