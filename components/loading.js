import { make } from "./core/ire.js";

make({
	name: "i-loading",
	style: `
	i-loading {
		position: absolute;
		z-index: 1;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		background: inherit;
		color: #212121;
		border-radius: inherit;
		cursor: default;
        font-size: 20px;
        &:before,
        &:after {
            content: "●";
            font-size: 1.6em;
            line-height: 1;
            transform: scale(0);
            transition: all .24s;
        }
        &:before {
            margin: auto -0.5em auto 0;
		    animation: loading 1s linear infinite;
        }
        &:after {
            margin: auto 0 auto -0.5em;
            opacity: 0.5;
            animation: loading 1s linear 0.15s infinite;
        }    
	}
    @keyframes loading {
		50% {
			transform: scale(1);
		}
	}
	`,
	template() {
		return ``;
	},
});
