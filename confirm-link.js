class ConfirmLink extends HTMLAnchorElement {
  /**
   * Called every time the element is inserted into the DOM. Useful for
   * running setup code, such as fetching resources or rendering.
   * Generally, you should try to delay work until this time.
   */
  connectedCallback() {
    this.addEventListener("click", (event) => {
      if (!confirm("Do you really want to leave?")) {
        event.preventDefault();
      }
    });
  }
}

customElements.define("hs-confirm-link", ConfirmLink, { extends: "a" });
