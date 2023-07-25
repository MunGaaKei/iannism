import { photos } from "../assets/data.js";
import { lazyload } from "../assets/util.js";
import { make } from "./core/ire.js";

function renderImage(item) {
	const { year, imgs, date } = item;

	if (year) {
		return `<h3 class="photo-year">${year}</h3>`;
	}

	const ANGLE = 8;
	const base = Math.floor(imgs.length / 2) * -ANGLE - ANGLE;

	return `
    <div class="photo-item">
        <i class="photo-date">${date}</i>
        ${imgs
			.map(
				(img, i) =>
					`<img data-src="${img}" class="lazyload" style="transform: rotate(${
						base + i * ANGLE
					}deg)"/>`
			)
			.join("")}
    </div>
    `;
}

make({
	name: "i-photos",
	style: `
    i-photos {
        padding: 40px 12px;
        scrollbar-width: none;
        overflow: auto;
        &::-webkit-scrollbar {
            display: none;
        } 
    }
    .photo-list {
        margin-left: calc(50vw - 372px);
        display: flex;
        gap: 80px;
        &:after {
            content: '\\20';
            display: block;
            width: calc(50vw - 452px);
            flex-shrink: 0;
        }
    }
    .photo-item {
        position: relative;
        height: 250px;
        width: 250px;
        flex-shrink: 0;
        > img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
            transition: all .24s;
            background: rgba(233,233,233,.5);
            box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.25);
            &:hover {
                filter: brightness(1.2);
                z-index: 1;
            }
        }
    }
    .photo-year {
        margin: 0 1em;
        font-style: italic;
        opacity: .6;
        align-self: flex-end;
    }
    .photo-date {
        position: absolute;
        z-index: 2;
        left: 0;
        bottom: 0;
        padding: 0 8px;
        background: rgba(255,255,255,.6);
        backdrop-filter: blur(24px);
        border-radius: 4px;
    }
    @media (max-width: 744px) {
        .photo-list {
            margin-left: 0;
            &:after {
                width: 1px;
            }
        }
    }
    `,
	template() {
		return `
        <div class="photo-list">
            ${photos.map(renderImage).join("")}
        </div>
        `;
	},
	mounted() {
		lazyload(this);

		this.addEventListener("mousewheel", (e) => {
			this.scrollBy({
				left: e.deltaY + e.deltaX,
			});
		});
	},
});
