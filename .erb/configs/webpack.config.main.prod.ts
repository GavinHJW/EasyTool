/**
 * Webpack config for production electron main process
 */

import path from 'path'
import webpack from 'webpack'
import { merge } from 'webpack-merge' // 用于合并配置
import TerserPlugin from 'terser-webpack-plugin' // 用于压缩代码
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer' // 用于分析打包结果
import baseConfig from './webpack.config.base'
import webpackPaths from './webpack.paths'
import checkNodeEnv from '../scripts/check-node-env'
import deleteSourceMaps from '../scripts/delete-source-maps'

checkNodeEnv('production')
deleteSourceMaps()

const configuration: webpack.Configuration = {
	// 生成 source map 以便调试
	devtool: 'source-map',
	// 指定为生产模式
	mode: 'production',
	// 指定构建的目标环境为 Electron 主进程
	target: 'electron-main',
	//  指定入口文件，一般是主进程的主文件 main.ts 和预加载脚本的文件 preload.ts
	entry: {
		main: path.join(webpackPaths.srcMainPath, 'main.ts'),
		preload: path.join(webpackPaths.srcMainPath, 'preload.ts'),
	},
	// 指定输出的路径和文件名格式
	// type: 'umd' 表示打包生成的代码将采用 UMD（Universal Module Definition）模块系统
	// UMD 是一种通用的模块定义规范，它兼容了多种模块加载器（如 CommonJS、AMD、以及全局变量引入等），使得代码可以在各种环境中运行，包括浏览器和 Node.js 等
	output: {
		path: webpackPaths.distMainPath,
		filename: '[name].js',
		library: {
			type: 'umd',
		},
	},
	// 指定优化配置，这里使用了 TerserPlugin 进行代码压缩
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
			}),
		],
	},

	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode:
				process.env.ANALYZE === 'true' ? 'server' : 'disabled',
			analyzerPort: 8888,
		}),

		/**
		 * Create global constants which can be configured at compile time.
		 *
		 * Useful for allowing different behaviour between development builds and
		 * release builds
		 *
		 * NODE_ENV should be production so that modules do not perform certain
		 * development checks
		 */
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'production',
			DEBUG_PROD: false,
			START_MINIMIZED: false,
		}),

		new webpack.DefinePlugin({
			'process.type': '"browser"',
		}),
	],

	/**
	 * Disables webpack processing of __dirname and __filename.
	 * If you run the bundle in node.js it falls back to these values of node.js.
	 * https://github.com/webpack/webpack/issues/2010
	 */
	node: {
		__dirname: false,
		__filename: false,
	},
}
// 使用 merge 函数将基础配置 baseConfig 和当前配置 configuration 合并，并导出
export default merge(baseConfig, configuration)
