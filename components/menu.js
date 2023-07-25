import { articles } from "../assets/data.js";
import { routes } from "../assets/main.js";
import { listen, make } from "./core/ire.js";

make({
	name: "i-menu",
	data: {
		menu: articles,
	},
	style: `
    i-menu {
		padding: 0 12px;
        min-height: 300px;
		text-align: right;
    }
    .menu-item {
        display: flex;
		align-items: flex-end;
		margin: .8em 0;
		&:after {
			content: '\\20';
			flex: 1;
			margin: 0 .5em .4em;
			border-bottom: 1px dotted;
			align-self: end;
			opacity: .4;
		}
		&:hover {
			color: crimson;
		}
    }
	.menu-date {
		order: 1;
		opacity: .6;
		font-size: .8em;
		pointer-events: none;
	}
    `,
	template(data) {
		const { menu } = data;

		return menu
			.map((item) => {
				const { name, date, link, year } = item;

				if (year) {
					return `<h4><i>${year}</i></h4>`;
				}

				return `
                    <a class="menu-item" data-link="${link}" data-name="${name}">
                        <b>${name}</b>
                        <i class="menu-date">${date}</i>
                    </a>
                `;
			})
			.join("");
	},
	mounted() {
		listen(this, "click", ".menu-item", async function () {
			const { name } = this.dataset;

			routes.path = `/article/${name}`;
			routes.page = "article";
		});
	},
});
