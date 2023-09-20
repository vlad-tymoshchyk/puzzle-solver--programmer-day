const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.ts?/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Puzzle braker',
      templateContent: ({ htmlWebpackPlugin }) => `
      <html>
        <head>
          <title>Puzzle braker</title>
          ${htmlWebpackPlugin.tags.headTags}
        </head>
        <body>
          <div id="root">Hello World</div>
          ${htmlWebpackPlugin.tags.bodyTags}
        </body>
      </html>`,
    }),
  ],
};
