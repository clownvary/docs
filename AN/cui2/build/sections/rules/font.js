export const fontRules = [
  {
    test: /\.woff(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          // Limit at 8k. Above that it emits separate files
          limit: 8000,
          // url-loader sets mimetype if it is passed.
          // Without this it derives it from the file extension
          mimetype: 'application/font-woff',
          // Output below fonts directory
          name: 'fonts/[name].[hash].[ext]'
        }
      }
    ],
    exclude: [/(\/|\\)svgs(\/|\\)/]
  },
  {
    test: /\.woff2(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8000,
          mimetype: 'application/font-woff2',
          name: 'fonts/[name].[hash].[ext]'
        }
      }
    ],
    exclude: [/(\/|\\)svgs(\/|\\)/]
  },
  {
    test: /\.[ot]tf(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8000,
          mimetype: 'application/octet-stream',
          name: 'fonts/[name].[hash].[ext]'
        }
      }
    ],
    exclude: [/(\/|\\)svgs(\/|\\)/]
  },
  {
    test: /\.eot(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8000,
          mimetype: 'application/vnd.ms-fontobject',
          name: 'fonts/[name].[hash].[ext]'
        }
      }
    ],
    exclude: [/(\/|\\)svgs(\/|\\)/]
  },
  {
    test: /\.svg(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8000,
          mimetype: 'image/svg+xml',
          name: 'fonts/[name].[hash].[ext]'
        }
      }
    ],
    exclude: [/(\/|\\)svgs(\/|\\)/]
  }
];

export default fontRules;
