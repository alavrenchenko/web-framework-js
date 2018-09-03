'use string';

var pkg = require('../package.json');

var src = './src/';
var dist = './dist/';

var js = 'js/';
var css = 'css/';

module.exports = {
    all: {
        scripts: {
            header: `/** ${pkg.name} v${pkg.version} **/\n`,
            path: {
                build: `${dist}${js}`
            }
        },
        css: {
            path: {
                build: `${dist}${css}`,
            }
        },
    },
    core: {
        scripts: {
            header: `/** ${pkg.name} v${pkg.version} **/\n`,
            path: {
                build: `${dist}packages/core/${js}`,
                src: `${src}core/${js}`
            }
        }
    },
    dom: {
        scripts: {
            header: `/** ${pkg.name} v${pkg.version} **/\n`,
            path: {
                build: `${dist}packages/dom/${js}`,
                src: `${src}dom/${js}`
            }
        }
    },
    app: {
        scripts: {
            header: `/** ${pkg.name} v${pkg.version} **/\n`,
            path: {
                build: `${dist}packages/app/${js}`,
                src: `${src}app/${js}`
            }
        }
    },
    ui: {
        scripts: {
            header: `/** ${pkg.name} v ${pkg.version} **/\n`,
            extensions: ['.jsx'],
            path: {
                build: `${dist}packages/ui/${js}`,
                src: `${src}ui/${js}`
            }
        },
        css: {
            path: {
                build: `${dist}packages/ui/${css}`,
                src: `${src}ui/${css}`
            }
        }
    },
    clean: {
        dist
    }
};