import templateFn from './header.pug'
import data from './data.js'

var template = templateFn();

export default ['myResume', function() {
	return {
		controllerAs: 'ctrl',
		controller() {
			Object.assign(this, data);
		},
		template
	}
}]