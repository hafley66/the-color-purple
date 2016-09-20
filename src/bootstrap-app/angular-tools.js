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
				$scope.hovering = true
				$elem.addClass('hovering')
				$scope.$apply()
			})

			$elem.on('mouseleave', e=>{
				$scope.hovering = false
				$elem.removeClass('hovering')
				$scope.$apply()
			})
		}
	}
})
app.directive('clickState', function() {
	return {
		link($scope, $elem, $attr) {
			var stateName = $attr.clickState
			var clicked = false;
			if($scope[stateName] === undefined)
				$scope[stateName] = clicked || 'clicked'
			$elem.on('click', e=>{
				$scope[stateName] = !clicked
				clicked = !clicked
				$elem.toggleClass(stateName)
				$scope.$apply()
			})
		}
	}
})

app.directive('collapseTarget', function() {
	return {
		bindToController: {
			'target': '@collapseTarget',
			'when': '@collapseWhen'
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
			$scope.collapsed = false;
			var target = $(C.target)
			$scope.$watch(()=> $attr.collapseWhen , (nvalue) =>{
				var val = $scope.$eval(nvalue)
				if(!!val) 
					C.hide()
				else 
					C.show()
				$scope.collapsed = !!nvalue
			})
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

app.directive('sectionText', [function() {
	return {
		scope: true,
		link($scope, $elem, $attr) {
			$scope.section = {};
			if($attr.sectionInit)
				$scope.section.open = $scope.$eval($attr.sectionInit)
			else
				$scope.section.open = true
			$scope.toggleSection = () => $scope.section.open = !$scope.section.open
		}
	}
}])

export default app;