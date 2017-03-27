/* 
    Author : Balraj
    Date : 27/03/2017
*/

exports.config = {

  // Address for the selenium server
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Our specs go here
  specs: ['login-spec.js'],

  // Here we can describe which browser we want to test in. 
  // You can add multi capabilities for running the tests in multiple browsers
  // check http://www.protractortest.org/#/tutorial#step-3-changing-the-configuration for more
  capabilities: {
    browserName: 'chrome'
  }, 

  // For chrome only, Remove this if you don't want to test for console error
  plugins: [{
    path: '../node_modules/protractor-console-plugin/index.js'
  }]
};