import _ from 'lodash';
import templateFn from './.pug'
import genWaves from './pathGen.js'

const DURATION = 0.3,
  EASING_FUNCTION = SlowMo.ease.config(0.1, 0.1, false);

function genTween(fn) {
	var counter = {
		count: 0
	};
	var lastFrame, iter = 1;
	return TweenMax.to(counter, DURATION, {
		count: 1,
		repeat: 0,
		onUpdate: function() {
			fn(counter.count)
		},
		paused: true
		//ease: EASING_FUNCTION
	});
}

export default ['myHeader', ['$timeout', function($timeout) {
	return {
		scope: true,
		controllerAs: 'ctrl',
		controller: ['$scope', function controller($scope) {
			console.log('hello header');

			this.links = ['home', 'resume', 'demos', 'blog']
			this.gen = genWaves(this.links);
			this.path = this.gen(0);

			this.dashAlign = 0.50
			this.dashSize = 1/this.links.length;
			this.dashDistanceFromPoint = this.dashAlign * this.dashSize
			this.dashPosition = this.dashDistanceFromPoint;
			this.tween = 0;
		}],
		link($scope, $elem, $attr, ctrl) {
			var target = $elem.find('.header-component');
			var moveToPercent = percent => ctrl.dashPosition = -(percent - ctrl.dashDistanceFromPoint)
			var moveFromEvent = (event) => {
				var percent = event.offsetX / $elem.width();
				moveToPercent(percent);
			}

			var dashSize = 1/ctrl.links.length;

			var changePath = percent => {
				ctrl.path = ctrl.gen(percent)
				ctrl.tween = percent;
				$scope.$broadcast('path-change', percent);

			}
			ctrl.index = (link=ctrl.active) => _.indexOf(ctrl.links, link)
 			ctrl.moveDash = moveFromEvent
			ctrl.animation = genTween( percent => $scope.$apply(()=>changePath(percent)));
			ctrl.toSquare = event => ctrl.animation.play();
			ctrl.toDiamond = event => ctrl.animation.reverse(); 
			
			ctrl.active = 'home';
			ctrl.activateLink = function(link) {
				this.active = link;
			}
			ctrl.isActive = function(link) {
				return this.active === link;
			}
			ctrl.anchorOn=function(link) {
				var index = ctrl.index(link) + 1;
				var width = 1/this.links.length;
				var half = width / 2;
				if(index > 0){
					var percent = index * width - half
					moveToPercent(percent);
				}
			}
			$timeout(()=>ctrl.anchorOn(ctrl.active) + ctrl.toSquare())
		},
		template: templateFn()
	}
}]]