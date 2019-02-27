import { toCanvas as qrCodeToCanvas } from 'qrcode';

export default class HTMLQRCodeImageElement extends HTMLImageElement {
	constructor() {
		super();
		this.isInitialized = false;
	}

	static get defaultAttributes() {
		return {
			data: null,
			size: '200',
			margin: '0',
			scale: '4',
			colordark: '#000000ff',
			colorlight: '#ffffffff',
			errorcorrectionlevel: 'M', // L / M / Q / H
			cover: null,
			coversize: null,
		};
	}

	static get observedAttributes() {
		return Object.keys(HTMLQRCodeImageElement.defaultAttributes);
	}

	connectedCallback() {
		if (!this.isInitialized) {
			this._assignDefaultAttributes(HTMLQRCodeImageElement.defaultAttributes);

			this.render();
			this.isInitialized = true;
		}
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (this.isInitialized && this.isConnected && newValue !== null) {
			this.render();
		}
	}

	_assignDefaultAttributes(defaultAttributes) {
		const defaults = defaultAttributes;
		Object.keys(defaults).map(key => {
			const attribute = this.getAttribute(key);
			if (
				(
					attribute === null ||
					attribute === ''
				) &&
				defaults[key] !== null
			) {
				this.setAttribute(key, defaults[key]);
			}
		});
	}

	/* Input attributeNames ['a', b'] will returns:
	 * {
	 * 	a: this.getAttribute('a'),
	 * 	b: this.getAttribute('b'),
	 * }
	 */
	_getAttributes(attributeNames) {
		if (!Array.isArray(attributeNames)) return {};
		return attributeNames.reduce((accumulator, currentValue) => {
			const currentPair = {};
			currentPair[currentValue] = this.getAttribute(currentValue);
			return Object.assign(accumulator, currentPair);
		}, {});
	}

	async _addCoverImage(canvas) {
		const {
			cover,
			coversize,
			size,
		} = this._getAttributes([
			'cover',
			'coversize',
			'size',
		]);

		const image = new Image();
		try {
			// Wait for cover image is loaded
			await new Promise((resolve, reject) => {
				image.onload = () => resolve(image);
				image.onerror = reject;
				image.src = cover;
				if (image.complete) resolve(image);
			});

			// Get the larger width / height and set smaller one in ratio
			let coverWidth = 0;
			let coverHeight = 0;
			if (image.width > image.height) {
				coverWidth = (coversize || size * 0.4);
				coverHeight = (coversize || size * 0.4) * image.height / image.width;
			} else {
				coverWidth = (coversize || size * 0.4) * image.width / image.height;
				coverHeight = (coversize || size * 0.4);
			}

			// Draw the cover image to the center of QR code
			const context = canvas.getContext('2d');
			context.drawImage(
				image,
				size / 2 - coverWidth / 2,
				size / 2 - coverHeight / 2,
				coverWidth,
				coverHeight
			);
		} catch (error) {
			console.warn(error);
		}
	}

	_dispatchGeneratedEvent() {
		this.dispatchEvent(new CustomEvent('generated', {
			bubbles: false,
			composed: true,
		}));
	}

	async render() {
		const {
			data,
			size,
			margin,
			scale,
			colordark,
			colorlight,
			errorcorrectionlevel,
			cover,
		} = this._getAttributes(HTMLQRCodeImageElement.observedAttributes);

		if (data) {
			const target = this;
			const canvas = document.createElement('canvas');

			// Generate QR code to canvas
			try {
				await qrCodeToCanvas(canvas, data, {
					type: 'png',
					width: Number(size),
					margin: Number(margin),
					scale: Number(scale),
					errorCorrectionLevel: errorcorrectionlevel,
					color: {
						light: colorlight,
						dark: colordark,
					},
				});

				// Add cover image to QR code canvas if needed
				cover && await this._addCoverImage(canvas);

				// Fill to image source
				target.src = canvas.toDataURL();

				this._dispatchGeneratedEvent();
			} catch (error) {
				console.error(error);
			}
		}
	}
}
