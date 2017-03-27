/* 
    Author : Balraj
    Date : 27/03/2017
*/

// First testset description
describe('Middleware login page: ', function(){


  // description of this test
  it('Should give error when non-user logs in', function(){

    // Browser gets the given url
    browser.get('https://polltery.github.io/middleware-frontend/index.html#/login');

    // Check function below for details
    waitForButtonClickableThenClick('login-submit');

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

    // Check function below for details
    waitForButtonClickableThenClick('login-submit');

    // Expect the browser to go to user profile
    expect(browser.getCurrentUrl()).toEqual('https://polltery.github.io/middleware-frontend/index.html#/profile/example'); 

  });


  //Description of this test
  it('Should not signup if username or password are invalid', function(){

    // Browser gets the given url
    browser.get('https://polltery.github.io/middleware-frontend/index.html#/login');

    // Test case 1: no username, no password. Should stay on same page when signed up.    
    // Set the form variables
    element(by.model('signupUsername')).sendKeys('');
    element(by.model('signupPassword')).sendKeys('');

    // Click sign up button
    waitForButtonClickableThenClick('signup-submit');

    // Check page url
    expect(browser.getCurrentUrl()).toEqual('https://polltery.github.io/middleware-frontend/index.html#/login'); 

    // Check class of form elements
    expect(hasClass(element(by.id('signup-username')), 'ng-invalid-required')).toBeTruthy();
    expect(hasClass(element(by.id('signup-password')), 'ng-invalid-required')).toBeTruthy();

    // Test case 2, invalid patterns
    // Set the form variables
    element(by.model('signupUsername')).sendKeys('AS*C*(EUifhesbj');
    element(by.model('signupPassword')).sendKeys('asdasd');

    // Click sign up button
    waitForButtonClickableThenClick('signup-submit');

    // Check page url
    expect(browser.getCurrentUrl()).toEqual('https://polltery.github.io/middleware-frontend/index.html#/login'); 

    // Check class of form elements
    expect(hasClass(element(by.id('signup-username')), 'ng-invalid-pattern')).toBeTruthy();

  });


  //Description of this test
  it('Should not login if username or password are invalid', function(){

    // Browser gets the given url
    browser.get('https://polltery.github.io/middleware-frontend/index.html#/login');

    // Test case 1: no username, no password. Should stay on same page when signed up.    
    // Set the form variables
    element(by.model('loginUsername')).sendKeys('');
    element(by.model('loginPassword')).sendKeys('');

    // Click sign up button
    waitForButtonClickableThenClick('login-submit');

    // Check page url
    expect(browser.getCurrentUrl()).toEqual('https://polltery.github.io/middleware-frontend/index.html#/login'); 

    // Check class of form elements
    expect(hasClass(element(by.id('login-username')), 'ng-invalid-required')).toBeTruthy();
    expect(hasClass(element(by.id('login-password')), 'ng-invalid-required')).toBeTruthy();

    // Test case 2, invalid patterns
    // Set the form variables
    element(by.model('loginUsername')).sendKeys('AS*C*(EUifhesbj');
    element(by.model('loginPassword')).sendKeys('asdasd');

    // Click sign up button
    waitForButtonClickableThenClick('login-submit');

    // Check page url
    expect(browser.getCurrentUrl()).toEqual('https://polltery.github.io/middleware-frontend/index.html#/login'); 

    // Check class of form elements
    expect(hasClass(element(by.id('login-username')), 'ng-invalid-pattern')).toBeTruthy();

  });

  //Description of this test
  it('Should not signup if username already exists', function(){
    
    // Browser gets the given url
    browser.get('https://polltery.github.io/middleware-frontend/index.html#/login');

    // Set the form variables
    element(by.model('signupUsername')).sendKeys('example');
    element(by.model('signupPassword')).sendKeys('example');

    // Signup error should available now to be selected because we are using ng-if=signupError for this element to be displayed
    var signupError = element(by.css('.signup-form > div:last-child > div:last-child'));

    // Do something is signupError is present
    signupError.isPresent().then(function(present){
      if(present){

        // Because we are using ng-if we evaluate the signupError value to be truthy
        expect(loginError.evalute('signupError')).toBeTruthy();

        // Expect given text
        expect(statusId.getText()).toContain("User already exists");
      }
    });


  });


  // Helper function: waits for a button to be clickable and then clicks it.
  function waitForButtonClickableThenClick(buttonId){
    var EC = protractor.ExpectedConditions;

    // Waiting for the button to be clickable solution from http://stackoverflow.com/questions/36871071/click-function-isnt-working-in-protractor-scripts
    // Get the login button in a variable
    var button = element(by.id(buttonId));

    // Wait for it to be clickable
    browser.wait(EC.elementToBeClickable(button), 5000);

    // Click the login button that was saved before
    button.click();
  }


  // Helper function: Checks if an element has a given class
  var hasClass = function (element, cls) {
    return element.getAttribute('class').then(function (classes) {
        return classes.split(' ').indexOf(cls) !== -1;
    });
};

});