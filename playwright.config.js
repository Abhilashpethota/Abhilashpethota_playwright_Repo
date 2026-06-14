import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  retries:2,
  workers:5,
 timeout : 90 * 1000,
 expect : {
    timeout : 5000
 },
 reporter: 'html',
  /* Run tests in files in parallel */
  //fullyParallel: true,

  projects :[
//     {
//      name : 'safari',
// use: {
//          browserName : 'webkit',

//     headless:   true,
//     Screenshot : 'only-on-failure',
//     video : 'retain-on-failure',
//     trace : 'on',
//     ...devices['iPhone 15 Pro Max']
//   }
//   },
  {
         name : 'chrome',


  use: {
         browserName : 'chromium',

    headless:   true,
    Screenshot : 'only-on-failure',
    ignoreHttpsErrors:true,
    Permissions : ['geolocation'],
    video : 'retain-on-failure',
    trace : 'on',
    //...devices['Galaxy S24']
  }
  },
  ]
  
 
});

module.exports = config