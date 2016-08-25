var expand={
	name: 'Expand Interactive',
	position: 'Frontend Engineer',
	where: 'Fairlawn, OH',
	start: 'Sept. 20, 2015',
	end: 'May 20, 2016',
	highlights: 
	[
	'Used Angular.js to create complex & dynamic front-end interfaces.',

	'Introduced consistent methods for creating encapsulated components in code-base.',

	'Refactored common parts between apps into one to promote reusability.',

	'Assisted in normalizing development environments with Vagrant and Virtualbox.',

	'Translated mockups to use angular and connect them to live data.',

	'Created custom servers to manage and preprocess front-end data using node.js.',

	'Developed wrapper library for 3rd party Mapping APIs (Google Maps, Leaflet.js)'
	]
};
var rosetta={
	name: 'Rosetta',
	position: 'Software Engineer Intern',
	where: 'Cleveland, OH',
	start: 'May 20, 2014',
	end: 'Aug. 8, 2014',
	highlights: 
	[
	'Experienced enterprise website development at a management level.',

	'Developed and updated code for a dynamic and responsive website in the back-end.',

	'Collaborated with other interns to build a pro-bono website for the Learning Coalition of Ohio.'
	]
}

var snapon={
	name: 'Snap-On Business Solutions',
	position: 'Software Developer Intern',
	where: 'Richfield, OH',
	start: 'May 20, 2013',
	end: 'Aug. 8, 2013',
	highlights: 
	[
	'Improved time efficiency of quality assurance application by factor of 60.',

	'Build custom data-structure to efficiently process relations in database.',

	'Collaborated with fellow intern to implement various UI and functional changes in Swing.',

	'Added version aware code and test cases for internal API.'
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
	highlights: []
}

var paperAndroid = {
	name: 'PaperAndroid',
	tech: ['Android', 'Retained Graphics Model'],
	highlights: []
}

var machineLearners = {
	name: 'Machine Learning Algorithms (Coursework)',
	tech: ['Python', 'MATLAB'],
	highlights: ['Implemnted artificial neural network, decision tree, and naive bayes classifiers from scratch.', 'Tested each learner on various types and sizes of data sets.']
}

var aiProjects = {
	name: 'Artificial Intelligence Algorithms (Coursework)',
	tech: ['Java'],
	highlights: ['Implemented A*, Min-Max, and Temporal Difference learner against opponents in an in-house game framework.']
}

var projects = [seniorProject, paperAndroid, machineLearners, aiProjects];


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
	highlights: []
}
var peerTutor = {
	name: 'Case Western Tutoring Services',
	position: 'Peer Tutor',
	highlights: []
}
var strengthTrainer = {
	name: 'Case Western Recreation Center',
	position: 'Student Strength Trainer',
	highlights: []
}


var resume = {
	experience: {expand, rosetta, snapon},
	education: {cwru},
	projects,
	leadership: [ sigmaCoordinator, peerTutor, strengthTrainer ],
	courses,
	skills: []
}

export default resume