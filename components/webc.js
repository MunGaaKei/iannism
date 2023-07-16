export function proxy(element, data) {
	return new Proxy(data, {
		get(tar, key) {
			return Reflect.get(tar, key);
		},
		set(tar, key, val) {
			Reflect.set(tar, key, val);
			element.format?.(tar);
			return true;
		},
	});
}

function registStyle(text) {
	const style = document.createElement("style");
	style.innerHTML = text;
	document.head?.append(style);
}

export function make(options) {
	const {
		name,
		data,
		template = () => "",
		style,
		baseElement = HTMLElement,
	} = options;

	customElements.define(
		name,
		class extends baseElement {
			constructor() {
				super();

				if (data) {
					this.data = proxy(this, data);
				}

				customElements.get(name) && registStyle(style);

				this.format();
			}

			format() {
				this.innerHTML = template.call(this, this.data);
			}
		}
	);
}
