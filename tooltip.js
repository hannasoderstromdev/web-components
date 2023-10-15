class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipIcon;
    this._tooltipText;
    this._tooltipVisible = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: relative;
        }

        div {
          font-weight: normal;
          background-color: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
        }

        .icon {
          font-weight: bold;
          background: black;
          color: white;
          padding: 0.15rem 0.5rem;
          text-align: center;
          border-radius: 50%;
        }
      </style>
      <slot>Put the text inside the element which you want a tooltip on</slot>
      <span class="icon">?</span>
    `;
  }

  // Native Life Cycle Events
  connectedCallback() {
    // DOM Initialization
    this._tooltipText =
      this.getAttribute("text").length > 0
        ? this.getAttribute("text")
        : "Set the text attribute to show as tooltip";
    this._tooltipIcon = this.shadowRoot.querySelector("span");
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );
    this.shadowRoot.appendChild(this._tooltipIcon);
    this._render();
  }

  disconnectedCallback() {
    // Cleanup after component is terminated
    this.shadowRoot.removeEventListener("mouseenter", this._showTooltip);
    this.shadowRoot.removeEventListener("mouseleave", this._hideTooltip);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // Attributes changed, update Data + DOM
    if (oldValue === newValue) {
      return;
    }
    if (name === "text") {
      this._tooltipText = newValue;
    }
  }

  // Native method
  static get observedAttributes() {
    return ["text"];
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector("div");

    if (this._tooltipVisible) {
      tooltipContainer = document.createElement("div");

      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
      }
    }
  }
}

customElements.define("hs-tooltip", Tooltip);
