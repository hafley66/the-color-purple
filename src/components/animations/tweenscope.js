const app = angular.module('my-tweens', [])
const controllerAs = 'tween'
const directiveName = 'myTween'
const bindToController = {
	monUpdate: '&onUpdate',
	monStart: '&onStart',
	monEnd: '&onEnd',
	mduration: '<?duration',
	mplay: '<?play',
	mrepeat: '<?repeat',
	startPaused: '<?',
	mfrom: '<?from',
	mto: '<?to',
	mreverse: '<?reverse',
	myoyo: '<?yoyo',
	masVar: '@?asVar'
}
var started = 0;
function link($scope, $elem, $attr, C) {
	$scope[C.masVar || 'tween'] = C;
	C.T = C.mfrom || 0;
	C.T100 = (C.mfrom || 0) * 100;
	var _config = {
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
		
		yoyo: C.myoyo || false,
		ease: Sine.easeInOut
	}
	if(C.startPaused !== false)
		_config.paused = true;
	var tween = TweenMax.to(C, C.mduration || 0.5, _config)
	C.play = tween.play.bind(tween)
	C.reverse = tween.reverse.bind(tween)
	$scope.$watch('tween.mplay', plays => plays? C.play() : null);
	$scope.$watch('tween.mreverse', reverses => reverses? C.reverse() : null);
}

app.directive(directiveName, function() {
	return { 
		bindToController,
		link,
		controllerAs,
		controller(){},
		scope: true
	}
})

export default app;