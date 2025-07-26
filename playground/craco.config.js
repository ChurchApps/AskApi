const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // More aggressive approach to fix module resolution issues
      
      // Set fullySpecified to false globally
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.oneOf) {
          rule.oneOf.forEach((oneOf) => {
            if (oneOf.resolve) {
              oneOf.resolve.fullySpecified = false;
            }
          });
        }
        if (rule.resolve) {
          rule.resolve.fullySpecified = false;
        }
      });

      // Add specific rule for @churchapps packages
      webpackConfig.module.rules.unshift({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      });

      // Update resolve configuration
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fullySpecified: false,
        // Try different extensions
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs'],
        // Add alias for problematic imports if needed
        alias: {
          ...webpackConfig.resolve.alias,
        },
      };

      return webpackConfig;
    },
  },
};