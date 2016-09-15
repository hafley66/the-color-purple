var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    progress:true,
    colors: true,
    devServer: {inline: true},

    entry: "./src/bootstrap-app/build-ler.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },

    resolve: {
        modulesDirectories: ["node_modules", 'src']
    },
    module: {
        loaders: [
        { 
            test: /\.css$/, 
            loader: "style!css!postcss" 
        },
        {
            test: /\.scss$/,
            loader: "style!css!postcss!sass"
        },
        {
            test: /\.sass$/,
            loader: "style!css!postcss!sass?indentedSyntax=true"
        },
        {
            test: /\.png$/,
            loader: "file"
        },
        {
            test: /\.html$/,
            loader: "html"
        },
        {
            test: /\.(pug|jade)$/,
            loader: "pug"
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel",
            query: {
                presets: ["es2015"],
                plugins: ["transform-es2015-modules-commonjs"]
            }
        }
        ]
    },
    postcss: function(){return[precss, autoprefixer]}
};

function shorty(test, loader, query){
    return {
        test,
        loader,
        query
    };
}