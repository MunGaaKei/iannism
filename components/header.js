import { make } from "./core/ire.js";

make({
	name: "i-header",
	style: `
    i-header {
        margin: 0 auto 2em;
        padding: 12px;
        width: 720px;
        max-width: 100%;
        position: sticky;
        z-index: 1;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(24px);
    }
    `,
	template() {
		const { title, refer } = this.dataset;

		return `
            <h2>${title}</h2>
            <a class="icon link" data-open="${refer}">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M9 13L5 9l4-4M5 9h11a4 4 0 0 1 0 8h-1"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    ></path>
                </svg>
            </a>`;
	},
	watch: {
		"data-title": () => {},
	},
});
