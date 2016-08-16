import angular from 'angular';
import 'normalize.css'
import templateFn from './components/muh-app.pug';
import muhLoginTemplate from './components/login/.js';

var template = templateFn();

var app = angular.module('muh-demo', []);
app.directive('muhApp', ()=> ({template}));
app.directive('muhLogin', ()=>({template: muhLoginTemplate}));
export default app;