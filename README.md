# Custom Docker Images for OpenWhisk

OpenWhisk comes with a one megabyte limit for function ZIP files. This can be a too harsh limit for many practical purposes. In addition, the Node 6 action comes with a long list of pre-packaged depdendencies, including some of the most popular NPM packages. The newer Node 8 action does not include any pre-packaged dependencies, which means we are forced to trade-off between using a modern Node version or having access to useful packages.

Fortunately, OpenWhisk also supports the creation of custom Docker images, so we can circumvent this trade-off by creating a Docker image that has exactly the dependencies pre-installed that we need, without any of the stuff we don't need.

## Status
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/helix-dockerimage.svg)](https://circleci.com/gh/adobe/helix-dockerimage)
[![GitHub license](https://img.shields.io/github/license/adobe/helix-dockerimage.svg)](https://github.com/adobe/helix-dockerimage/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/helix-dockerimage.svg)](https://github.com/adobe/helix-dockerimage/issues)
[![Docker Image Size](https://img.shields.io/microbadger/image-size/trieloff/custom-ow-nodejs8.svg)](https://hub.docker.com/r/trieloff/custom-ow-nodejs8/) [![Greenkeeper badge](https://badges.greenkeeper.io/adobe/helix-dockerimage.svg)](https://greenkeeper.io/)

## Building It

Make sure you have Docker installed and are logged in to Docker Hub. The image is published under the `trieloff` namespace.

```bash
$ ./build.sh
```

## Testing it

Once the function has been deployed, it can be tested using `npm test`

## What's included

The package is based on the dependency list of the original Node 6 image, whith a number of modifications:

* updated dependencies to the newest version (thanks to Greenkeeper)
* removed deprecated and useless dependencies
* added dependencies that are specific to Project Helix

### Removed Dependencies

#### `"apn": "^2.1.2"`

> A Node.js module for interfacing with the Apple Push Notification service.

We don't send push notifications directly.


#### `"body-parser": "^1.15.2"`

> Node.js body parsing middleware.

Not needed.

#### `"cheerio": "^0.22.0"`

> Tiny, fast, and elegant implementation of core jQuery designed specifically for the server

Use `lodash` instead.



#### `"cloudant": "^1.6.2"`

> A minimalistic Cloudant/CouchDB driver for Node.js

Not used, as no CouchDB is available.

#### `"commander": "^2.9.0"`

> The complete solution for node.js command-line programs

We aren't building command line apps, we are building functions.

#### `"consul": "^0.27.0"`

> Consul client

Service is not available.


#### `"cookie-parser": "^1.4.3"`

> Cookie parsing with signatures

Needs Express


#### `"cradle": "^0.7.1"`

> The high-level, caching, CouchDB library

No CouchDB available.


#### `"errorhandler": "^1.5.0"`

> Development-only error handler middleware

Needs Express

#### `"express": "^4.14.0"`

> Fast, unopinionated, minimalist web framework

Needs Express

#### `"express-session": "^1.14.2"`

> Simple session middleware for Express

Needs Express

#### `"log4js": "^0.6.38"`

> Port of Log4js to work with node.

Use `winston` instead.

#### `"node-uuid": "^1.4.7"`

> This package has been deprecated, Use uuid module instead

#### `"marked": "^0.3.6"`

> A markdown parser built for speed

Use `unified` instead.


#### `"mongodb": "^2.2.11"`

> The official MongoDB driver for Node.js

No MongoDB available.


#### `"nano": "^6.2.0"`

> The official CouchDB client for Node.js

No CouchDB available.


#### `"pkgcloud": "^1.4.0"`

> An infrastructure-as-a-service agnostic cloud library for node.js

Updated to **1.5.0** due to multiple vulnerabilities, then removed, as issues have not been fixed in newer version.


#### `"redis": "^2.6.3"`

> Redis client library

No Redis service available.


#### "rimraf": "^2.5.4"

> deep deletion module for node (like `rm -rf`)

Use `fs-extra` instead.


#### `"sendgrid": "^4.7.1"`

> This library allows you to quickly and easily use the SendGrid Web API v3 via Node.js.

Unused and outdated.


#### `"serve-favicon": "^2.3.2"`

> Node.js middleware for serving a favicon.

Not needed.

#### `"superagent": "^3.0.0"`

> Elegant & feature rich browser / node HTTP with a fluent API

Use `request-promise` instead.


#### `"swagger-tools": "^0.10.1"`

> Various tools for using and integrating with Swagger.


Not used.

#### `"twilio": "^2.11.1"`

> A Twilio helper library

Vendor stuff.


#### `"underscore": "^1.8.3"`

> JavaScript's functional programming helper library.

Use `lodash/fp` instead.


#### `"watson-developer-cloud": "^2.29.0"`

> Client library to use the IBM Watson Services and AlchemyAPI

Vendor stuff.


#### `"when": "^3.7.7"`

> A lightweight Promises/A+ and when() implementation, plus other async goodies.

Use `bluebird` instead.

### Added Dependencies


#### `"fs-extra": "^5.0.0"`

> fs-extra contains methods that aren't included in the vanilla Node.js fs package. Such as mkdir -p, cp -r, and rm -rf.

A drop-in replacement for Node's `fs` module.
