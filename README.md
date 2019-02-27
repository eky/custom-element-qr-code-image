# custom-element-qr-code-image
This is a [`custom element`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) of QR code image extended from [`HTMLImageElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement) with "cover image" feature.

It depends on [node-qrcode](https://github.com/soldair/node-qrcode) and some polyfills until [Custom Elements v1](https://caniuse.com/#search=custom%20elements%20v1)'s **Customized built-in elements** is shipped in all major browsers.

## Installation
```sh
npm install custom-element-qr-code-image
```
or
```sh
yarn add custom-element-qr-code-image
```

## Polyfills
Until Nov 2018, Only Chrome and Firefox 63+ (released Oct 23, 2018) support [`Customized built-in elements`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Customized_built-in_elements). You may check the status on [Can I use - Custom Elements v1](https://caniuse.com/#search=Custom%20Elements%20v1).

You will need polyfills bundled in `dist/polyfills.js`, it included:
* [`@babel/polyfill`](https://babeljs.io/docs/en/babel-polyfill)
* [`@webcomponents/webcomponentsjs`](https://github.com/webcomponents/webcomponentsjs)
* [`document-register-element`](https://github.com/WebReflection/document-register-element)
* [`built-in-element`](https://github.com/WebReflection/built-in-element)
  - Use `test/es5/min.js` if you need to support IE (*IE*, not Edge)

## Usage
### Basic
#### HTML
```html
<img
	is="qr-code-image"
	data="https://github.com/eky/custom-element-qr-code-image"
/>
<script src="path/to/polyfills.js"></script>
<script src="path/to/custom-element-qr-code-image.js"></script>
<!-- or import the .js in somewhere if you use bundler -->
```
![Basic QR code](https://raw.githubusercontent.com/eky/custom-element-qr-code-image/master/docs/qr-code.png)
### Fancy QR code with options
[Demo on Codepen](https://codepen.io/eky/pen/MzoQYz)
#### HTML
```html
<img
	is="qr-code-image"
	src="[You can use src as a fallback image]"
	alt="[and use alt as normal <img> element do]"
	data="https://github.com/eky/custom-element-qr-code-image"
	size="300"
	colordark="#bb61a0ff"
	colorlight="#ffe7efff"
	errorcorrectionlevel="H"
	cover="pig.svg"
	coversize="150"
/>
```
![Fancy QR code](https://raw.githubusercontent.com/eky/custom-element-qr-code-image/master/docs/fancy-code.png)

## Attributes
### data
The data of QR code, no default value.
### size
[node-qrcode](https://github.com/soldair/node-qrcode#width) `width` option, default as `200`.
### margin
[node-qrcode](https://github.com/soldair/node-qrcode#margin) `margin` option, default as `0`.
### scale
[node-qrcode](https://github.com/soldair/node-qrcode#scale) `scale` option, default as `4`.
### colordark
[node-qrcode](https://github.com/soldair/node-qrcode#colordark) `color.dark` option, default as `#000000ff`.
### colorlight
[node-qrcode](https://github.com/soldair/node-qrcode#colorlight) `color.light` option, default as `#ffffffff`.
### errorcorrectionlevel
[node-qrcode](https://github.com/soldair/node-qrcode#errorcorrectionlevel) `errorCorrectionLevel` option, default as `M`.
### cover
The URL of image cover on the QR code, no default value. Strongly recommend to set `errorcorrectionlevel` as `H` or `Q` when there is a cover on QR code.
### coversize
The larger size of width and height, default as `size * 0.4`.

## Event
### generated
A `CustomEvent` will be dispatched after QR code has been generated.
#### example
```javascript
document.querySelector('[is="qr-code-image"]')
	.addEventListener('generated', event => {
		console.log(`QR code is ${event.type}.`);
	});
```

## License
[MIT](https://github.com/eky/element-visibility-observer/blob/master/LICENSE)

The word "QR Code" is registered trademark of:<br>
DENSO WAVE INCORPORATED
