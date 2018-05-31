const _ = require("lodash/fp");
const winston = require("winston");
require("winston-loggly-bulk");

function sanitize(o) {
  return _.fromPairs(
    Object.entries(o).map(([k, v]) => {
      if (k.match(/^[A-Z0-9_]+$/)) {
        return [k, k.replace(/./g, "•")];
      } else {
        return [k, v];
      }
    })
  );
}

function main(params) {
  try {
    winston.add(winston.transports.Loggly, {
      token: params.LOGGLY_KEY,
      subdomain: params.LOGGLY_HOST,
      tags: ["Winston-NodeJS"],
      json: true
    });
  } catch (e) {}

  winston.log("info", "Hello World from Node.js!");

  return {
    hello: "world",
    params: sanitize(params),
    version: process.versions,
    packages: require("./package.json").dependencies
  };
}

module.exports.main = main;
