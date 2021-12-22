import { resolve, parse } from 'path';
import {sync} from 'glob';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
    entry: sync('./lib/*/**.ts').reduce((obj:{[key: string]: string}, el) => {
        obj[parse(el).name] = el;
        return obj
    },{}),
    optimization: { minimize: true },
    output: {
        filename: '[name]/[name].js',
        libraryTarget: 'commonjs2',
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
    },
    resolve: {
        extensions: ['.js', '.ts'],
    },
    target: 'node',
    mode: 'production',
    plugins: [
        new webpack.IgnorePlugin({resourceRegExp: /^pg-native$/})
    ],
    externals: {
        axios: {
            root: 'axios',
            commonjs2: 'axios',
            commonjs: 'axios',
            amd: 'axios',
        }
    }
};

export default config;
