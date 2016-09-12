const app = angular.module('my-tweens', [])
const controllerAs = 'tween'
const directiveName = 'myTween'
const bindToController = {
	monUpdate: '&onUpdate',
	monStart: '&onStart',
	monEnd: '&onEnd',
	mduration: '<?duration',
	mrepeat: '<?repeat',
	startPaused: '<?',
	mfrom: '<?from',
	mto: '<?to',
	mreverse: '<?reverse',
	myoyo: '<?yoyo'
}
var started = 0;
function link($scope, $elem, $attr, C) {
	C.T = C.mfrom || 0;
	C.T100 = (C.mfrom || 0) * 100;
	var tween = TweenMax.to(C, C.mduration || 0.5, {
		T: C.mto || 1,
		T100: (C.mto || 1) * 100,
		repeat: C.mrepeat || 0,
		onComplete(){

		},
		onReverseComplete() {
		},
		onUpdate() {
			if(C.T === C.mto|| 1 && C.monEnd) {
				C.monEnd()
			}
			else if(C.T === C.mfrom || 0 && C.monStart) {
				C.monStart()
			}
			if(C.monUpdate) 
				C.monUpdate(C.T)
			$scope.$apply();
		}, 
		paused: C.startPaused || true,
		yoyo: C.myoyo || false,
		ease: Sine.easeInOut
	})
	C.play = tween.play.bind(tween)
	C.reverse = tween.reverse.bind(tween)
}

app.directive(directiveName, function() {
	return { 
		bindToController,
		link,
		controllerAs,
		controller(){}
	}
})

export default app;