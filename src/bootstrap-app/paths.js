import fastdom from 'fastdom'

const PATH_REGEX_X_COORD = /([MLH] ?)(\d+(?:\.\d+)?%)/gi,
PATH_REGEX_Y_COORD_2ND_PLACE = /(,?[MLH] *(?:\d+(?:\.\d+)?)[a-z% ]+(?: *|,))(\d+(?:\.\d+)?%)/gi,
PATH_REGEX_Y_COORD_1ST_PLACE = /([V] ?)(\d+%)/gi;

const THROTTLE_RATE = 60,
DEBOUNCE_RATE = 60,
USE_DEBOUNCE_ON_RESIZE = false;

const 
ALTERNATE = true,
DURATION = 1,
REPEAT = -1, 
EASING_FUNCTION = SlowMo.ease.config(0.1, 0.1, false);

const PATH_TEMPLATE_0 = ctx => `M 0 50%, L 100% ${ctx.count}%`,
PATH_TEMPLATE_1 = ctx => {
  var {
    count
  } = ctx;
  var percent = count / 100
  var half = percent * 0.5
  return `M ${50*half}% 50%, L ${40-15*percent}% ${40-15*percent}% 
  L 50% ${50*half}%, L ${60+15*percent}% ${40 - 15*percent}% 
  L ${100 - 50*half}% 50%, L ${60+15*percent}% ${60+15*percent}%
  L 50% ${100 - 50*half}%, L ${40-15*percent}% ${60+15*percent}%
  Z`
}, 

PATH_TEMPLATE = PATH_TEMPLATE_1

var log = console.log.bind(console);
fastdom.extend(fastdomPromised);

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
      //example pathString <- 'M <x1-1> <y2-1>, L <x1-2> <y2-2>, V <y1-3>, H <x1-4>.
      //y2 refers to y coord being in second coord spot. y1 is for commands with [Vv] in front (vertical line).
      //You should learn svg path syntax for this.
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
      var getViewBox = () => {
        var vbstr = $elem.parent()[0].getAttribute('viewBox');
        if(vbstr)
          return vbstr.split(' ')
        else
          return ['0', '0', '100', '100']
      }
      var setViewBox = (viewBox) => [x, y, W, H] = viewBox.map(Number)
      var getPath = () => Promise.resolve($scope.pathString)
      var setPath = (pathString) => {
        if (pathString && W && H)
          return fastdom.mutate(() => element.setAttribute('d', reduce(pathString)))
      }
      var updatePath = () => getPath().then(setPath)
      var updateViewBox = () => setViewBox(getViewBox())
      var update = () => updateViewBox() + updatePath()

      $scope.$on('view-box-change', (e, data) => {
        [x, y, W, H] = data
        if (W && H)
          updatePath()
      })

      var latch = 0;
      $scope.$watch('pathString', pathString => latch? setPath(pathString) : latch++)
      update();
    }
  }
})

app.directive('viewBoxFit', function() {
  return {
    link($scope, $elem, $attr) {
      var W, H, element = $elem[0];
      $elem = $($elem);
      var getViewBox = e => fastdom.measure(x => {
        var parent = $elem.parent();
        W = parent.width();
        H = parent.height(); 
      })
      var setViewBox = e => fastdom.mutate(x => element.setAttribute('view-box', `0 0 ${W} ${H}`))
      var broadcastViewBox = e => $scope.$broadcast('view-box-change', [0, 0, W, H])
      var doThings = e => getViewBox().then(setViewBox).then(broadcastViewBox)
      onResize(doThings)
      doThings()
    }
  }
})

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

app.directive('animatedPath', function() {
  return {
    link($scope, $elem) {
      var pathTemplate = PATH_TEMPLATE
      $scope.path = '';
      renderPath($scope, $elem, pathTemplate);
    }
  }
})

function renderPath($scope, $path, template) {
  log('rendering')
  var counter = {
    count: 0
  };
  var lastFrame, iter = 1;
  TweenMax.to(counter, DURATION, {
    count: 100,
    repeat: REPEAT,
    yoyo: ALTERNATE,
    onUpdate: function() {
      if (lastFrame) fastdom.clear(lastFrame)
        lastFrame = fastdom.mutate(() => {
          var str = template({
            count: truncator(counter.count, 3)
          })
          $scope.path = str
          $scope.$apply()
        })
    },
    ease: EASING_FUNCTION
  });
}

function truncator(numToTruncate, intDecimalPlaces) {
  var strN = numToTruncate + ''
  var [lhs, rhs] = strN.split('.')
  var ret;
  if (rhs)
    ret = [lhs, rhs.slice(0, intDecimalPlaces)].join('.')
  else
    ret = lhs
  return Number(ret);
}

export default app;