import { make } from "./webc.js";

make({
	name: "i-menu",
	data: [
		{
			name: "文章 1",
			date: "Feb 12",
			link: "./articles/a.html",
		},
		{
			name: "文章 2",
			date: "Jan 2",
			link: "./articles/a.md",
		},
	],
	style: `
    i-menu {
        min-height: 300px;
    }
    .menu-item {
        display: flex;
    }
    `,
	template() {
		return this.data
			.map((item) => {
				const { name, date, link } = item;

				return `
                    <a class="menu-item">
                        ${name}
                        <i>${date}</i>
                    </a>
                `;
			})
			.join("");
	},
});
