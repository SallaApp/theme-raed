// Login  Web Component
// Dependencies: Tailwind, AlpineJs, intl-tel-input
const template = document.createElement('template');
import TelInput from "intl-tel-input";
template.innerHTML = /*html*/`
<style>
[x-cloak] {
  display: none;
}
</style>
<div x-data="$el.parentElement.init()">
<button @click="openLoginModal" type="button"
  class="mx-1 dropdown-trigger border dark:border-gray-500 rounded-full w-10 h-10 font-medium  focus:ring-offset-transparent hover:text-primary"
  id="menu-button" aria-expanded="true" aria-haspopup="true">
  <i class="sicon-user-circle"></i>
</button>

<div x-show="showLoginModal" 
    x-cloak 
    class="login-modal">
  <div class="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-light-gray dark:bg-gray-800 dark:bg-opacity-90">
    <!-- Modal inner -->
    <div x-ref="loginContainer"
        class="login-container relative p-8 max-h-80 w-80 box-content  shadow-default max-w-3xl  mx-auto  bg-white dark:bg-gray-700 rounded transition-all ease-in-out duration-500">
      <div x-ref="modalContent" class="box-inner ">
        <h5 class="text-black dark:text-white max-w-none text-lg font-bold mb-8 leading-3">سجل دخول إلي الموقع</h5>

        <button @click="closeModal"
          class="close-modal text-gray-text hover:text-primary w-6 h-6  text-lg absolute top-6 end-6">
          <i class="sicon-cancel"></i>
        </button>

        <!-- content -->
        <div class="modal-content">
          <!-- login methods -->
          <div x-show="showLoginMethods">
            <p class="text-sm text-gray-text mb-5">اختر الوسيلة المناسبة</p>

            <!--item -->
            <div @click="openEmailLogin"
              class="mb-2.5 box-content relative rounded-md transition border border-border-color dark:border-gray-600 py-5 pe-4 ps-5 flex items-center space-s-3 hover:!border-primary">
              <div class="flex-shrink-0">
                <div class="bg-primary w-12 h-12 text-lg text-white rounded-icon">
                  <i class="sicon-mail"></i>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <a href="#" class=" flex justify-between items-center">
                  <div class="flex-1">
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    <p class="text-sm text-gray-text">سجل دخول</p>
                    <h6 class="font-boldf">البريد الإلكتروني</h6>
                  </div>
                  <i class="sicon-keyboard_arrow_left text-primary text-xl"></i>
                </a>
              </div>
            </div>
            <!-- end:item-->

            <!--item -->
            <div @click="loginMethod = 'phone'; showLoginMethods = false; animatItems() "
              class=" box-content relative rounded-md transition border border-border-color dark:border-gray-600 py-5 pe-4 ps-5 flex items-center space-s-3 hover:!border-primary">
              <div class="flex-shrink-0">
                <div class="bg-primary w-12 h-12 text-lg text-white rounded-icon">
                  <i class="sicon-phone"></i>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <a href="#" class=" flex justify-between items-center">
                  <div class="flex-1">
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    <p class="text-sm text-gray-text">
                      سجل دخول
                    </p>
                    <h6 class="font-boldf">
                      الهاتف
                    </h6>
                  </div>
                  <i class="sicon-keyboard_arrow_left text-primary text-xl"></i>
                </a>
              </div>
            </div>
            <!-- end:item-->
          </div>

          <!-- email login -->
          <form x-show="loginMethod == 'email' && !showOtp " class="anime-item">
            <label for="userEmail" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span class="block">
                ادخل البريد الإلكتروني
                <span class="text-red-500">*</span>
              </span>
            </label>
            <input type="email" name="email" placeholder="your@email.com" id="userEmail"
              class="form-input mb-5">
            <button @click="openOtp()" type="button" class="w-full btn btn-primary mb-5 h-10">
              دخول
            </button>

            <a href="#" @click="loginMethod = 'phone'; animatItems() "
              class="text-sm text-primary block text-center">سجل دخول
              برقم الهاتف</a>
          </form>

          <!-- phone login -->
          <form x-show="loginMethod == 'phone' && !showOtp " class="anime-item">
            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span class="block">
                ادخل رقم الهاتف
                <span class="text-red-500">*</span> 
              </span>
            </label>
            <input type="tel" id="phone" name="phone" placeholder="1234344" class="tel-input form-input mb-5">
            <button @click="openOtp()" type="button"
              class="w-full btn btn-primary mb-5 mt-5 h-10">
              دخول
            </button>

            <a href="#" @click="loginMethod = 'email'; animatItems() "
              class="text-sm text-primary block text-center">سجل دخول
              بالبريد الإلكتروني </a>
          </form>

          <!-- otp -->
          <form x-show="showOtp" action="#" method="POST" class="anime-item">
            <p for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <span class="block">
                ادخل رمز التحقق
                <span class="text-red-500">*</span>
              </span>
            </p>
            <div class="flex justify-between mb-5 space-s-2" dir="ltr">
              <!-- <template x-for="(input, index) in length" :key="index"> -->
              <input type="text" maxlength="1" class="appearance-none form-input h-10 rounded-md text-center"
                x-ref="0" x-on:input="handleInput($event, 0)" x-on:paste="handlePaste($event)"
                x-on:keydown.backspace="$event.target.value || handleBackspace($event.target.getAttribute('x-ref'))" />
              <input type="text" maxlength="1" class="form-input h-10 rounded-md text-center" x-ref="1"
                x-on:input="handleInput($event, 1)" x-on:paste="handlePaste($event)"
                x-on:keydown.backspace="$event.target.value || handleBackspace($event.target.getAttribute('x-ref'))" />
              <input type="text" maxlength="1" class="form-input h-10 rounded-md text-center" x-ref="2"
                x-on:input="handleInput($event, 2)" x-on:paste="handlePaste($event)"
                x-on:keydown.backspace="$event.target.value || handleBackspace($event.target.getAttribute('x-ref'))" />
              <input type="text" maxlength="1" class="form-input h-10 rounded-md text-center" x-ref="3"
                x-on:input="handleInput($event, 3 )" x-on:paste="handlePaste($event)"
                x-on:keydown.backspace="$event.target.value || handleBackspace($event.target.getAttribute('x-ref'))" />
              <!-- </template> -->
            </div>
            <input type="hidden" name="otp" x-model="value">
            <button type="button" class="w-full btn btn-primary mb-5 h-10">
              إرسال
            </button>
            <p class="mb-5 text-center text-sm text-gray-text">إعادة الارسال بعد <b x-text="'0' + remainTime + ':00'"></b>
            </p>
            <div class="flex justify-between space-s-5 mb-5">
              <button class="btn btn-primary font-normal rounded-md" disabled>رسالة نصية</button>
              <button class="btn btn-primary font-normal rounded-md" disabled>إعادة إرسال</button>
            </div>

            <a href="#" @click="showOtp = false; animatItems() " class="text-sm text-primary block text-center"> رجوع
            </a>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
`;

export class SallaLogin extends HTMLElement {
    connectedCallback() {
        this.append(template.content.cloneNode(true));
        this.initTelInputs();
    }

    init() {
        return {
            showLoginModal  : false,
            showLoginMethods: true,
            loginMethod     : '',
            showOtp         : false,
            length          : 4,
            value           : "",
            remainTime      : '',
            loginEmail      : '',
            loginPhone      : '',

            countDown: function () {
                var counter = 5;
                var timeCountdown = setInterval(() => {
                    counter--
                    this.remainTime = counter;

                    if (counter === 0) {
                        clearInterval(timeCountdown);
                    }
                }, 1000);
            },


            openLoginModal: function () {
                this.showLoginModal = true;
                document.getElementsByTagName('html')[0].style.position = "fixed";
                document.getElementsByTagName('html')[0].style.overflowY = "scroll";
            },

            closeModal: function () {
                this.showLoginModal = false;
                document.getElementsByTagName('html')[0].style.position = "static";
                document.getElementsByTagName('html')[0].style.overflowY = "auto";
            },

            openOtp: function () {
                this.showOtp = true;
                this.countDown();
                this.animatItems();
            },

            openEmailLogin: function () {
                this.loginMethod = 'email';
                this.showLoginMethods = false;
                this.animatItems()
            },


            animatItems: function () {
                // let that = this;
                anime({
                    targets   : '.anime-item',
                    translateX: [30, 0],
                    opacity   : [0, 1],
                    duration  : 1000,
                    delay     : anime.stagger(50),
                    easing    : 'easeOutExpo',
                    begin     : () => {
                        // animate height
                        this.$refs.loginContainer.style.maxHeight = this.$refs.loginContainer.scrollHeight + 'px';
                        if (this.showOtp) {
                            this.$refs[0].focus();
                            // reset inputs
                            const inputs = Array.from(Array(this.length));
                            inputs.forEach((element, i) => {
                                this.$refs[i].value = '';
                            });
                        }
                    }
                });

            },

            // opt component
            handleInput: function (e, index) {
                this.$refs[index].value = this.$refs[index].value.replace(/[^0-9\u0660-\u0669]/g, '');

                const input = e.target;
                this.value = Array.from(Array(this.length), (element, i) => {
                    return this.$refs[i].value || "";
                }).join("");

                // console.log('value', this.value);

                if (input.nextElementSibling && input.value) {
                    input.nextElementSibling.focus();
                    input.nextElementSibling.select();
                }
            },

            handlePaste(e) {
                const paste = e.clipboardData.getData('text');
                this.value = paste;
                const inputs = Array.from(Array(this.length));

                inputs.forEach((element, i) => {
                    this.$refs[i].value = paste[i] || '';
                });
            },

            handleBackspace(e) {
                const previous = parseInt(e, 10) - 1;
                this.$refs[previous] && this.$refs[previous].focus();
            },

        };
    }

    // initTelInput
    //assign to all fields with .tel-input
    initTelInputs() {
        const intlInputs = document.querySelectorAll('.tel-input');
        if (intlInputs.length) {
            intlInputs.forEach(intlInput => {
                let iti = TelInput(intlInput, {
                    initialCountry    : intlInput.dataset.code || 'sa',
                    preferredCountries: ['sa', 'ae', 'kw', 'bh', 'qa', 'iq', 'om', 'ye', 'eg', 'jo', 'sy', 'ps', 'sd', 'lb', 'dz', 'tn', 'ma', 'ly'],
                    formatOnDisplay   : false,
                    separateDialCode  : true,
                    autoPlaceholder   : 'aggressive',
                    utilsScript       : 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.12/js/utils.min.js',
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
}

customElements.define('salla-login', SallaLogin)