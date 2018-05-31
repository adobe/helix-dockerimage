function main(params) {
  return {
    hello: "world",
    params: params,
    version: process.versions,
    packages: require("./package.json").dependencies
  };
}

module.exports.main = main;
