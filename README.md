# Custom Docker Images for OpenWhisk

OpenWhisk comes with a one megabyte limit for function ZIP files. This can be a too harsh limit for many practical purposes. In addition, the Node 6 action comes with a long list of pre-packaged depdendencies, including some of the most popular NPM packages. The newer Node 8 action does not include any pre-packaged dependencies, which means we are forced to trade-off between using a modern Node version or having access to useful packages.

Fortunately, OpenWhisk also supports the creation of custom Docker images, so we can circumvent this trade-off by creating a Docker image that has exactly the dependencies pre-installed that we need, without any of the stuff we don't need.

## Building it

Make sure you have Docker installed and are logged in to Docker Hub. The image is published under the `trieloff` namespace.

```bash
$ ./build.sh
```

## What's included

The package is based on the dependency list of the original Node 6 image, whith a number of modifications:

* updated dependencies to the newest version
* removed deprecated and useless dependencies
* added dependencies that are specific to Project Helix

### Updated Dependencies

#### `"async": "^2.1.4"`

> Async is a utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript. Although originally designed for use with Node.js and installable via npm install --save async, it can also be used directly in the browser.


#### `"btoa": "^1.1.2"`

> Btoa (base64 to ASCII) for Node.JS (it's a one-liner)


#### `"glob": "^7.1.1"`

> A little globber

#### `"gm": "^1.23.0"`

> GraphicsMagick and ImageMagick for node.js


#### `"iconv-lite": "^0.4.15"`

> Convert character encodings in pure javascript.


#### `"lodash": "^4.17.2"`

> Lodash modular utilities.


#### `"merge": "^1.2.0"`

> Merge multiple objects into one, optionally creating a new cloned object. Similar to the jQuery.extend but more flexible. Works in Node.js and the browser.

#### `"moment": "^2.17.0"`

> Parse, validate, manipulate, and display dates


#### `"mustache": "^2.3.0"`

> Logic-less {{mustache}} templates with JavaScript

#### `"nodemailer": "^2.6.4"`

> Easy as cake e-mail sending from your Node.js applications

Updated to **4.6.5** as Version 2 branch has been deprecated.

#### `"oauth2-server": "^2.4.1"`

> Complete, framework-agnostic, compliant and well tested module for implementing an OAuth2 Server in node.js

#### `"openwhisk": "^3.15.0"`

> JavaScript client library for the OpenWhisk platform

#### `"pkgcloud": "^1.4.0"`

> An infrastructure-as-a-service agnostic cloud library for node.js

Updated to **1.5.0** due to multple vulnerabilities.

#### `"process": "^0.11.9"`

> Process information for node.js and browsers

#### `"pug": "^2.0.0"`

> A clean, whitespace-sensitive template language for writing HTML


#### `"request": "^2.79.0"`

> Simplified HTTP request client.

#### `"request-promise": "^4.1.1"`

> The simplified HTTP request client 'request' with Promise support. Powered by Bluebird

#### `"rimraf": "^2.5.4"`

> deep deletion module for node (like `rm -rf`)

#### `"semver": "^5.3.0"`

> The semantic versioner for npm

#### `"socket.io": "^1.6.0"`

> Socket.IO enables real-time bidirectional event-based communication

Updated to **2.1.1** due to multiple vulnerabilities.

#### `"socket.io-client": "^1.6.0"`

> socket.io real-time engine client


Updated to **2.1.1** due to multiple vulnerabilities.

#### `"tmp": "0.0.31"`

> Temporary file and directory creator

#### `"uuid": "3.2.1"`

> RFC4122 (v1, v4, and v5) UUIDs


#### `"validator": "^6.1.0"`

> String validation and sanitization

#### `"winston": "^2.3.0"`

> A multi-transport async logging library for Node.js

#### `"ws": "^1.1.1"`

> Simple to use, blazing fast and thoroughly tested websocket client and server for Node.js

#### `"xml2js": "^0.4.17"`

> Simple XML to JavaScript object converter.

#### `"xmlhttprequest": "^1.8.0"`

> XMLHttpRequest for Node

#### `"yauzl": "^2.7.0"

> Yet another unzip library for node

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


#### `"redis": "^2.6.3"`

> Redis client library

No Redis service available.


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
