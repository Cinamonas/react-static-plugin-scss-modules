const { getLocalIdent } = require('css-loader/dist/utils');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = () => {
  return {
    webpack(config, { stage }) {
      const styleLoader = {
        loader: require.resolve('style-loader'),
      };
      const cssLoader = {
        loader: require.resolve('css-loader'),
        options: {
          modules: true,
          importLoaders: 2,
          localIdentName: '[name]-[local]_[hash:base64:4]',
          getLocalIdent: (context, localIdentName, localName, options) =>
            context.resourcePath.includes('/node_modules/')
              ? localName
              : getLocalIdent(context, localIdentName, localName, options),
        },
      };
      const postcssLoader = {
        loader: require.resolve('postcss-loader'),
        options: {
          plugins: [
            require('postcss-flexbugs-fixes'),
            require('autoprefixer')({
              flexbox: 'no-2009',
            }),
          ],
        },
      };
      const sassLoader = {
        loader: require.resolve('sass-loader'),
      };

      config.module.rules[0].oneOf.unshift({
        test: /\.scss$/,
        use: {
          dev: [styleLoader, cssLoader, postcssLoader, sassLoader],
          node: [
            extendOptions(cssLoader, { exportOnlyLocals: true }),
            postcssLoader,
            sassLoader,
          ],
          prod: [ExtractCssChunks.loader, cssLoader, postcssLoader, sassLoader],
        }[stage],
      });

      return config;
    },
  };

  function extendOptions(loader, options) {
    return {
      ...loader,
      options: {
        ...loader.options,
        ...options,
      },
    };
  }
};
