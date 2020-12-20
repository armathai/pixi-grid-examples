const ora = require('ora');
const chalk = require('chalk');
const webpack = require('webpack');
const path = require('path');

(async function () {
    const spinner = ora(chalk.yellowBright(`Bundling...`)).start();
    webpack(require(`../webpack/webpack.prod`)(), (err, stats) => {
        spinner.stop();
        // uncomment this for more build logs
        console.log(
            stats.toString({
                chunks: false, // Makes the build much quieter
                colors: true, // Shows colors in the console
            }),
        );
        if (err) {
            console.log(chalk.redBright(`🛑 ${err.message}`));
            return;
        }
    });
})();
