require('mmenu-light');
require('@sallaapp/theme-utils') // todo :: change the namespace to salla.sa
salla.init();
require('./partials/custom');
require('./plugins/lazyload.js');
// require('./partials/search-modal')
require('@salla.sa/twilight-components/dist/twilight-components/twilight-components.esm')

window.anime = require('animejs').default;
import Alpine from 'alpinejs'
window.Alpine = Alpine;
Alpine.start();