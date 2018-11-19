const qrCodeImage = document.querySelector('img');
qrCodeImage.addEventListener('generated', event => {
	console.log(`QR code is ${event.type} at ${(new Date()).toLocaleTimeString()}`);
});

const fields = document.querySelectorAll('[name]');
Array.from(fields).forEach(field => {
	field.addEventListener('input', event => {
		const {
			name,
			value,
		} = event.target;

		switch (name) {
		case 'colorlight':
		case 'colordark': {
			qrCodeImage.setAttribute(name, value + 'ff');
			break;
		}
		case 'cover': {
			const file = event.target.files[0];
			const fileReader = new FileReader();
			fileReader.onload = () => {
				qrCodeImage.setAttribute(name, fileReader.result);
			};
			fileReader.readAsDataURL(file);
			break;
		}
		default: {
			qrCodeImage.setAttribute(name, value);
		}
		}
	}, false);
});
