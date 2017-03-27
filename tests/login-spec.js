/* 
    Author : Balraj
    Date : 27/03/2017
*/

// First testset description
describe('Middleware login', function(){

var EC = protractor.ExpectedConditions;

  // description of this test
  it('Should give error when non-user logs in', function(){

    // Browser gets the given url
    browser.get('https://polltery.github.io/middleware-frontend/index.html#/login');

    // Set the form variables
    element(by.model('loginUsername')).sendKeys('dummyUsername');
    element(by.model('loginPassword')).sendKeys('examplePassword');

    // Waiting for the button to be clickable solution from http://stackoverflow.com/questions/36871071/click-function-isnt-working-in-protractor-scripts
    // Get the login button in a variable
    var loginButton = element(by.id('login-submit'));
    
    // Wait for it to be clickable
    browser.wait(EC.elementToBeClickable(loginButton), 5000);
    
    // Click the login button that was saved before
    loginButton.click();

    // Login error should available now to be selected because we are using ng-if=loginError for this element to be displayed
    var loginError = element(by.css('.login-form > div:last-child > div:last-child'));

    // Do something is loginError is present
    loginError.isPresent().then(function(present){
      if(present){

        // Because we are using ng-if we evaluate the loginError value to be truthy
        expect(loginError.evalute('loginError')).toBeTruthy();

        // Expect given text
        expect(statusId.getText()).toContain("User not found");
      }
    });
  });

  //Description of this test
  it('Should log in a registered user', function(){

    // Browser gets the given url
    browser.get('https://polltery.github.io/middleware-frontend/index.html#/login');

    // Set the form variables (example, example) is already set
    element(by.model('loginUsername')).sendKeys('example');
    element(by.model('loginPassword')).sendKeys('example');

    // Waiting for the button to be clickable solution from http://stackoverflow.com/questions/36871071/click-function-isnt-working-in-protractor-scripts
    // Get the login button in a variable
    var loginButton = element(by.id('login-submit'));

    // Wait for it to be clickable
    browser.wait(EC.elementToBeClickable(loginButton), 5000);

    // Click the login button that was saved before
    loginButton.click();

    // Expect the browser to go to user profile
    expect(browser.getCurrentUrl()).toEqual('https://polltery.github.io/middleware-frontend/index.html#/profile/example'); 

  });
});