/*
*
* Crate and export configuration variables
*
*/

// Container for all the environments
const environments = {};

// Staging {default} environments
environments.staging = {
  httpPort: 3000,
  envName: 'stagging',
  'hashingSecret': 'thisIsASecret',

};


// Testing environments
environments.testing = {
  httpPort: 4000,
 
  envName: 'testing',
  'hashingSecret': 'thisIsASecret',
  

};

// Production environments
environments.production = {
  httpPort: 5000,

  envName: 'production',
  'hashingSecret': 'thisIsASecret',


};

// Determine which environment was passed as a command-line argument
const currentEnv = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase(): '';

// check that current env is valid if not default to Staging
const environmentToExport = typeof(environments[currentEnv]) == 'object' ? environments[currentEnv]:environments["staging"]

// Export the module
module.exports = environmentToExport
