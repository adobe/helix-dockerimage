function echo(params, secrets, logger) {
  logger.log("info", "Hello World from Node.js!");

  return {
    action: process.env["__OW_ACTION_NAME"],
    hello: "world",
    params: params,
    secrets: "I can't tell you",
    version: process.versions,
    packages: require("./package.json").dependencies
  };
}
const main = require('@adobe/openwhisk-loggly-wrapper')(echo);
module.exports.main = main;
