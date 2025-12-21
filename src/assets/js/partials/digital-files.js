class DigitalFilesSettings extends HTMLElement {
  connectedCallback() {
    this.settings = JSON.parse(this.getAttribute("settings") || "{}");
    if (window.app?.status === "ready") {
      this.onReady();
    } else {
      document.addEventListener("theme::ready", () => this.onReady());
    }
  }

  onReady() {
    salla.lang.onLoaded(() => {
      this.render();
    });
  }

  render() {
    if (!this.settings || Object.keys(this.settings).length === 0) {
      this.innerHTML = "";
      return;
    }

    const trans = (key) => salla.lang.get(key);
    const formats = Array.isArray(this.settings.formats)
      ? this.settings.formats.join(", ")
      : this.settings.formats || "-";

    this.innerHTML = `
            <section class="bg-white p-5 rounded-md mb-5 last:mb-0">
                <ul class="space-y-4">
                    <li class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <i class="sicon-page"></i>
                            <div class="text-gray-600 text-sm">${trans(
                              "pages.products.number_of_files"
                            )}</div>
                        </div>
                        <div class="text-gray-900">${
                          this.settings.count || "-"
                        }</div>
                    </li>
                    <li class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <i class="sicon-file-archive"></i>
                            <div class="text-gray-600 text-sm">${trans(
                              "pages.products.file_formats"
                            )}</div>
                        </div>
                        <div class="text-gray-900 text-sm">${formats}</div>
                    </li>
                    <li class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <i class="sicon-calendar"></i>
                            <div class="text-gray-600 text-sm">${trans(
                              "pages.products.file_expiration_period"
                            )}</div>
                        </div>
                        <div class="text-gray-900 text-sm">${
                          this.settings.download_period || "-"
                        }</div>
                    </li>
                    ${this.accessFileList()}
                </ul>
            </section>
        `;
  }

  accessFileList() {
    if (!this.settings.access_new_files) {
      return "";
    }

    const trans = (key) => salla.lang.get(key);
    return `
        <li class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="sicon-rotate"></i>
                <div class="text-gray-600 text-sm">${trans(
                  "pages.products.free_access_to_new_files"
                )}</div>
            </div>
            <div class="text-gray-900 text-sm">
                <i class="sicon-check-circle text-lg"></i>
            </div>
        </li>
    `;
  }
}

customElements.define("digital-files-settings", DigitalFilesSettings);
