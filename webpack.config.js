module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  rules: [
    {
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
  ],
};
