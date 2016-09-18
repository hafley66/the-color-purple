import data from '../resume/data.js'
import templateFn from './resume.pug'
const name = 'resumePage';
const config = {
	template: templateFn(),
	controllerAs: 'resume',
	controller,
	replace: true
}

function controller() {
	Object.assign(this, data)
}
export default [name, () => config]