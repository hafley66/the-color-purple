import templateFn from './.pug'
const directiveName = 'newHeader';
const config = {
	bindToController: {},
	controllerAs: 'header',
	controller,
	link($scope){
		$scope.page = {}
	},
	template: templateFn()
}
const _links = ['home', 'resume', 'demos']

function controller(links=_links) {
	this.links = links
	this.active = this.getInitialActive()
}

const methods = {
	activate(link) {
		this.active = link
	},
	index(link=this.active) {
		return this.links.indexOf(link)
	},
	getInitialActive() {
		var first = window.location.pathname.split('/')[1];
		console.log('path is...', first);
		return 'resume';
	}
}

Object.assign(controller.prototype, methods)

export default [directiveName, function() {return config}] 