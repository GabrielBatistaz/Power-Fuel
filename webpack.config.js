const path = require('path');

module.exports = {
  entry: './src/app/login', // Ponto de entrada do aplicativo
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      // Adicione outras regras conforme necessário
    ]
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      os: false,
      crypto: false,
      stream: false,
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
