import data from '../resume/data.js'
import templateFn from './resume.pug'
const name = 'resumePage';
const config = {
	template: templateFn(),
	controllerAs: 'resume',
	controller,
	link,
	replace: true
}
const methods = {
	
}
function link($scope, $elem, $attr, C) {
	console.log($scope.page);
	$scope.page = $scope.page || {};
	$scope.page.heroText = 'Chris Hafley'
	$scope.page.subText = 'Software Engineer'
}

function controller() {
	Object.assign(this, data)
}
Object.assign(controller, methods)
export default [name, () => config]