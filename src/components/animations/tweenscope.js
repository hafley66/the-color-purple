const app = angular.module('my-tweens', [])
const directiveName = 'myTween'
const bindToController = {
	monUpdate: '&',
	monStart: '&',
	monEnd: '&',
	mduration: '<?duration',
	mrepeat: '<?repeat',
	startPaused: '<?',
	mfrom: '<?from',
	mto: '<?to',
	mreverse: '<?reverse',
	myoyo: '<?yoyo'
}

function link($scope, $elem, $attr, C) {
	$scope.$watch('tween.mreverse', bool=> bool && !C.reversed() ? C.reverse() : null);

	C.T = C.mfrom || 0;
	C.T100 = (C.mfrom || 0) * 100;
	var tween = TweenMax.to(C, C.mduration || 0.5, {
		T: C.mto || 1,
		T100: (C.mto || 1) * 100,
		repeat: C.mrepeat || 0,
		onUpdate() {
			if(C.T === C.mto|| 1 && C.monEnd) 
				C.monEnd()
			else if(C.T === C.mfrom || 0 && C.monStart) 
				C.monStart()
			if(C.monUpdate) 
				C.monUpdate(C.T)
			$scope.$apply();
		}, 
		paused: C.startPaused || false,
		yoyo: C.myoyo || false
	});
	Object.setPrototypeOf(C, tween);
}

app.directive(directiveName, function() {
	return {
		bindToController,
		link,
		controller(){},
		controllerAs: 'tween'
	}
})

export default app;