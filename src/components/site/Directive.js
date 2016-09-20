import template from './build.html'
import './build.sass'
import resume from '../resume/data.js'
import about from '../pages/about.data.js'

const directiveName = 'mySite';
const config = {
	template,
	controllerAs: 'site',
	controller: ['$scope', '$timeout', controller],
	replace: true,
	link($scope, $elem, $attr, C) {
	}
}
const _links = ['about', 'resume']//, 'demos']
const _data = {
	about: {
		main: "WELCOME"
		// sub: "I'm Chris Hafley"
	},
	resume: {
		main: 'CHRIS HAFLEY',
		sub: 'SOFTWARE ENGINEER'
	},
	demos: {
		main: 'Coming Soon'
	}
}

function controller($scope, $timeout) {
	console.log($scope);
	console.log($scope.paths, 'where are my paths')
	$scope.resume = resume
	$scope.about = about
	console.log(about);
	this.links = _links
	this.active = this.getInitialActive()
	this.activate(this.active)
	this.fixQuirks = ()=>{
		$timeout(()=> {
			var bod = $('body')
			var w = bod.width()
			var h = bod.height()
			bod.width(w + 1)
			bod.height(h + 1)
			console.log('not fixing bod');
			fastdom.mutate(x=>{
				bod.width(w)
				bod.height(h)
				$scope.$apply()
				console.log('fixing bod');
			})
		}, 1000)
	}
}

const methods = {
	activate(link) {
		this.active = link
		this.page = {};
		link = 'resume'
		this.page.mainText = _data[link].main
		this.page.subText = _data[link].sub
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