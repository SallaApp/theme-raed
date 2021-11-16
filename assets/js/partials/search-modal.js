// Search Modal Web Component
// Tag: <search-modal>
// Dependencies: Tailwind, AlpineJs

const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
  [x-cloak] {
    display: none;
  }
</style>

<div class="" x-data="$el.parentElement.init()" @keydown.escape="closeSearch" x-init="$watch('searchTerm', () => {search()})">

  <section>
    <button type="button" class="bg-gray-200/10 hover:bg-gray-200/20 transition duration-300 mx-3 text-sm rounded-full w-9 h-9 "
      @click="openSearch">
      <i class="sicon-search font-bold"></i>
    </button>

    <!--Overlay-->
    <div x-cloak class="fixed inset-0 z-50 flex items-top justify-center overflow-auto items-top"
      style="background-color: rgba(0,0,0,0.5)" x-show="showModal">
      <!--Dialog-->
      <div class="bg-transparent w-full">
        <div @click.away="closeSearch" class="mx-auto w-11/12 lg:w-6/12 ">
          <!-- search form -->
          <!-- <form class="mt-36 search-box anime-item "> -->
          <div class="mt-36 search-box anime-item ">
            <div class="relative bg-white rounded-tiny border border-border-color"
              :class="{'rounded-b-none': showResult}">
              <input x-model.debounce.500ms="searchTerm"
                class="anime-item bg-transparent border-0 form-input w-full ps-10 pt-6 pb-7 rounded-tiny text-gray-600"
                type="text" placeholder="ابحث هنا ..." x-ref="searchInput">
              <button x-show="fetchStatus != 'loading'"
                class="anime-item flex justify-end items-cente absolute top-5 start-4 text-md text-gray-text">
                <i class="sicon-search"></i>
              </button>

              <span x-show="fetchStatus === 'loading'"
                class="spinner-loader-wrap absolute top-1/2 transform -translate-y-1/2 start-4 w-4 h-4">
                <span class="block spinner-loader w-4 h-4 animate-spin border-2 border-gray-300 rounded-full"></span>
              </span>
            </div>
          </div>
          <!-- </form> -->

          <!-- result -->
          <div class="m-auto max-h-96  overflow-y-auto bg-white rounded-b-tiny">

            <p x-show="fetchStatus === 'error'" class="error p-4 text-sm text-gray-text">لا يوجد نتائج</p>

            <div class="results">
              <template x-for="(result, index) in results">
                <a href="#" class="block transition-colors duration-300 hover:bg-gray-50 results__item px-4 xs:px-5 py-5 border-t-0"
                  :class="{ 'border-t': index > 0}">
                 
                    <!-- product component -->
                    <div class='product-entry h-full transition duration-500 bg-transparent justify-around overflow-hidden flex'>
                        <!-- image -->
                        <img class="w-16 h-16 object-cover rounded-md" :src="'https://picsum.photos/200/300?random=' + index" alt="product image" />
                         
                        <!-- content -->
                        <div class="flex-1 ps-4 xs:ps-5 pt-1">
                          <div class="flex flex-col justify-start items-baseline">
                            <!-- title -->
                            <h3 class="text-sm font-bold text-title-color leading-1" x-text="result.Title"></h3>
                          </div>
                          <!-- description -->
                          <p class="text-sm text-gray-text leading-1" x-text="result.Type">
                          </p>
                          <div class="w-full flex justify-between items-center">
                            <!-- price -->
                            <h4 class="text-primary font-bold text-sm">‏10,978.00 ر.س</h4>
                          </div>
                        </div>
                    </div>
                    <!-- End::product component -->
                </a>

              </template>
            </div>
          </div>
        </div>
      </div>
      <!--/Dialog -->
    </div><!-- /Overlay -->

  </section>
</div>
`;

export class SearchModal extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true));
  }

  init() {
    return {
      results: [],
      showModal: false,
      fetchStatus: '',
      showResult: false,
      searchTerm: '',
      animatItems: function () {
        var animatedItems = document.querySelectorAll('.anime-item');
        anime({
          targets: animatedItems,
          opacity: [0, 1],
          translateY: [30, 0],
          delay: function (el, i) {
            return i * 75;
          },
        });
      },
      openSearch: function (e) {
        this.searchTerm = '';
        this.fetchStatus = '';
        this.results = [];
        this.showModal = true;
        window.scrollTo(0, 0);
        document.getElementsByTagName('html')[0].style.position = "fixed";
        document.getElementsByTagName('html')[0].style.overflowY = "scroll";
        document.getElementsByTagName('body')[0].classList.add('s-modal-open');
        this.$nextTick(() => { this.$refs.searchInput.focus(); });
        this.animatItems();
      },
      closeSearch: function (e) {
        this.searchTerm = '';
        this.fetchStatus = '';
        this.results = [];
        document.getElementsByTagName('html')[0].style.position = "static";
        document.getElementsByTagName('html')[0].style.overflowY = "auto";
        document.getElementsByTagName('body')[0].classList.remove('s-modal-open');
        this.showModal = false;
      },
      search: function () {
        this.fetchStatus = 'loading'
        this.showResult = false;
        this.results = []
        fetch(
          "https://www.omdbapi.com/?&apikey=e1a73560&s=" + this.searchTerm + "&type=movie"
        )
          .then((response) => response.json())
          .then((response) => {
            this.fetchStatus = 'idle'
            this.results = response.Search
            this.showResult = true;
            if (this.results.length < 1) {
              this.fetchStatus = 'error'
            }
          })
          .catch((err) => {
            this.showResult = true;
            this.fetchStatus = 'error'
            console.log(err)
          });
      },
    };
  }
}

customElements.define('search-modal', SearchModal)