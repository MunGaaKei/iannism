import { make } from "./webc.js";

make({
	name: "i-header",
	style: `
    .header {
        padding-block: 12px;
        margin-bottom: 2em;
        position: sticky;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(8px);
    }
    `,
	template() {
		const { title } = this.dataset;

		return `<header class="header">
            <h2>${title}</h2>
            <a class="icon" data-close="articles">
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
            </a>
        </header>`;
	},
});
