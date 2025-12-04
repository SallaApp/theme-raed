/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
import Star2 from "../../assets/svg/star2.svg";
import Helper from "../../Helpers/Helper";
export class SallaRatingStars {
    constructor() {
        this.translationsLoaded = false;
        this.labels = [];
        this.reviewLabel = '';
        this.selectedStar = 0;
        /**
       * Sets input name.
       */
        this.name = 'rating';
        /**
        * Sets the height and width of the component. Defaults to medium.
        */
        this.size = 'medium';
        /**
       * Number of reviews to display.
       */
        this.reviews = 0;
        /**
        * Allows the rating to be editable.
        */
        this.editable = false;
    }
    async componentWillLoad() {
        await new Promise(resolve => {
            salla.lang.onLoaded(() => {
                this.labels = [
                    salla.lang.get('pages.rating.poor'),
                    salla.lang.get('pages.rating.average'),
                    salla.lang.get('pages.rating.good'),
                    salla.lang.get('pages.rating.very_good'),
                    salla.lang.get('pages.rating.excellent')
                ];
                if (this.value && this.withLabel) {
                    this.reviewLabel = this.labels[this.value - 1];
                }
                if (this.reviewsElement) {
                    this.reviewsElement.innerText = `(${salla.helpers.number(salla.lang.choice('pages.rating.reviews', this.reviews))})`;
                }
                this.translationsLoaded = true;
                resolve();
            });
        });
    }
    initiateRating() {
        this.host.addEventListener('click', this.handleRating.bind(this));
    }
    handleRating() {
        if (!this.starsElem)
            return;
        let activeStars = this.starsElem.querySelectorAll('.s-rating-stars-hovered');
        let selected = activeStars[activeStars.length - 1];
        if (!selected)
            return;
        let selectedIndex = parseInt(selected.getAttribute('data-star'));
        this.starsElem.querySelector('.rating_hidden_input').value = selectedIndex.toString();
        this.starsElem.querySelectorAll('.s-rating-stars-btn-star')
            .forEach((star, index) => Helper.toggleElementClassIf(star, 's-rating-stars-selected', 's-rating-stars-unselected', () => index < selectedIndex));
        this.starsElem.querySelectorAll('[aria-pressed]').forEach(star => star.removeAttribute('aria-pressed'));
        selected.setAttribute('aria-pressed', 'true');
        this.selectedStar = selectedIndex;
        this.withLabel && (this.reviewLabel = this.labels[selectedIndex - 1]);
    }
    triggerRatingProgrammatically(index) {
        if (!this.starsElem)
            return;
        const stars = this.starsElem.querySelectorAll('.s-rating-stars-btn-star');
        if (stars && index >= 0 && index <= stars.length) {
            // Simulate the hovering effect
            stars.forEach((s, i) => {
                s.classList.toggle('s-rating-stars-hovered', i <= index);
            });
            // Trigger the same logic as clicking
            this.handleRating();
        }
    }
    highlightSelectedStars() {
        let hoveredClass = 's-rating-stars-hovered', stars = this.starsElem?.querySelectorAll('.s-rating-stars-btn-star');
        stars?.forEach((star, index) => {
            star.addEventListener('mouseover', () => {
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.add(hoveredClass);
                }
                this.withLabel && (this.reviewLabel = this.labels[index]);
            });
            star.addEventListener('mouseout', () => {
                star.classList.remove(hoveredClass);
                this.withLabel && (this.reviewLabel = this.selectedStar ? this.labels[this.selectedStar - 1] : '');
            });
        });
        this.starsElem?.addEventListener('mouseout', () => stars.forEach(star => star.classList.remove(hoveredClass)));
    }
    createStars(n) {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(h("span", { class: {
                    's-rating-stars-btn-star': true,
                    ['s-rating-stars-' + this.size]: true,
                    's-rating-stars-selected': i < n
                }, innerHTML: Star2 }));
        }
        if (this.reviews > 0) {
            stars.push(h("span", { class: "s-rating-stars-reviews", ref: el => this.reviewsElement = el }, "(", salla.helpers.number(salla.lang.choice('pages.rating.reviews', this.reviews)), ")"));
        }
        return stars;
    }
    render() {
        return this.translationsLoaded ? (this.host.closest('.swiper-slide')?.classList.contains('swiper-slide-duplicate')
            ? ''
            : (h(Host, null, (this.value || this.value == 0) && !this.editable ?
                h("div", { class: "s-rating-stars-wrapper" }, this.createStars(this.value), this.withLabel && this.reviewLabel ? h("span", { class: "s-rating-stars-label" }, this.reviewLabel) : '')
                :
                    h("div", { class: "s-rating-stars-wrapper" }, h("div", { class: "s-rating-stars-element", ref: (el) => this.starsElem = el }, h("input", { type: "hidden", class: "rating_hidden_input", name: this.name, value: "" }), [1, 2, 3, 4, 5].map(star => h("button", { class: `s-rating-stars-btn-star s-rating-stars-` + this.size, "data-star": star }, h("span", { innerHTML: Star2 })))), this.withLabel && this.reviewLabel ? h("span", { class: "s-rating-stars-label" }, this.reviewLabel) : '')))) : (h(Host, null));
    }
    componentDidLoad() {
        this.initiateRating();
        this.highlightSelectedStars();
        if (this.value && this.editable) {
            const stars = this.starsElem?.querySelectorAll('.s-rating-stars-btn-star');
            if (stars && this.value >= 0 && this.value <= stars.length) {
                this.triggerRatingProgrammatically(this.value - 1);
            }
        }
    }
    static get is() { return "salla-rating-stars"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-rating-stars.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-rating-stars.css"]
        };
    }
    static get properties() {
        return {
            "name": {
                "type": "string",
                "attribute": "name",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Sets input name."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'rating'"
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "\"large\" | \"medium\" | \"small\" | \"mini\"",
                    "resolved": "\"large\" | \"medium\" | \"mini\" | \"small\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Sets the height and width of the component. Defaults to medium."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'medium'"
            },
            "value": {
                "type": "number",
                "attribute": "value",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The rating value."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "reviews": {
                "type": "number",
                "attribute": "reviews",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Number of reviews to display."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "0"
            },
            "withLabel": {
                "type": "boolean",
                "attribute": "with-label",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Show the description label."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "editable": {
                "type": "boolean",
                "attribute": "editable",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Allows the rating to be editable."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "translationsLoaded": {},
            "labels": {},
            "reviewLabel": {},
            "selectedStar": {}
        };
    }
    static get elementRef() { return "host"; }
}
