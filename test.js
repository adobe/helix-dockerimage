const _ = require("lodash/fp");

/**
 * Masks all values of ALL_CAPS keys in o, so that sensitive data isn't
 * inadvertantly echoed
 */
function sanitize(o) {
  return _.fromPairs(
    Object.entries(o).map(([k, v]) => {
      if (k.match(/^[A-Z0-9_]+$/)) {
        return [k, k.replace(/./g, "•") + v.substr(-4)];
      } else {
        return [k, v];
      }
    })
  );
}
/**
 * Returns true when k is likely the name of a secure key (i.e. in ALL_CAPS)
 * @param {String} k 
 */
function secure(v, k) {
    return k.match(/^[A-Z0-9_]+$/)
}

function split(o) {
    return [_.pickBy(secure, o), _.pickBy(_.negate(secure), o)];
}

/**
 * Wraps a function f with proper logging, before and after.
 */
function wrap(f) {
  return function(p) {
    const winston = require("winston");
    require("winston-loggly-bulk");

    //default log level
    var loglevel = 'info';
    if (p['__ow_headers']) {
        if (p['__ow_headers']['X-Debug']) {
            // use the log level set in the `X-Debug` header
            loglevel = p['__ow_headers']['X-Debug'];
        }
    } else {
        //there are no headers present, this is a direct invocation, set log level to debug
        loglevel = 'debug';
    }

    try {
      winston.add(winston.transports.Loggly, {
        token: p.LOGGLY_KEY,
        subdomain: p.LOGGLY_HOST,
        //include OW_ACTION_NAME in tags for easier filtering
        tags: ["OpenWhisk", process.env["__OW_ACTION_NAME"].replace(/\/.+\//, '')],
        json: true,
        level: loglevel
      });
    } catch (e) {
      console.error(e);
    }
    console.log("before");
    winston.log("debug", "before");
    try {
      const [secrets, params] = split(p);
      const retval = Promise.resolve(f(params, secrets, winston))
        .then(r => {
          console.log("resolved");
          winston.log("debug", "resolved");
          return r;
        })
        .catch(e => {
          console.log("error");
          winston.log("error", e);
          return e;
        });
      return retval;
    } catch (e) {
      console.log("error");
      winston.log("error", e);
    }
  };
}

function echo(params, secrets, logger) {
  logger.log("info", "Hello World from Node.js!");

  return {
    action: process.env["__OW_ACTION_NAME"],
    hello: "world",
    params: sanitize(params),
    secrets: sanitize(secrets),
    version: process.versions,
    packages: require("./package.json").dependencies
  };
}
const main = wrap(echo);
module.exports.main = main;
