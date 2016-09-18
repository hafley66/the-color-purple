import data from './about.data.js'
import templateFn from './about.pug'
const name = 'aboutPage';
const config = {
	template: templateFn(),
	controllerAs: 'about',
	replace: true,
	controller
}

function controller() {
	Object.assign(this, data)
}
export default [name, () => config]