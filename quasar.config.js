/* eslint-env node */
const { configure } = require('quasar/wrappers')
require('dotenv').config()

module.exports = configure(function (/* ctx */) {
  return {
    boot: [],
    css: ['app.scss', 'fonts.scss'],
    extras: ['roboto-font', 'material-icons'],
    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20'
      },
      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            eslint: {
              lintCommand: 'eslint "./**/*.{js,mjs,cjs,vue}"'
            }
          },
          { server: false }
        ]
      ],
      env: {
        USERID: process.env.USERID,
        USERPASSWORD: process.env.USERPASSWORD
      }
    },
    devServer: {
      open: true
    },
    framework: {
      config: {},
      plugins: ['Dialog', 'Notify', 'Loading']
    },
    animations: [],
    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: ['render']
    },
    pwa: {
      workboxMode: 'generateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false
    },
    cordova: {},
    capacitor: {
      hideSplashscreen: true
    },
    electron: {
      inspectPort: 5858,
      bundler: 'builder',
      builder: {
        appId: 'scheduler',
        win: {
          target: {
            target: 'nsis',
            arch: ['x64', 'ia32']
          }
        },
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
        extraFiles: [{ from: 'public', to: 'resources', filter: ['**/*'] }]
      }
    },
    bex: {
      contentScripts: ['my-content-script']
    }
  }
})
