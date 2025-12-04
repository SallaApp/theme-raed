<div id="top"></div>

<br />
<div align="center">
     <a href="https://salla.dev">
        <img src="https://salla.dev/wp-content/uploads/2023/03/1-Light.png" alt="Logo">
     </a>
     <h1 align="center">Twilight JS APIs</h1>
     <p align="center">
         A JavaScript SDK for the Salla storefront APIs provides helper methods, or REST API endpoints, that allow communication between the frontend and backend. 
          <br />
          <a href="https://salla.dev/"><strong>Explore our blogs »</strong></a>
          <br />
          <br />
          <a href="https://github.com/SallaApp/Salla-CLI/issues/new">Report Bug</a> ·
          <a href="https://github.com/SallaApp/Salla-CLI/discussions/new">Request Feature</a> . 
          <a href="https://t.me/salladev">&lt;/Salla Developers&gt;</a> .
          <a href="https://salla.stoplight.io/docs/twilight-themes-documentation/3ac843cae76a2-overview">Official Documentation</a> 
     </p>
</div>

<!-- TABLE OF CONTENTS -->
<details open>
     <summary>Table of Contents</summary>
     <ol>
          <li>
               <a href="#overview">Overview</a>
          </li>
          <li>
               <a href="#getting-started">Getting Started</a>
               <ul>
               <li><a href="#sdks-main-apis">SDK's main APIs</a></li>
              <li><a href="#use-cases">Use cases</a></li>
               </ul>
               <li><a href="#installation-and-initialization">Installation and initialization</a></li>
          <li><a href="#usage">Usage</a></li>
                         <ul>
               <li><a href="#basic-configuration">Basic configuration </a></li>
               </ul>
          <li><a href="#support">Support</a></li>
          <li><a href="#contributing">Contributing</a></li>
          <li><a href="#credits">Credits</a></li>
          <li><a href="#license">License</a></li>
          </li>
     </ol>
</details>
<!-- Overview -->

## Overview

The Twilight JS SDK (`@salla.sa/twilight`) is the core package of the Twilight Framework, providing a comprehensive JavaScript interface for Salla's storefront APIs. It enables theme developers to easily communicate with Salla's backend services, handle events, manage state, and build interactive e-commerce experiences.

### Architecture

The Twilight Framework consists of several packages working together:

1. **@salla.sa/base**: Foundation layer with core utilities and services
2. **@salla.sa/twilight** (this package): Main SDK for Salla themes
3. **@salla.sa/twilight-components**: Web components for Salla themes
4. **@salla.sa/twilight-tailwind-theme**: Tailwind CSS theme for Salla themes
5. **@salla.sa/applepay**: Apple Pay integration for Salla

This modular architecture allows for better separation of concerns, more maintainable code, and the ability to use only the parts of the framework that are needed for a specific application.

### Key Features

- **API Integration**: Pre-built methods for all Salla API endpoints
- **Event System**: Powerful event handling for real-time updates
- **Authentication**: Seamless user authentication and session management
- **Cart Management**: Complete shopping cart functionality
- **Multilingual Support**: Built-in localization capabilities
- **Version Management**: Easy access to package versions via `Salla.versions`
- **Optimized Bundle**: Tree-shakable modules for minimal production builds

## Getting Started
**SDK** stands for "software development kit," and it refers to a library for interacting with a specific REST API using JavaScript. 

### SDK's main APIs
The main parts of the **Twilight JS SDK** include REST API endpoints that ease the actions related to the APIs request, such as:
- **Authorization APIs:** Several endpoints for customer logging in, logging out, and many more. 
- **Cart APIs:** Customer's cart list of endpoints.
- **Comments APIs:** Group of endpoints related to the customer comments, or feedback, on product or page.
- **Currency APIs:** Group of endpoints related to the store's currencies list.
- **Order APIs:** Customer's orders related endpoints.
- **Product APIs**: Product related endpoints.
- **Profile APIs:** Customer's profile endpoints. 
- **Rating APIs:** endpoints related to the store, product, order, shipping rating.
- **Wishlist APIs:** Customer's wishlist endpoints. 

### Use cases
Following are some of the possible uses of the Twilight JS SDK:
- Authenticating customers and allowing them to edit account details.
- Adding a product directly from the products list to the customer art.
- Returning the price of a product.
- Adding a product to the customer's wishlist.
- Rating the shipping company responsible for delivering orders.
- And many more!

<p align="right">(<a href="#top">back to top</a>)</p>

## Installation and initialization
**Twilight JS SDK** can be used without the need to be downloaded or installed; instead, it needs to be included as a short piece of regular JavaScript in the HTML that will asynchronously load the SDK into the Twilight theme. 

#### Twilight Themes
In case of using the **Twilight JS SDK** inside the Twilight themes,  the developer doesn't need to include the **Twilight JS SDK** in the theme project's bundle or inside the html, **Twilight theme engine** will inject the latest version of the **Twilight JS SDK** in the page.

Basically, the developer does not need to call the method `salla.init()` for twilight themes, because it will be called automatically upon the installation of the Twilight theme engine. This is done thanks to the [body:end hook](https://salla.stoplight.io/studio/twilight-themes-documentation?#bodyend-hook) `{% hook 'body:end' %}`.

#### HTML and CDN
The most common approach for setting up the **Twilight JS SDK** is load it via `<script>` befor closing the `body` tag of the HTML document. 

```html title="Code Snippet"
<script src="https://cdn.jsdelivr.net/npm/@salla.sa/twilight@latest/dist/@salla.sa/twilight.min.js"></script>
```

The following snippet of code will give the basic version of the SDK where the configurations are set to their minimum requirements, for example, store URL. The method `salla.init()` is used to setup and initialize the SDK. 

```js
<script>
  salla.init({
    debug: true, // disbale it in prod
    language_code: 'ar', // en
    store: {
      id: 1305146709, // The store id can found via store pages.
      url: "https://the-best-store-ever.sa"
    }
  });
</script>
```

#### Bundler/ES modules
The developer may also install the **Twilight JS SDK** using the following commands:

```npm title="NPM Installation Command"
npm install @salla.sa/twilight --save
```

```yarn title="Yarn Installation Command"
yarn add @salla.sa/twilight
```

Initially, the developer must import the Salla JS Events library as follows:


```js
import '@salla.sa/twilight';
```

Similar to the [HTML/CDN section](https://github.com/SallaApp/twilight/blob/master/packages/twilight/README.md#html-and-cdn), the following code snippet will give the basic version of the SDK where the configurations are set to their minimum requirements, wherein the method `salla.init()` is used to setup and initialize the SDK. 

```js
<script>
  salla.init({
    debug: true, // disbale it in prod
    language_code: 'ar', // en
    store: {
      id: 1305146709, // The store id can found via store pages.
      url: "https://the-best-store-ever.sa"
    }
  });
</script>
```

## Usage

As a result of the SDK initialization, the developer will be able to use any of the SDK's main APIs. For example,  the method `addItem` adds an item into the cart, the developer may call the method `addItem` as follows:

```js
salla.cart.addItem({
    id: 1234,
    quantity: 1,
    notes: "please i need to get the red color"
}).then((response) => {
    /* add your code here */
});
```
In addition to the above example, the method `addItem` may adds an item with multiple options to the carts as follows:
```js
salla.cart.addItem({
    id: 1234,
    quantity: 1,
    options: {
      117414452: 11232214, // option value id (select choice)
      117416632: "http://option-value-as-url-of-image.com",
      117411132: "option value as string"
    },
    notes: "please i need to get the red color"
}).then((response) => {
    /* add your code here */
});
```

Furthermore, a large number of store events will be available for use. Thus, the developer's theme may be configured to respond automatically to a variety of activities, such as:

- The user requested an Access Code to perform a login, however, the code was not sent. For this scenario, using the method `salla.event.auth.onCodeNotSent()` can be used.

- A new item has been added to the cart via the `salla.cart.event.onItemAdded()` method.

- The user added a new item to the Wishlist using the method `salla.event.wishlist.onAdded()`.

Full example for that would be the event `onItemAdded` which is triggered when adding an item to the cart is done without having any errors coming back from the backend:
```js
salla.cart.event.onItemAdded((response) => {
  console.log(response)
});
```
On the over hand, the event `onItemAddedFailed` is triggered when adding an item to the cart is not completed and an error has occurred. For example, the id of the product to be added to the cart was not found.
```js
salla.cart.event.onItemAddedFailed((errorMessage) => {
  console.log(errorMessage)
});
```


### Basic configuration 

Aside from calling the APIs, the developer has the ability to configure the Twilight engine to meet the needs of his theme. This list of the available configurations can be found in this [article](https://salla.stoplight.io/docs/twilight-themes-documentation/ZG9jOjQ4OTE2NDQ5-configuration). For this purpose, the method `salla.config.get()` is used to retrieve a configuration value, while `salla.config.set()` is used to set a configuration value.

#### Set configuration value
The developer may set the debug mode to be activated. That is to state, the theme will be run in a debugger. This means that the debugger keeps track of everything that happens while the theme is running.

```js
salla.config.set('debug', true)
```

#### Get configuration value
Similarly, the developer can use the method `salla.config.get()` to get any value from the configuration file. To retrieve a simple value such as the user Id, the following syntax can be followed:

```js
salla.config.get('user.id’)
```

Furthermore, if the required value is nested inside an inner value, such as a currency code, the following syntax can be followed:

```js
salla.config.get('currencies.SAR.code’)
```

#### Accessing Version Information

The Twilight Framework provides easy access to version information for all packages through the `Salla.versions` object:

```js
// Get the version of the core package
console.log(Salla.versions.twilight); // e.g., "v2.14.145"

// Get the version of the base package
console.log(Salla.versions.base); // e.g., "v2.14.143"
```

This is particularly useful for debugging, support, and ensuring compatibility between different parts of the framework.

<p align="right">(<a href="#top">back to top</a>)</p>

## Support

The team is always here to help you. Happen to face an issue? Want to report a bug? You can submit one here on GitHub using the [Issue Tracker](https://github.com/SallaApp/twilight-vscode-extension/issues/new). If you still have any questions, please contact us via the [Telegram Bot](https://t.me/SallaSupportBot) or join the Global Developer Community on [Telegram](https://t.me/salladev).

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create.
Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request.
You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## Credits

- [Salla](https://github.com/sallaApp)
- [All Contributors](../../contributors)
  
<p align="right">(<a href="#top">back to top</a>)</p>

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>
