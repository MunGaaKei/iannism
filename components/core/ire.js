export function make(options) {
	const {
		name,
		data,
		template = () => "",
		style,
		extend = HTMLElement,
		mounted,
		unMounted,
		watch = {},
	} = options;

	customElements.define(
		name,
		class extends extend {
			constructor() {
				super();

				if (data) {
					this.data = proxy(this, data);
				}

				this.render();
			}

			static get observedAttributes() {
				return Object.keys(watch);
			}

			render() {
				const tpl = document.createElement("template");

				cacheSlots(this);
				tpl.innerHTML = template.call(this, this.data);
				compileSlots(this, tpl);
				this.innerHTML = tpl.innerHTML;
			}

			connectedCallback() {
				style && insertStyle(style, name);

				mounted && mounted.call(this);
			}

			disconnectedCallback() {
				this.clearMemory();

				unMounted && unMounted.call(this);
			}

			attributeChangedCallback(name, val, newVal) {
				if (val === newVal) return;

				watch[name]?.();
				this.render();
			}

			clearMemory() {
				this.slots?.clear();
			}
		}
	);
}

export function proxy(element, data) {
	return new Proxy(data, {
		get(tar, key) {
			return Reflect.get(tar, key);
		},
		set(tar, key, val) {
			Reflect.set(tar, key, val);
			element.render?.(tar);
			return true;
		},
	});
}

function insertStyle(text, name) {
	const tag = "ire";
	const style = document.querySelector(`style[${tag}="${name}"]`);
	if (style) return;

	const div = document.createElement("style");
	div.setAttribute(tag, name);
	div.innerHTML = text;
	document.head?.append(div);
}

function compileSlots(element, template) {
	const holders = template.content.querySelectorAll("slot");
	const maps = element.slots ?? new Map();

	holders.forEach((holder) => {
		const name = holder.name || "default";
		const content = maps.get(name) || [];

		holder.replaceWith(...content);
	});
}

function cacheSlots(element) {
	if (element.slots) return;

	const map = new Map();

	Array.from(element.childNodes).map((node) => {
		if (node.nodeType === 3) {
			const nodes = map.get("default") || [];
			nodes.push(node);
			map.set("default", nodes);
			return;
		}

		const name = node.getAttribute("slot") || "default";
		const nodes = map.get(name) || [];

		nodes.push(node);
		map.set(name, nodes);
	});

	element.slots = map;
}

export function listen(element, event, selector, fn, options = {}) {
	const events = element.events || {};
	let handlers = events[event];

	if (handlers) {
		const callbacks = handlers.get(selector) || [];
		callbacks.push(fn);
		handlers.set(selector, callbacks);
	} else {
		handlers = new Map();
		handlers.set(selector, [fn]);

		element.addEventListener(event, (e) => {
			let tar = e.target;

			while (tar !== element) {
				for (const [select, callbacks] of handlers.entries()) {
					tar.matches(select) &&
						callbacks.map((fn) => fn.call(tar, e));
				}

				tar = tar.parentNode;
			}
		});
	}

	events[event] = handlers;
	element.events = events;
}
