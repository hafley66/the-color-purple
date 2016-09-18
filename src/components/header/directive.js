import templateFn from './.pug'
const directiveName = 'newHeader';
const config = {
	bindToController: {},
	controllerAs: 'header',
	controller: ['$scope', controller],
	template: templateFn(),
	replace: true
}
const _links = ['about', 'resume', 'demos']
const _data = {
	about: {
		main: "Welcome!",
		sub: "I'm Chris Hafley"
	},
	resume: {
		main: 'CHRIS HAFLEY',
		sub: 'SOFTWARE ENGINEER'
	},
	demos: {
		main: 'Coming Soon'
	}
}
function controller($scope) {
	console.log($scope);
	this.$scope = $scope
	$scope.page = $scope.page || {};
	this.links = _links
	this.active = this.getInitialActive()
	this.activate(this.active)
}

const methods = {
	activate(link) {
		this.active = link
		this.$scope.page.mainText = _data[link].main
		this.$scope.page.subText = _data[link].sub
	},
	index(link=this.active) {
		return this.links.indexOf(link)
	},
	isAt(link) {
		return link === this.active
	},
	getInitialActive() {
		var first = window.location.pathname.split('/')[1];
		console.log('path is...', first);
		return 'about';
	}
}

Object.assign(controller.prototype, methods)

export default [directiveName, function() {return config}] 