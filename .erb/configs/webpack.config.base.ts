/**
 * Base webpack config used across other specific configs
 */

import webpack from 'webpack'
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin'
import webpackPaths from './webpack.paths'
import { dependencies as externals } from '../../release/app/package.json'

const configuration: webpack.Configuration = {
	// Externals: 这里将项目的依赖项声明为外部依赖，以避免将它们打包到最终的构建文件中。它们将在运行时从环境中导入
	externals: [...Object.keys(externals || {})],
	// 配置Webpack输出的统计信息，这里设置为仅在出现错误时显示
	stats: 'errors-only',
	// 定义了Webpack处理模块的规则。在这里，使用了ts-loader来处理TypeScript文件(集成 ts-loader，直接在 Webpack 构建过程中编译 TypeScript 代码)，transpileOnly选项设置为false，表示进行类型检查
	// 设置module为esnext是为了告诉TypeScript编译器，生成的JavaScript代码应该符合ES模块的语法
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: false,
						compilerOptions: {
							module: 'esnext',
						},
					},
				},
			},
		],
	},

	output: {
		path: webpackPaths.srcPath,
		// https://github.com/webpack/webpack/issues/1114
		library: {
			type: 'commonjs2',
		},
	},

	/**
	 * Determine the array of extensions that should be used to resolve modules.
	 */
	// 配置Webpack如何解析模块路径。指定了模块的扩展名和查找模块的路径。同时使用了tsconfig-paths-webpack-plugin插件，该插件会根据项目的tsconfig.json文件中的路径配置来解析模块路径
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
		modules: [webpackPaths.srcPath, 'node_modules'],
		// There is no need to add aliases here, the paths in tsconfig get mirrored
		plugins: [new TsconfigPathsPlugins()],
	},
	// 添加了Webpack插件，这里使用了EnvironmentPlugin插件，用于定义环境变量。在这里，将NODE_ENV设置为production，以确保在构建时能够优化输出文件
	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: 'production',
		}),
	],
}

export default configuration
