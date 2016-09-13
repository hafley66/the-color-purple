import templateFn from './.pug'
const directiveName = 'newHeader';
const config = {
	bindToController: {},
	controllerAs: 'header',
	controller,
	template: templateFn()
}
const _links = ['home', 'resume', 'demos']

function controller(links=_links) {
	this.links = links
	this.active = links[0]
}

const methods = {
	activate(link) {
		this.active = link
	},
	index(link=this.active) {
		return this.links.indexOf(link)
	}
}

Object.assign(controller.prototype, methods)

export default [directiveName, function() {return config}] 