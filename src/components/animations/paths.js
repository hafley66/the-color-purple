import angular from 'angular'

const PATH_REGEX_X_COORD = /([MLH]\s*)(-?\d+(?:\.\d+)?%)/gi,
PATH_REGEX_Y_COORD_2ND_PLACE = /(,?[MLH]\s*(?:-?\d+(?:\.\d+)?)[a-z% ]+(?: *|,))(-?\d+(?:\.\d+)?%)/gi,
PATH_REGEX_Y_COORD_1ST_PLACE = /([V]\s*)(\d+%)/gi;
var log = console.log.bind(console);

const THROTTLE_RATE = 60,
DEBOUNCE_RATE = 25,
USE_DEBOUNCE_ON_RESIZE = true;

var app = angular.module('svg-helpers', []);
app.directive('relativeD', ['$timeout', function($timeout) {
  return {
    scope: {
      'pathString': '@relativeD'
    },
    link($scope, $elem, $attr) {
      $elem.ready(x=>window.resize())
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
          if((percent + '').indexOf('e') > -1){
            console.warn('boss we gotta renegade path unit...', pathString, percent)
            percent = percent.truncate(2);
          }

          return pre + ' ' + percent.truncate(2);
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
          fastdom.mutate(() => {
            try{
              var pathS = reduce(pathString);
              if(pathS.indexOf('NaN') !== -1)
                console.error(new Error('ya done goofed'), pathString, pathS, $elem)
              element.setAttribute('d', reduce(pathString))
            } catch(err) {
              console.warn(err);
            }
          })
      }
      var broadcastChange = (pathString) => $scope.$broadcast('path-change', [pathString, $elem])
      var updatePath = () => getPath().then(setPath).then(broadcastChange);

      $scope.$on('view-box-change', (e, data) => {
        [x, y, W, H] = data
        if (W && H){
          updatePath()
        }
      })

      var latch = 0;
      $scope.$watch('pathString', pathString => latch? setPath(pathString) : latch++)
    }
  }
}])

app.directive('viewBoxFit', ['$timeout', function($timeout) {
  return {
    scope: true,
    link($scope, $elem, $attr) {
      var W, H, element = $elem[0];
      var getViewBox = e => fastdom.measure(x => {
        var parent = $elem.parent();
        W = parent.width();
        H = parent.height(); 
      })
      var setViewBox = e => fastdom.mutate(x => {
        element.setAttribute('view-box', `0 0 ${W} ${H}`)
      })
      var broadcastViewBox = e => {
        $scope.$broadcast('view-box-change', [0, 0, W, H])
      }
      var doThings = e => getViewBox().then(setViewBox).then(broadcastViewBox)
      onResizeRaw(doThings)
    }
  }
}])

app.directive('relativeDash', function() {
  return {
    bindToController: {
      relSize: '@relativeDashSize',
      relPosition: '@relativeDashPosition'
    },
    controller() {
      this.pathLength = 0;
    },
    controllerAs:'pathSizer',
    link($scope, $elem, $attr, ctrl) {
      var path = $elem[0]
      $scope.$on('view-box-change', update)
      $scope.$on('path-change', update)
      $scope.$watch('pathSizer.relPosition', update)
      $scope.$watch('pathSizer.relSize', update)

      var length = () => path.getTotalLength();

      var normalizeInput = text => {
        if(text.indexOf('%') > -1)
          return Number(text.trimLast()) / 100;
        else
          return Number(text);
      }

      function update() {
        return fastdom.mutate(()=>{
          var newLength = length();
          ctrl.size = normalizeInput(ctrl.relSize) * newLength
          ctrl.position = normalizeInput(ctrl.relPosition) * newLength
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

export default app;