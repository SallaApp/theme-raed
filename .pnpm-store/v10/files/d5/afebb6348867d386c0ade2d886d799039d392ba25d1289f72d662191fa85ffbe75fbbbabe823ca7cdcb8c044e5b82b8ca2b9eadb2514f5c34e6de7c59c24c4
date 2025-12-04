import app from './app'

salla.event.setMaxListeners(100);

export default function () {
  app();

  salla.init({
    debug: true,
    theme: {
      color: {
        primary: '#5dd5c4'
      }
    },
    store: {
      url: process.env.URL,
      api: process.env.API,
      id: process.env.STORE_ID,
      logo: "https://salla-dev.s3.eu-central-1.amazonaws.com/logo/logo-fashion.jpg",
      settings: {
        payments: ['apple_pay']
      }
    },
    user: {
      // todo :: read the user data from storage
      type: 'user',
      avatar: "https://cdn.salla.sa/customer_profiles/9itOm11DeKS87n8kNkMjIarFZa8bSBMqW02IKq58.png",
      birthday: "1986-02-11",
      currency: "SAR",
      email: "demo@demo.com",
      first_name: "DEEmo",
      gender: "male",
      id: 1938424344,
      language_code: document.documentElement.lang,
      last_name: "Account",
      phone: {code: "+966", number: 555555555, country: "SA"}
    }
  });

  // this is required to bypass cloudflare in stage
  if (salla.api.axios) {
    salla.api.axios.defaults.headers.common['CF-Access-Client-Id'] = process.env.CF_ACCESS_ID;
    salla.api.axios.defaults.headers.common['CF-Access-Client-Secret'] = process.env.CF_ACCESS_SECRET;
  } else {
    salla.api.defaults.headers.common['CF-Access-Client-Id'] = process.env.CF_ACCESS_ID;
    salla.api.defaults.headers.common['CF-Access-Client-Secret'] = process.env.CF_ACCESS_SECRET;
  }
}
