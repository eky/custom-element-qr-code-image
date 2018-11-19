import '@babel/polyfill';

// Need both customElements polyfill
import '@webcomponents/webcomponentsjs';
import 'document-register-element';

// Use 'built-in-element' instead of es5 version if you don't need IE (*IE*, not Edge) support
import './built-in-element-es5.js';
