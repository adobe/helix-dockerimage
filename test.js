const wrapper = require('@adobe/openwhisk-loggly-wrapper');

function echo(params) {
  params.__ow_logger.log("info", "Hello World from Node.js!");

  // remove logger from params, otherwise it might produce a circular reference error when
  // openwhisk serializes the response
  delete params.__ow_logger;

  // also filter SECRETS, since owwrapper no longer filters them
  Object.keys(params).forEach((key) => {
    if (key.match(/^[A-Z0-9_]+$/)) {
      delete params[key];
    }
  });

  return {
    action: process.env["__OW_ACTION_NAME"],
    hello: "world",
    params: params,
    version: process.versions,
    packages: require("./package.json").dependencies
  };
}

module.exports.main = function main(...args) {
  try {
    return wrapper(echo, ...args);
  } catch (e) {
    return {
      error: '' + e.stack
    }
  }
};
