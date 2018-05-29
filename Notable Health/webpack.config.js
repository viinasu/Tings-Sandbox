module.exports = {
  entry: {
    javascript: "./app/js/app.js",
    html: "./app/index.html",
  },
  output: {
    path: __dirname + "/dist",
    filename: "./js/app.js"
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true, //allows you to load react in paths other than index
    proxy: {
      "/api": "http://localhost:8142"
    }
  },
  module: {
    rules: [
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [ { loader: 'url-loader',  options: { limit: 8192 } }]
        }],
    loaders: [
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["react-hot", 'babel?'+JSON.stringify(
          {
            presets: ['react', 'es2015'],
            "plugins": [
              "syntax-class-properties",
              "syntax-decorators",
              "syntax-object-rest-spread",

              "transform-class-properties",
              "transform-object-rest-spread"
            ]
          }
        )]
      }
    ]
  }
};