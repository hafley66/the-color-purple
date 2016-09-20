var expand = {
	name: 'Expand Interactive',
	position: 'Frontend Engineer',
	where: 'Fairlawn, OH',
	start: 'Sept. 20, 2015',
	startShort: 'Sept 2015',
	end: 'May 20, 2016',
	endShort: 'May 2016',
	highlights: 
	[
	'Created several apps using Angular.js.',

	'Cleaned code-base by introducing techniques for creating new components.',

	'Normalized development environments with Vagrant and Virtualbox.',

	'Translated mockups to use angular and connect them to live data.'
	]
};
var rosetta={
	name: 'Rosetta',
	position: 'Software Engineer Intern',
	where: 'Cleveland, OH',
	start: 'May 20, 2014',
	startShort: 'May 2014',
	end: 'Aug. 8, 2014',
	endShort: 'Aug 2014',
	highlights: 
	[
	'Assisted migration of enterprise website on both front and back ends.',

	'Collaborated with other interns to build a pro-bono website for the Learning Coalition of Ohio.'
	]
}

var snapon={
	name: 'Snap-On Business Solutions',
	position: 'Software Developer Intern',
	where: 'Richfield, OH',
	start: 'May 20, 2013',
	startShort: 'May 2013',
	endShort: 'Aug 2013',
	end: 'Aug. 8, 2013',
	highlights: 
	[
	'Improved time efficiency of quality assurance application by factor of 60.',
	]
}

var cwru = {
	name: 'Case Western Reserve University',
	gpa: '3.3',
	graduated: 'May 2015',
	degree: 'B.S. Computer Science'
};

var seniorProject = {
	name: 'Canvas',
	tech: ['Android', 'Node', 'HTML/CSS'],
	description: 'Collaborative drawing app designed to allow players to draw on the same canvas in multiple ways.'
}

var paperAndroid = {
	name: 'PaperAndroid',
	tech: ['Android', 'Retained Graphics Model'],
	description: `Retained Mode (RM) graphics library for Android Canvas library. Inspired by PaperJS API.`
}

var machineLearners = {
	name: 'Machine Learning',
	tech: ['Python', 'MATLAB'],
	description: `(Coursework) Implemnted artificial neural network, decision tree, and naive bayes classifiers from scratch.`
}

var aiProjects = {
	name: 'Artificial Intelligence',
	tech: ['Java'],
	description: '(Coursework) Implemented A*, Min-Max, and Temporal Difference learner against opponents in an in-house game framework.'
}

var javscriptInterpreterProject = {
	name: 'JavaScript Interpreter',
	description: "(Coursework) Implemented a JavaScript interpreter using Scheme and Racket. Implemented variables, nested functions/closures, ended on objects/classes."
}

var projects = [seniorProject, paperAndroid, aiProjects, machineLearners, javscriptInterpreterProject];


var courses = [
'Machine Learning',
'Concurrent Programming',
'Operating Systems',
'Language Concepts',
'Artificial Intelligence',
'Discrete Math'
]

var maths = [
'Logic',
'Probability',
'Linear Algebra',
'Calculus',
'Graph Theory'
]

var sigmaCoordinator = {
	name: 'Sigma Phi Epsilon Fraternity',
	position: 'New Member Coordinator',
	description: ''
}
var peerTutor = {
	name: 'Case Western Tutoring Services',
	position: 'Peer Tutor',
	description: ''
}
var strengthTrainer = {
	name: 'Case Western Recreation Center',
	position: 'Student Strength Trainer',
	description: ''
}


		// Information Architecture
var resume = {
	jobs: {expand, rosetta, snapon},
	education: {cwru},
	projects,
	leadership: [ sigmaCoordinator, peerTutor, strengthTrainer ],
	courses,
	skills: [
	{
		name: 'Front End',
		skills: `JavaScript+ES2015
		Angular 1.3+
		Responsive Design
		DOM APIs
		SVG
		CSS/Sass
		HTML5 Canvas
		Maps API`.split('\n')
	},{
		name: 'Back End',
		skills: `BASH
		git
		npm+Node.js
		Express
		Mongo/NoSQL
		MySQL
		Django
		Redis
		Vagrant+VirtualBox`.split('\n')
	}
	,
	{
		name: 'Maths',
		skills: `Calculus
		Computer Graphics
		Linear Algebra
		Probability+Stats
		Formal Logic
		Graph Theory
		Functional Programming
		Mathematical Optimization
		Linear Programming
		Decision Trees
		Naive Bayes Classifiers
		Classical Geometry`.split('\n'),
	}
	// ,
	// {
	// 	name: 'Machine Learning',
	// 	skills: `
	// 	Python+NumPy
	// 	Neural Networks
	// 	`.split('\n')
	// }
	]
}

export default resume