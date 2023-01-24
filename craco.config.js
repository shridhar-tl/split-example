//const { whenDev, whenProd, ESLINT_MODES, POSTCSS_MODES } = require("@craco/craco");
const fs = require('fs');
const path = require('path');

const writeToDisk = process.env.WRITE_TO_DISK === "true";
const analyzeBundles = process.env.ANALYZE_BUNDLES === "true";
const splitVendorChunk = process.env.SPLIT_VENDOR === "true";
const isLibBuild = process.env.BUILD_LIBRARY === "true";

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    webpack: {
        plugins: getPlugins(),
        configure: (wpConfig, { env, paths }) => {
            const isProd = wpConfig.mode === 'production';

            if (!isProd && writeToDisk) {
                wpConfig.devServer = { writeToDisk: true };
            }

            // set entry point
            wpConfig.entry = getEntryObject(paths);

            wpConfig.output.filename = 'static/js/[name].js';

            if (isLibBuild) {
                //
            } else if (splitVendorChunk) {
                //https://webpack.js.org/plugins/split-chunks-plugin/
                console.log('Splitting vendor chunk');
                wpConfig.optimization.splitChunks = getSplitChunkConfig();
            }

            return wpConfig;
        }
    }
};

function getSplitChunkConfig() {
    return {
        cacheGroups: {
            /* For information
            common: {
                test: function (module) {
                    return module.resource?.includes('utils.js') || (module.resource?.includes('library') && module.resource?.includes('components'));
                },
                name: 'common',
                chunks: 'all'
            },*/
            vendor: {
                test: /[\\/]node_modules[\\/](?!react)/,
                name: 'vendors',
                chunks: 'all'
            },
            react: {
                test: /[\\/]node_modules[\\/]react/,
                name: 'react',
                chunks: 'all'
            }
        }
    };
}

function getEntryObject() {
    const result = {
        employee: resolvePath('src/index'),
        admin: resolvePath('src/admin/index')
    };

    const libresult = {
        index: resolvePath('src/library/components/index')
    };

    return isLibBuild ? libresult : result;
}

function getPlugins() {
    const pluginsToAdd = isLibBuild ? [] : [
        [
            getHTMLWebpackPlugin("employee.html", resolvePath('public/employee.html'), ['employee'], true),
            'prepend'
        ],
        [
            getHTMLWebpackPlugin("admin.html", resolvePath('public/admin.html'), ['admin'], true),
            'prepend'
        ]
    ];

    if (analyzeBundles) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        pluginsToAdd.push(new BundleAnalyzerPlugin({
            analyzerMode: "static",
            generateStatsFile: true,
            openAnalyzer: false
        }));
    }

    return {
        remove: ['WebpackManifestPlugin', 'HtmlWebpackPlugin'],
        add: pluginsToAdd
    };
}

// Util functions
function getHTMLWebpackPlugin(filename, template, chunks, isEnvProduction) {
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    return new HtmlWebpackPlugin(
        Object.assign(
            {},
            {
                inject: true,
                filename,
                template,
                chunks
            },
            isEnvProduction
                ? {
                    minify: {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                    },
                }
                : undefined
        )
    );
}