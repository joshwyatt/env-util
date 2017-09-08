#! /usr/bin/env node
const argv = require('minimist')(process.argv.slice(2));
const EnvUtil = require('./EnvUtil');

checkArgs();
const envUtil = new EnvUtil(argv.bucket, argv.key, argv.directory, argv.file);

envUtil.getEnvVariables()
  .then(envUtil.writeToFile)
  .catch(handleError);

function checkArgs() {
  if (!argv.bucket && !argv.key) {
    throw new Error('No bucket or key passed');
  }

  if (!argv.bucket) {
    throw new Error('No bucket passed');
  }

  if (!argv.key) {
    throw new Error('No key passed');
  }
}

function handleError(err) {
  throw new Error(err);
}
