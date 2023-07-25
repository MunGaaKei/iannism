import { make } from "./core/ire.js";
import "./loading.js";

make({
	name: "i-article",
	data: {
		loading: true,
		text: "",
	},
	style: `
	i-article {
		position: relative;
		min-height: 400px;
		padding: 0 12px;
		letter-spacing: .04rem;
		&.content {
			justify-content: unset;
			flex-shrink: unset;
		}
		& h3 {
			margin: 2em 0 1em;
		}
		& p {
			margin: .5em 0;
		}
		& img {
			margin: .5em 0;
			border-radius: 4px;
		}
		&:after {
			content: '\\20';
			height: 80px;
			flex-shrink: 0;
		}
	}
	`,
	template() {
		const { loading, text } = this.data;

		return `${loading ? "<i-loading></i-loading>" : text}`;
	},
});
