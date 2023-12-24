const Encore = require('@symfony/webpack-encore');

// Configurer manuellement l'environnement d'exécution si ce n'est pas déjà fait par la commande "encore".
// C'est utile lorsque vous utilisez des outils qui dépendent du fichier webpack.config.js.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // répertoire où les actifs compilés seront stockés
    .setOutputPath('public/build/')
    // chemin public utilisé par le serveur web pour accéder au chemin de sortie
    .setPublicPath('/build')
    // nécessaire uniquement pour les CDN ou le déploiement en sous-répertoire
    //.setManifestKeyPrefix('build/')

    /*
     * CONFIGURATION D'ENTRÉE
     *
     * Chaque entrée résultera en un fichier JavaScript (par exemple, app.js)
     * et un fichier CSS (par exemple, app.css) si votre JavaScript importe du CSS.
     */
    .addEntry('app', './assets/app.js')

    // Lorsqu'activé, Webpack "divise" vos fichiers en morceaux plus petits pour une optimisation accrue.
    .splitEntryChunks()

    // nécessitera une balise script supplémentaire pour runtime.js
    // mais vous le souhaitez probablement, à moins que vous ne construisiez une application monopage
    .enableSingleRuntimeChunk()

    /*
     * CONFIGURATION DE FONCTIONNALITÉ
     *
     * Activez et configurez d'autres fonctionnalités ci-dessous. Pour une liste complète
     * des fonctionnalités, voir :
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // active les noms de fichiers hachés (par exemple, app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })

    // active et configure les polyfills @babel/preset-env
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    // active la prise en charge de Sass/SCSS
    .enableSassLoader()

    // décommentez si vous utilisez TypeScript
    //.enableTypeScriptLoader()

    // décommentez si vous utilisez React
    .enableReactPreset()

    // décommentez pour obtenir des attributs integrity="..." sur vos balises script et link
    // nécessite WebpackEncoreBundle 1.4 ou plus
    //.enableIntegrityHashes(Encore.isProduction())

    // décommentez si vous rencontrez des problèmes avec un plugin jQuery
    //.autoProvidejQuery()
;

const webpackConfig = Encore.getWebpackConfig();

// Ajouter la configuration allowedHosts
webpackConfig.devServer = webpackConfig.devServer || {};
webpackConfig.devServer.allowedHosts = ['localhost', 'votreapp.locale'];

module.exports = webpackConfig;

