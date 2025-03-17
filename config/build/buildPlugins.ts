import { Configuration } from "mini-css-extract-plugin"
import webpack, { DefinePlugin } from "webpack"
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from "../types/types"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const isDev = options.mode == 'development';
	const isProd = options.mode == 'production';

    return (
        [
            new HTMLWebpackPlugin({template: options.paths.html}),
            isDev && new webpack.ProgressPlugin(),
            isProd && new MiniCssExtractPlugin({
                filename: 'styles.css'
            }),
            options.analyzer && new BundleAnalyzerPlugin(),
            new DefinePlugin({
                __PLATFORM__: JSON.stringify(options.platform),
                __URL_SERVER__: 'http://localhost:3000/api',
                __URL_CLIENT__: 'http://localhost:5000'
            }),
            isDev && new ReactRefreshWebpackPlugin()
        ]
    )
}

export default buildPlugins

//favicon: path.resolve(options.paths.public, 'icon.png')