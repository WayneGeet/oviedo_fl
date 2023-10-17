module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['my-custom-babel-preset'],
          },
        },
      },
    ],
  }