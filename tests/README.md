[e2e Testing](https://docs.angularjs.org/guide/e2e-testing) for frontend using Protractor.
===

**Prequisites**
- Java Development Kit (JDK), check with ```java -version```
- node.js, check with ```node --veriosn```

Installing protractor (Complete guide [here](http://www.protractortest.org/#/tutorial))
---

Use npm to install Protractor globally with:
```
npm install -g protractor
```

This will install two command line tools, ```protractor``` and ```webdriver-manager```. Try running ```protractor --version``` to make sure it's working.

The ```webdriver-manager``` is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:
```
webdriver-manager update
```

Now start up a server with:
```
webdriver-manager start
```

This will start up a Selenium Server and will output a bunch of info logs. Your Protractor test will send requests to this server to control a local browser. Leave this server running throughout the tutorial. You can see information about the status of the server at ```http://localhost:4444/wd/hub.```

To test for console errors in chrome, please install the [protractor-console-plugin](https://www.npmjs.com/package/protractor-console-plugin) plug-in using the following command (or else you can remove the plugin from ```conf.js```)
```
npm i protractor-console-plugin
```

Project Structure
---

- ```conf.js``` is the file containing the configuration for protractor
- The tests are defined in the spec files. The ```login-spec.js``` contains the spec(s) for login.
- You can add specs in ```tests``` folder for each page.

How to run a test?
---

**NOTE: Please make sure ```example``` user is already in the MongoDB database with password ```password``` and the mule server is running along with mongoDB.**

Make sure you have the server running. You can start the server using this command.
```
webdriver-manager start
```

Given that you are in the ```tests``` folder, run the test using the following command
```
protractor conf.js
```