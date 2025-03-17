/**
 * Copyright 2025 Ryan-Mindick
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `github-rpg-contributors`
 * 
 * @demo index.html
 * @element github-rpg-contributors
 */
export class GithubRpgContributors extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "github-rpg-contributors";
  }

  constructor() {
    super();
    this.data = {};
    this.url = ""
    this.loading = false;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("url")) {
      this.data = this.getData(this.url);
    }
  }

  getData(url) {
    this.loading = true;
    return fetch(`https://api.github.com/repos/haxtheweb/webcomponents/contributors`)
      .then((response) => response.json())
      .then((data) => {
        this.data = data.data;
        this.loading = false;
        console.log(this.data);
        return data;
      });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      data: { type: Object },
      url: { type: String },
      title: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: inline-block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--github-rpg-contributors-label-font-size, var(--ddd-font-size-s));
      }

      button {
        padding: 2px;
        border-radius: 10px;
        width: 75px;
        font-family: Comic Sans MS;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3><span>${this.t.title}:</span> ${this.title}</h3>
  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(GithubRpgContributors.tag, GithubRpgContributors);