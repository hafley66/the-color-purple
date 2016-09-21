import BackboneEvents from 'backbone-events-standalone'

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

function Navler() {
	console.log($scope.paths, 'where are my paths 2.0')
	this.links = _links
	this.active = this.getInitialActive()
	this.activate(this.active)

}

const Methods = {
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
	},
	domInit() {
		this.NavLinks = $('.NavLink').map((i, elem) => {
			return {

			}
		})
	}
}

const NavLink = {
	init(Navler, $DOM) {
		this.Navler = Navler
		this.$ = $DOM
		this.$path = $DOM.find('.NavSvgPath')
	},
	activate() {
		this.dom.classList.add('active')
	},

}

Object.assign(Navler.prototype, Methods)

export default Navler