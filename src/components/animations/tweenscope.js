const app = angular.module('my-tweens', [])
const controllerAs = 'tween'
const directiveName = 'myTween'
const bindToController = {
	monUpdate: '&onUpdate',
	monStart: '&onStart',
	monEnd: '&onEnd',
	mduration: '<?duration',
	mrevDuration: '=?reverseDuration',
	mplay: '<play',
	mrepeat: '<?repeat',
	startPaused: '<?',
	mfrom: '<?from',
	mto: '<?to',
	mreverse: '<reverse',
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
		onStart() {
		},
		onReverse() {
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

	function getReverseTimeScale(revDur) {
		if(revDur !== undefined)
			return C.mduration / revDur
		else 
			return 1
	}

	if(C.startPaused !== false)
		_config.paused = true;
	var tween = TweenMax.to(C, C.mduration || 0.5, _config)
	C.play = tween.play.bind(tween)
	C.reverse = tween.reverse.bind(tween)
	C.reversed = tween.reversed.bind(tween);
	C.toggle = () => {
		if(tween.paused() || tween.reversed()){
			tween.timeScale(1)
			tween.play()
		}else{
			tween.timeScale(C.dilution)
			tween.reverse()
		}
	}
	$scope.$watch('tween.mplay', plays => plays? C.play() : null)
	$scope.$watch('tween.mreverse', reverses => reverses? C.reverse() : null);
	$scope.$watch('tween.mrevDuration', revDur => C.dilution = getReverseTimeScale(revDur))
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