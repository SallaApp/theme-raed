/*!
 * Crafted with ❤ by Salla
 */
import { Host, h } from "@stencil/core";
import mobile from "../../assets/svg/iphone.svg";
import whatsapp from "../../assets/svg/whatsapp2.svg";
import phone from "../../assets/svg/phone.svg";
import telegram from "../../assets/svg/paper-plane-o.svg";
import email from "../../assets/svg/mail.svg";
/**
 * @slot contact - Replaces contact item, has replaceable props `{icon}`, `{value}`.
 */
export class SallaContacts {
    constructor() {
        this.contacts = salla.config.get('store.contacts');
        this.iconsList = { mobile, whatsapp, phone, telegram, email };
        this.contactSlot = this.host.querySelector('[slot="contact"]')?.innerHTML || `<a href={link} class="s-contacts-item"><span class="s-contacts-icon">{icon}</span>${!this.iconsOnly && "<span class='unicode'>{value}</span>"}</a>`;
        salla.onReady(() => {
            this.contacts = salla.config.get('store.contacts');
        });
        salla.lang.onLoaded(() => {
            this.contactsTitle = this.contactsTitle || salla.lang.get('blocks.footer.social');
        });
    }
    getContactsArray() {
        return Object.entries(this.contacts)
            .filter(([_key, value]) => value !== '')
            .map(([type, value]) => ({ type, value }));
    }
    getContactLink(type) {
        const contactValue = this.contacts[type];
        switch (type) {
            case 'phone':
            case 'mobile':
                return `tel:${contactValue}`;
            case 'whatsapp':
                const whatsAppNumber = (contactValue || '').toString().replace(/[^\d]/g, '');
                return whatsAppNumber ? `https://wa.me/${whatsAppNumber}` : salla.url.get('whatsapp/send');
            case 'email':
                return `mailto:${contactValue}`;
            case 'telegram':
                // Check if the contact is already a full URL
                return contactValue.startsWith('https://t.me/') ? contactValue : `https://t.me/${contactValue}`;
            default:
                return contactValue;
        }
    }
    getContactIcon(type) {
        return this.iconsList[type];
    }
    componentWillLoad() {
        return new Promise(resolve => salla.onReady(resolve));
    }
    render() {
        const contactsArray = this.getContactsArray();
        if (!contactsArray || contactsArray.length == 0) {
            return;
        }
        if (this.isHeader) {
            return (h(Host, { class: "s-contacts s-contacts-header" }, contactsArray.filter((contact) => contact.type == 'phone' || contact.type == 'email').map((contact, index) => (h("a", { href: this.getContactLink(contact.type), key: index, class: "s-contacts-topnav-link" }, contact.type === 'email' ? (contact.value) : ([
                h("span", null, this.contactsTitle, ": "),
                h("a", { class: "unicode", href: this.iconsList[contact.type] }, contact.value)
            ]))))));
        }
        return (h(Host, { class: "s-contacts" }, !this.hideTitle && h("h3", { class: "s-contacts-title" }, this.contactsTitle), h("div", { class: {
                's-contacts-list': true,
                's-contacts-list-horizontal': this.horizontal,
                's-contacts-list-vertical': !this.horizontal,
                's-contacts-list-icons-only': this.iconsOnly
            } }, contactsArray.map((contact, index) => (h("div", { key: index, id: "contact-slot", innerHTML: this.contactSlot
                .replace(/\{icon\}/g, this.getContactIcon(contact.type))
                .replace(/\{value\}/g, contact.value.toString())
                .replace(/\{link\}/g, this.getContactLink(contact.type)) }))))));
    }
    componentDidRender() {
        // this.host.querySelectorAll('#contact-slot').forEach(el => el.replaceWith(el.firstChild));
        this.host.querySelector('[slot="contact"]')?.remove();
    }
    static get is() { return "salla-contacts"; }
    static get originalStyleUrls() {
        return {
            "$": ["salla-contacts.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["salla-contacts.css"]
        };
    }
    static get properties() {
        return {
            "contactsTitle": {
                "type": "string",
                "attribute": "contacts-title",
                "mutable": true,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Section title for social block of footer."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "hideTitle": {
                "type": "boolean",
                "attribute": "hide-title",
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
                    "text": "Flag to toggle title visibility."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "isHeader": {
                "type": "boolean",
                "attribute": "is-header",
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
                    "text": "Conditional flag to check whether the content is header or not."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "horizontal": {
                "type": "boolean",
                "attribute": "horizontal",
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
                    "text": "Flag to toggle list of contents whether vertical or horizontal."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "iconsOnly": {
                "type": "boolean",
                "attribute": "icons-only",
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
                    "text": "Flag condition to show icon only or icon with label"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get states() {
        return {
            "contacts": {},
            "iconsList": {}
        };
    }
    static get elementRef() { return "host"; }
}
