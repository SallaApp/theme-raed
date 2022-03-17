// SizesTable  Web Component
// Tag: <sizes-table>
// Dependencies: Tailwind, AlpineJs

// todo :: remove it and move it to web component pacakge
const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
    .sizesTable{
        min-width: 100%;
    }

    .sizesTable td,
    .sizesTable th {
        border: 1px solid #EEEEEE;
        padding: 20px 10px;
    }

    .sizesTable tr:nth-child(odd) {
        background-color: #FAFAFA;
    }

    .sizesTable th {
        padding-top: 12px;
        padding-bottom: 12px;
        font-size: 13px;
        font-weight: normal;
        text-align: center;
        background-color: #FAFAFA;
    }
</style>

<div x-data="$el.parentElement.initSizesTable()">
    <section class="bg-white p-5 rounded-md mb-5 flex space-s-10 items-center justify-between">
        <div class="text-sm max-w-xs">
            <h2 class="font-bold mb-2"> جدول القياسات </h2>
        </div>
        <button type="button" @click="openSizesTableModal()"
            class=" text-primary bg-transparent py-2 flex items-center justify-center text-sm">
            <span class="fix-align">عرض دليل القياسات</span>
            <i class="font-medium sicon-caret-left ms-1.5 text-md"></i>
        </button>
    </section>
    <!-- modal -->
    <!-- Modal panel, show/hide based on modal state.-->
    <div x-show="sizesTableModal" class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!-- Background overlay, show/hide based on modal state. -->
            <div x-show="sizesTableModal" x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
                x-transition:leave="transition ease-in duration-200" x-transition:leave-start="opacity-100 "
                x-transition:leave-end="opacity-0" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"></div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <!-- Modal panel, show/hide based on modal state.-->
            <div x-show="sizesTableModal" @click.away="closeSizesTableModal" x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
                x-transition:leave="transition ease-in duration-200"
                x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
                x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                class="inline-block align-bottom bg-white p-3 md:p-8 rounded-md  shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full sm:max-w-xl md:max-w-3xl">

                <div class="modal-body text-start">
                    <button @click="closeSizesTableModal"
                        class="close-modal text-gray-400 w-6 h-6  text-lg absolute top-6 end-6">
                        <i class="sicon-cancel"></i>
                    </button>
                    <!-- content -->
                    <h2 class="text-sm font-bold mb-7">جدول المقاسات</h2>
                    <!-- tabs -->
                    <div>
                        <div class="sm:hidden">
                            <label for="tabs" class="sr-only">Select a tab</label>
                            <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
                            <select id="tabs" name="tabs"  x-model="currentTab" @change="switchTabs(selectedTab)"
                                class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                                <template x-for="tab in tabs">
                                    <option :key="tab.name" :selected="currentTab == tab.id" :value="tab.id" x-text="tab.name">
                                    </option>
                                </template>
                            </select>
                        </div>
                        <div class="hidden sm:block">
                            <nav class="flex space-x-4 bg-light-gray rounded-md" aria-label="Tabs">
                                <template x-for="tab in tabs">

                                    <a @click="switchTabs(tab.id)" :key="tab.name"
                                        class="px-4 cursor-pointer py-2.5 font-medium text-sm rounded-md transition-colors"
                                        :class="currentTab == tab.id ? 'bg-primary text-reverse' : 'text-gray-500 hover:text-gray-700'"
                                        :aria-current="currentTab == 'tab.id' ? 'page' : undefined">
                                        <i class="sicon-t-shirt"></i>
                                        <span x-text="tab.name"></span>
                                    </a>
                                </template>
                            </nav>
                        </div>

                        <!-- tabs contents -->
                        <template x-for="tab in tabs">
                            <div x-show="currentTab == tab.id" class="py-8">
                                <p class="mb-4">
                                    <span x-text="tab.name" class="text-primary"></span>
                                    جدول المقاسات بالكيلو من خلال موقع فكرة ان مهمة اختيار المقاس المناسب فى الملابس تعد
                                    من المهمات الصعبة التي تطلب التركيز حتي لا تختار قطعة ملابس غير مناسبة لك وخصوصا ان
                                    كنت تقوم بالشراء بشكل الكتروني
                                </p>

                                <!-- table -->
                                <div class="flex flex-col mb-4">
                                    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                            <div class="overflow-hidden">
                                                <table class="sizesTable">
                                                    <thead class="bg-gray-50">
                                                        <tr>
                                                            <th scope="col">
                                                                عنوان الجدول
                                                            </th>
                                                            <th scope="col">
                                                                عنوان الجدول
                                                            </th>
                                                            <th scope="col">
                                                                عنوان الجدول
                                                            </th>
                                                            <th scope="col">
                                                                عنوان الجدول
                                                            </th>
                                                            <th scope="col">
                                                                عنوان الجدول
                                                            </th>
                                                            <th scope="col">
                                                                عنوان الجدول
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <template x-for="(row, personIdx) in rows">
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                        </template>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- end::table -->
                                <p>المقاسات تختلف باختلاف الدول وكذلك الشركات والماركات</p>
                            </div>
                        </template>
                    </div>

                    <!-- buttons -->
                    <button type="button" class="w-full h-10 px-8 btn btn--primary"> حفظ </button>
                </div>
            </div>
        </div>
    </div>
</div>
`;

export class SizesTable extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true));
    this.productId = this.getAttribute('product-id');
    //console.log(this.productId);
  }

  initSizesTable() {
    return {
      sizesTableModal: false,
      currentTab: 'tab2',
      tabs: [
        { name: 'الجدول الأول', href: '#', id: 'tab1' },
        { name: 'الجدول الثاني', href: '#', id: 'tab2' },
        { name: 'الجدول الثالث ', href: '#', id: 'tab3' },
        { name: 'الجدول الرابع', href: '#', id: 'tab4' },
        { name: 'الجدول الخامس', href: '#', id: 'tab5' },
      ],
      rows: [
        { name: '', title: '', size: '', count: '' },
        { name: '', title: '', size: '', count: '' },
        { name: '', title: '', size: '', count: '' },
        { name: '', title: '', size: '', count: '' },
        { name: '', title: '', size: '', count: '' }
      ],
      openSizesTableModal: function () {
        this.sizesTableModal = true
      },
      closeSizesTableModal: function () {
        this.sizesTableModal = false;
      },
      switchTabs(tabId) {
        this.currentTab = tabId
      }
    }
  }
}

customElements.define('sizes-table', SizesTable)
