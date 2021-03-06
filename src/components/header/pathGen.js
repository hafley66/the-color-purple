import _ from 'lodash'

export default function genWaves(elements) {
	var size = 100/elements.length
	var length = elements.length;

	function genRelativePathString(atTime=0) {
		var pts = genPoints(atTime);
		var pts0 = genPoints(0);
		var range = _.range(elements.length);
		var points = range.map(index=> pts)
		var pointsX = points.map((segment, index)=>segment.map( ([x,y]) =>[ index*size + x/length, y ] ));
		var pointsXY = pointsX.map((segment, index)=> segment.map( ([x,y]) => {
			if( index%2 !== 0 ) 
				y = 100 - y
			return [x,y]
		}));

		var pointSequence = _.flatten(pointsXY);
		
		var makeString = (pathString, [x,y])=> {
			pathString.push(`${x}% ${y}% L`)
			return pathString;
		}
		return pointSequence.reduce(makeString, ['M']).join(' ').trimLast();
	}

	function genPoints(atTime=0) {
		var quarter = 25 * atTime;
		var X0 = 25 - quarter;
		var X1 = 75 + quarter;
		var Y = X0;
		return [ [0, 50], [X0, Y], [50, 0], [X1, Y], [100, 50] ];
	}
	return genRelativePathString
}

