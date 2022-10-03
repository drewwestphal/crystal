const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    index: "./dist/index.js",
    envelop: {
      dependOn: "index",
      import: "./dist/envelop.js",
    },
  },
  output: {
    path: path.resolve(__dirname, "release/dist"),
    filename: "[name].js",
    library: {
      name: "grafast",
      type: "umd",
    },
    globalObject: "this",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.GRAPHILE_ENV": JSON.stringify("production"),
    }),
  ],
  externals: {
    // graphql -> external
    graphql: {
      commonjs: "graphql",
      commonjs2: "graphql",
      amd: "graphql",
      root: "graphql",
    },
    // TODO: we really need to remove the dependency on buildExecutionContext
    "graphql/execution/execute": {
      commonjs: "graphql/execution/execute",
      commonjs2: "graphql/execution/execute",
      amd: "graphql/execution/execute",
      root: "graphql/execution/execute",
    },
    // crypto.createHash -> external, optional
    crypto: {
      commonjs: "crypto",
      commonjs2: "crypto",
      amd: "crypto",
      root: "crypto",
    },
    // util.inspect -> external, optional
    util: {
      commonjs: "util",
      commonjs2: "util",
      amd: "util",
      root: "util",
    },
    // @graphile/lru -> bundle
    // chalk -> bundle
    // debug -> bundle
    // events.EventEmitter -> replaced with eventemitter3 -> bundle
    // iterall -> bundle
    // lodash -> bundle
    // tslib -> bundle
  },
  performance: {
    maxEntrypointSize: 215000,
  },
};