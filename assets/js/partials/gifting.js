// Gifting  Web Component
// Tag: <gifting-modal>
// Dependencies: Tailwind, AlpineJs, intl-tel-input, swiper-slider, animejs

const template = document.createElement('template');
template.innerHTML = /*html*/`
<style>
[x-cloak] {
  display: none;
}
  :root {
     --swiper-navigation-size: '38px;'
  }
</style>

<div x-data="$el.parentElement.init()">
    <section class="bg-white p-5 rounded-md mb-5 flex space-s-10 items-center justify-between">
        <div class="text-sm max-w-xs">
            <h2 class="font-bold mb-2">اهدي من تحب</h2>
            <p class="text-gray-text">يمكن الان ارسال الهدايا لمن تحب عن طريق منصتنا وفي الوقت الذي تحبه ! </p>
        </div>
        <button type="button" @click="openGiftingModal()"
            class=" text-gray-text bg-gray-bg  py-2 xs:px-8 rounded-md flex items-center justify-center text-sm">
            <i class="font-medium sicon-gift-sharing me-1.5 text-md"></i>
            <span class="fix-align">ارسل كهدية</span>
        </button>
    </section>
    <!-- modal -->
    <!-- Modal panel, show/hide based on modal state.-->
    <div x-show="giftingModal" class="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
        aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!-- Background overlay, show/hide based on modal state. -->
            <div x-show="giftingModal" x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100"
                x-transition:leave="transition ease-in duration-200" x-transition:leave-start="opacity-100 "
                x-transition:leave-end="opacity-0" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"></div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <!-- Modal panel, show/hide based on modal state.-->
            <!-- @click.away="closeGiftingModal" -->
            <div x-show="giftingModal" x-transition:enter="transition ease-out duration-300"
                x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100"
                x-transition:leave="transition ease-in duration-200"
                x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100"
                x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                class="inline-block align-bottom bg-white  p-3 md:p-8 rounded-md   shadow-xl transform transition-all sm:my-8 sm:align-middle  w-full sm:max-w-xl">

                <div class="modal-body text-start">
                    <button @click="closeGiftingModal"
                        class="close-modal text-gray-text w-6 h-6  text-lg absolute top-6 end-6">
                        <i class="sicon-cancel"></i>
                    </button>

                    <div class="flex justify-center mt-2.5 mb-5">
                        <div
                            class=" bg-white text-xl text-text-dark border w-20 h-20 border-border-color rounded-icon ">
                            <i class="sicon-gift-sharing"></i>
                        </div>
                    </div>

                    <!-- step1 -->
                    <!-- title -->
                    <div class="relative text-center mb-5">
                        <div class="relative z-10 bg-white rounded-full inline-flex items-center space-s-2.5 px-5">
                            <div class="bg-border-color px-2.5 pb-1 rounded-full  font-bold text-xs"
                                x-text="stepsTitle[currentStep].count">1/2</div>
                            <h2 x-text="stepsTitle[currentStep].title"></h2>
                        </div>
                        <div class="absolute top-4 h-0.5 w-full bg-border-color"></div>
                    </div>

                    <!-- step1 -->
                    <section x-show="currentStep == 'step1'" x-transition:enter="transition ease-out duration-300"
                        x-transition:enter-start="opacity-0 transform scale-90"
                        x-transition:enter-end="opacity-100 transform scale-100">
                        <!-- image -->
                        <div class="mb-2.5 opacity-0 common-anime">
                            <h3 class="text-sm mb-2.5">اختر صورة</h3>
                            
                            <div
                                class="relative h-64 bg-color-gray rounded-md border-border-color">
                                <div x-show="showSelectedImage" x-transition:enter="transition ease-out duration-500"
                                    x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100">
                                    <img :src="selectedImage" class="w-full h-full object-cover rounded-md" alt="Gift Image">

                                    <button @click="showSelectedImage = false; selectedImageId = null"
                                        class="remove-image bg-theme-red text-xxs flex justify-center items-center rounded-full  text-light-gray w-4 h-4  text-lg absolute top-2.5 end-2.5">
                                        <i class="sicon-cancel"></i>
                                    </button>
                                </div>
                                <div x-show="!showSelectedImage" class="w-full gifting-image">
                                    <input type="file">
                                </div>
                            </div>
                        </div>
                        
                        <!-- slider -->
                        <div class="swiper gifting-slider mb-5 common-anime opacity-0">
                            <div class="swiper-wrapper">
                                <template
                                    x-for="imageId in [1072, 109, 112, 128, 113, 139, 140, 143, 1057, 1060, 1061, 1068, 1067]">
                                    <div class="swiper-slide rounded-md overflow-hidden cursor-pointer  h-24 w-10/12 md:w-auto">
                                        <span x-show="selectedImageId == imageId"
                                            x-transition:enter="transition ease-out duration-300"
                                            x-transition:enter-start="opacity-0 transform scale-50"
                                            x-transition:enter-end="opacity-100 transform scale-100"
                                            class="bg-white text-xxs flex items-center justify-center w-4 h-4 rounded-full absolute z-10 top-2.5 end-2.5">
                                            <i class="sicon-check"></i></span>
                                        <!-- overlay -->
                                        <div x-show="selectedImageId == imageId"
                                            class="overlay absolute top-0 z-0 bg-dark opacity-30  w-full h-full"></div>
                                        <img :src="'https://picsum.photos/id/' + imageId + '/600/300'"
                                            @click="selectedImage = $event.target.getAttribute('src'); selectedImageId= imageId; showSelectedImage =  true"
                                            class="object-cover h-full w-full" title="اسم المنتج" alt="صورة المنتج" />
                                    </div>
                                </template>
                            </div>
                            <!-- If we need navigation buttons -->
                            <div
                                class="w-5 h-5 start-1 text-xxs text-white font-bold shadow-sm bg-black bg-opacity-50 swiper-button-prev rounded-full">
                            </div>
                            <div
                                class="w-5 h-5 end-1 text-xxs  text-white font-bold shadow-sm bg-black bg-opacity-50 swiper-button-next rounded-full">
                            </div>
                        </div>

                        <!-- gifting message -->
                        <div class="opacity-0 common-anime">
                            <div class="text-sm">
                                <label for="gift-message" class="form-label mb-2">
                                    اختر نص الإهداء
                                </label>
                                <select id="gift-message" @change="selectedMessageChanged()"
                                    x-model="giftData.selectedMessage" class="form-input appearance-none mb-2.5">
                                    <option value="message1">كل عام وأنتم بخير ♡ </option>
                                    <option value="message2">تقبل الله طاعتكم</option>
                                    <option value="message3">عيد مبارك</option>
                                    <option value="message4">مبروووك النجاح</option>
                                    <option value="custome">رسالة خاصة</option>
                                </select>

                                <div x-show="isShowGiftMessage"
                                    x-transition:enter="transition-height ease-out duration-300"
                                    x-transition:enter-start="opacity-0 transfor h-0"
                                    x-transition:enter-end="opacity-100 transform h-24"
                                    x-transition:leave="transition-height ease-in duration-300"
                                    x-transition:leave-start="opacity-100 transform h-24"
                                    x-transition:leave-end="opacity-0 transform h-0">
                                    <textarea placeholder="ادخل نص الرسالة" x-ref="giftMessageRef" name="message"
                                        class="text-sm form-input h-24" :class="isShowMessageError && !giftData.giftMessage ? 'has-error ' : '' " x-model="giftData.giftMessage"></textarea>

                                        <span x-show="isShowMessageError && !giftData.giftMessage" class="block mb-2 text-xs text-red-700" id="validationHelp">نص الرسالة مطلوب</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <!-- step2 -->
                    <section x-show="currentStep == 'step2'" x-transition:enter="transition ease-out duration-300"
                        x-transition:enter-start="opacity-0 transform scale-90"
                        x-transition:enter-end="opacity-100 transform scale-100">
                        <form>
                            <section class="mb-5">
                                <div class="form-group mb-5">
                                    <label for="sender-name" class="form-label mb-2.5">
                                        اسم المرسل
                                    </label>
                                    <input x-ref="senderNameRef" type="text" x-model="giftData.sneder"
                                        placeholder="اسم مرسل الهدية" name="sender-name" id="sender-name"
                                        class="form-input" required>
                                </div>
                                <div class="form-group mb-5">
                                    <label for="receiver-name" class="form-label mb-2.5">
                                        اسم المستلم
                                    </label>
                                    <input type="text" x-model="giftData.receiver" placeholder="اسم المهدى إليه"
                                        name="receiver-name" id="receiver-name" class="form-input" required>
                                </div>
                                <div class="form-group mb-5">
                                    <label for="receiver-phone" class="form-label mb-2.5">
                                        رقم جوال المستلم
                                    </label>
                                    <input type="tel" x-model="giftData.receiverPhone" name="receiver-phone"
                                        id="receiver-phone" class="tel-input form-input" required>
                                </div>

                                <div class="form-group mb-5">
                                    <label for="receiver-email" class="form-label mb-2.5">
                                        البريد الإلكتروني للمستلم
                                        <small class="text-gray-text">
                                            (إختياري)
                                        </small>
                                    </label>
                                    <input type="email" x-model="giftData.receiverEmail"
                                        placeholder="اضف البريد الالكتروني" name="receiver-phone" id="receiver-email"
                                        class="form-input">
                                </div>

                                <div class="form-group mb-5">
                                    <div class="relative text-sm flex items-center mb-4">
                                        <input type="checkbox" x-model="isShowTime" id="inNextTime" name="inNextTime"
                                            class="focus:ring-transparent h-6 w-6 text-primary border-border-color rounded-md">
                                        <label for="inNextTime" class="ms-2">ارسال في وقت لاحق</label>
                                    </div>
                                </div>

                                <!-- timepicker -->
                                <div x-show="isShowTime" class="form-group" x-show="isShowGiftMessage"
                                    x-transition:enter="ease-out duration-300"
                                    x-transition:enter-start="opacity-0  h-0"
                                    x-transition:enter-end="opacity-100  h-16"
                                    x-transition:leave="ease-in duration-300"
                                    x-transition:leave-start="opacity-100  h-16"
                                    x-transition:leave-end="opacity-0  h-0">
                                    <input type="text" placeholder="تاريخ ووقت الأرسال" x-model="giftData.receiveDateTime" name="date" id="receiveDateTime" class="form-input">
                                    <small class="text-theme-red text-xxs sm:text-xs">ملاحظة: لايمكنك التعديل على بيانات الطلب بعد تحديد تاريخ الإرسال</small>
                                </div>

                            </section>
                        </form>
                    </section>


                    <!-- buttons -->
                    <div class="flex bg-white relative pt-2.5" :class="currentStep == 'step2' ? ' space-s-2.5' : '' ">
                        <button x-show="currentStep == 'step2'" @click="currentStep = 'step1';animateCommonItems()"
                            type="button" class="h-10 px-8 flex-grow-0 btn btn-outline-primary">
                            <i class="sicon-arrow-right"></i>
                        </button>

                        <button @click="changeStep()" type="button" class="btn h-10 btn-primary" x-text="stepsTitle[currentStep].btnText"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`;

export class Gifting extends HTMLElement {
  connectedCallback() {
    this.append(template.content.cloneNode(true));
    this.initTelInput();
    this.initFilepond();
    this.initDatePicker();
    this.initSwiper();
  }

  init() {
    return {
      currentStep: 'step1',
      isShowTime: false,
      giftingModal: false,
      isShowGiftMessage: false,
      selectedImage: '',
      selectedImageId: '',
      showSelectedImage: false,
      isShowMessageError: false,
      giftData: {},
      stepsTitle: {
        step1: {
          title: 'تفاصيل الهدية',
          count: '1/2',
          btnText: 'الخطوة الثانية'
        },
        step2: {
          title: 'المهدى إليه',
          count: '2/2',
          btnText: 'إرسال الهدية'
        }
      },

      animateCommonItems: function () {
        let that = this;
        anime({
          targets: '.common-anime',
          opacity: [0, 1],
          translateY: [40, 0],
          // duration: 600,
          delay: function (el, i) {
            return i * 100;
          },
          begin: function () {
            that.$refs['userPhone'].focus();
          }
        })
      },

      changeStep: function () {
        if(this.isShowGiftMessage){
          if(this.giftData.giftMessage){
            this.currentStep = 'step2';
            this.$nextTick(() => this.$refs.senderNameRef.focus());
          }else{
            // validation
            this.isShowMessageError = true
          }
        }else{
          this.currentStep = 'step2';
        }
        
      },

      setSelectedImage: function (src) {
        console.log(src);
      },

      selectedMessageChanged: function () {
        if (this.giftData.selectedMessage == "custome") {
          this.isShowGiftMessage = true;
          this.$nextTick(() => this.$refs.giftMessageRef.focus());
        } else {
          this.isShowGiftMessage = false;
        }
      },

      openGiftingModal: function () {
        this.giftingModal = true
        this.animateCommonItems();
      },

      closeGiftingModal: function () {
        this.giftingModal = false;
      }
    }
  }



  // swiper slider
  initSwiper = () => {
    var swiper = new Swiper(".gifting-slider", {
      spaceBetween: 10,
      slidesPerView: "auto",
      // centeredSlides: true,
      // loop: true,

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      breakpoints: {
        // when window width is >= 480px
        640: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        // when window width is >= 640px
        768: {
          slidesPerView: 4,
        },
      }

    });
  }

  // date and time picker
  initDatePicker = () => {
    document.addEventListener('DOMContentLoaded', function () {
      flatpickr('#receiveDateTime', {
        enableTime: true,
        dateFormat: "F j, Y - H:i",
      });
    });
  }

  // initTelInput
  //assign to all fields with .tel-input
  initTelInput = () => {
    const intlInputs = document.querySelectorAll('.tel-input');
    if (intlInputs.length) {
      intlInputs.forEach(intlInput => {
        let iti = intlTelInput(intlInput, {
          initialCountry: intlInput.dataset.code || 'sa',
          preferredCountries: ['sa', 'ae', 'kw', 'bh', 'qa', 'iq', 'om', 'ye', 'eg', 'jo', 'sy', 'ps', 'sd', 'lb', 'dz', 'tn', 'ma', 'ly'],
          formatOnDisplay: false,
          separateDialCode: true,
          autoPlaceholder: 'aggressive',
          utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js',
        });
        intlInput.addEventListener("countrychange", () => {
          let data = iti.getSelectedCountryData();
          document.querySelectorAll('.country_code').forEach(input => input.value = data.iso2.toUpperCase());
          document.querySelectorAll('.country_key').forEach(input => {
            input.value = ('+' + data.dialCode).replace('++', '+');
          });
        });
      });
    }
  }

  // filepond
  initFilepond = () => {
    document.addEventListener('DOMContentLoaded', function () {
      // filepond
      FilePond.registerPlugin(
        FilePondPluginImagePreview,
      );
      // Get a reference to the file input element
      const inputElement = document.querySelector('input[type="file"]');
      // Create a FilePond instance
      const pond = FilePond.create(inputElement, {
        labelIdle: `<div class="filepond--label-action text-sm leading-6"> <i class="icon text-5xl sicon-folders-image "></i> <p class="w-60">اختر صورة مناسبة للاهداء او قم برفع صورة من جهازك بالنقر هنا</p></div>`,
      });
    });
  }
}

customElements.define('gifting-modal', Gifting)