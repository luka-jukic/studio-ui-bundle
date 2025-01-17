/**
 * Pimcore
 *
 * This source file is available under two different licenses:
 * - Pimcore Open Core License (POCL)
 * - Pimcore Commercial License (PCL)
 * Full copyright and license information is available in
 * LICENSE.md which is distributed with this source code.
 *
 *  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
 *  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
 */

const Encore = require('@symfony/webpack-encore');
const path = require('path');
var { DllPlugin } = require('webpack');

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
  .setOutputPath(path.resolve(__dirname, '..', 'public', 'vendor'))
  // public path used by the web server to access the output path
  .setPublicPath('/bundles/pimcorestudioui/vendor')
  .setManifestKeyPrefix('bundles/pimcorestudioui/vendor')

    .addEntry('vendor', [
      'react',
      'react-dom',
      'antd',
      'antd/es/table/style',
      'antd/es/pagination/style',
      'antd/es/config-provider/context',
      'antd-style',
      'reflect-metadata',
      'inversify'
    ])

    .disableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())
    
    .addPlugin(new DllPlugin({
      context: __dirname,
      name: 'studio_vendor',
      path: __dirname + '/dist/vendor/vendor-manifest.json',
    }));

let webpackConfig = Encore.getWebpackConfig();

webpackConfig.name = 'studio_vendor';

webpackConfig = {
  ...webpackConfig,
  output: {
      ...webpackConfig.output,
      library: 'studio_vendor'
  }
}

module.exports = [webpackConfig];
