export class Request {
	#controller = new AbortController();
	#signal = this.#controller.signal;
	#fetching = false;

	async send(url, options) {
		this.#fetching && this.#controller.abort();

		this.#fetching = true;
		const res = await fetch(url, { signal: this.#signal, ...options });
		this.#fetching = false;

		return res;
	}

	abort = this.#controller.abort;
}
