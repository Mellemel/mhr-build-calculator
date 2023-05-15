const path = require("path");
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
  config.resolve.plugins.forEach(plugin => {
    if (plugin instanceof ModuleScopePlugin) {
      plugin.allowedPaths.push(path.resolve("./database"));
    }
  });
  config.module.rules.forEach(rule => {
    if (rule.oneOf) {
      const babelRule = rule.oneOf.find(rule => rule.test.toString().includes("tsx"));
      if (babelRule) {
        babelRule.include = [babelRule.include, path.resolve("./database")]
      }
    }
  });
  config.resolve.fallback = {
    ...config.resolve.fallback,
    fs: false,
    path: false,
    crypto: false,
  }
  return config;
}