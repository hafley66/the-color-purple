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
		bindToController: {
			'open': '=flowIn'
		},
		controllerAs: 'collapser',
		controller() {},
		link($scope, $elem, $attr) {
			var [elem] = $elem
			$scope.$watch('collapser.open', (newValue, oldValue)=> {
				if(!!newValue) 
					elem.style.maxHeight = Array.prototype.reduce.call(elem.childNodes, (p, c)=> p + (c.offsetHeight || 0), 0) + 'px';
				else
					elem.style.maxHeight = 0
			});
		}}})

export default app;