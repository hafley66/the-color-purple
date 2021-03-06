const PATH_REGEX_X_COORD = /([MLH]\s*)(-?\d+(?:\.\d+)?%)/gi,
PATH_REGEX_Y_COORD_2ND_PLACE = /(,?[MLH]\s*(?:-?\d+(?:\.\d+)?)[a-z% ]+(?: *|,))(-?\d+(?:\.\d+)?%)/gi,
PATH_REGEX_Y_COORD_1ST_PLACE = /([V]\s*)(\d+%)/gi;
var log = console.log.bind(console);

const THROTTLE_RATE = 60,
DEBOUNCE_RATE = 25,
USE_DEBOUNCE_ON_RESIZE = true;

var app = angular.module('svg-helpers', []);
app.directive('relativeD', function() {
  return {
    scope: {
      'pathString': '=relativeD'
    },
    link($scope, $elem, $attr) {
      var element = $elem[0];
      var [x, y, W, H] = [0,0,0,0]
      var relX = str => (Number(str) / 100) * W;
      var relY = str => (Number(str) / 100) * H;
      //TODO: support and fit for arc/curve commands.

      var replaceFunctions = [
      [PATH_REGEX_X_COORD, relX],
      [PATH_REGEX_Y_COORD_2ND_PLACE, relY],
      [PATH_REGEX_Y_COORD_1ST_PLACE, relY]
      ]
      var replace = function(pathString, [findsPercent, getPercent]) {
        var x = pathString.replace(findsPercent, function(match, pre, capture) {
          var percent = getPercent(capture.slice(0, -1))
          return pre + ' ' + percent;
        })
        return x
      }
      var reduce = (pathString) => {
        var xxx = replaceFunctions.reduce(replace, pathString);
        return pathString && W && H && replaceFunctions.reduce(replace, pathString)
      }
      var getPath = () => Promise.resolve($scope.pathString)
      var setPath = (pathString) => {
        if (pathString && W && H)
          return fastdom.mutate(() => element.setAttribute('d', reduce(pathString)))
      }
      var broadcastChange = (pathString) => $scope.$broadcast('path-change', [pathString, $elem])
      var updatePath = () => getPath().then(setPath).then(broadcastChange);

      $scope.$on('view-box-change', (e, data) => {
        [x, y, W, H] = data
        if (W && H)
          updatePath()
      })

      var latch = 0;
      $scope.$watch('pathString', pathString => latch? setPath(pathString) : latch++)
    }
  }
})

app.directive('viewBoxFit', ['$timeout', function($timeout) {
  return {
    link($scope, $elem, $attr) {
      var W, H, element = $elem[0];
      var getViewBox = e => fastdom.measure(x => {
        var parent = $elem.parent();
        W = parent.width();
        H = parent.height(); 
      })
      var setViewBox = e => fastdom.mutate(x => {
        console.log('setting viewbox', W, H);
        element.setAttribute('view-box', `0 0 ${W} ${H}`)
      })
      var broadcastViewBox = e => $scope.$broadcast('view-box-change', [0, 0, W, H])
      var doThings = e => getViewBox().then(setViewBox).then(broadcastViewBox)
      onResizeRaw(doThings)
      $timeout(doThings, 100);
    }
  }
}])

app.directive('relativeDash', function() {
  return {
    bindToController: {
      relSize: '=relativeDashSize',
      relPosition: '=relativeDashPosition'
    },
    controller() {
      this.pathLength = 0;
      console.log('hello relative dash');
    },
    controllerAs:'pathSizer',
    link($scope, $elem, $attr, ctrl) {
      var path = $elem[0]
      $scope.$on('view-box-change', update)
      $scope.$on('path-change', update)
      $scope.$watch('pathSizer.relPosition', update)

      var length = () => path.getTotalLength();

      function update() {
        return fastdom.mutate(()=>{
          var newLength = length();
          ctrl.size = ctrl.relSize * newLength 
          ctrl.position = ctrl.relPosition * newLength    
          path.style.strokeDasharray = `${ctrl.size} ${newLength}`
          path.style.strokeDashoffset = ctrl.position
        })
      }
    }
  }
})
function onResizeRaw(fn){
  $(window).on('resize', fn)
}
function onResize(fn, rate) {
  if (USE_DEBOUNCE_ON_RESIZE)
    onResizeDebounce(fn, rate || THROTTLE_RATE)
  else
    onResizeThrottle(fn, rate || DEBOUNCE_RATE)
}

function onResizeThrottle(fn, rate = 50) {
  $(window).on('resize', _.throttle(fn, rate));
}

function onResizeDebounce(fn, debounceThreshold = 100) {
  $(window).on('resize', _.debounce(fn, debounceThreshold));
}

Number.prototype.truncate = function(decimalPlaces=2) {
  var strN = this + ''
  var [lhs, rhs] = strN.split('.')
  var ret;
  if (rhs)
    ret = [lhs, rhs.slice(0, intDecimalPlaces)].join('.')
  else
    ret = lhs
  return Number(ret);
}

String.prototype.trimLast = function() {
  return this.slice(0, this.length - 1);
}

export default app;