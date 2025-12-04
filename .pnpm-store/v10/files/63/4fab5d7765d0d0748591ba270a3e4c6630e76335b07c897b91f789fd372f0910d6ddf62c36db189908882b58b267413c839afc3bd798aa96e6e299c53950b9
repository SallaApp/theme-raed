
<div id="top"></div>
<br />
<div align="center"> 
  <a href="https://salla.dev"> 
    <img src="https://salla.dev/wp-content/uploads/2023/03/1-Light.png" alt="Logo"> 
  </a>
  <h1 align="center">Twilight Tailwind-Theme</h1>
  <p align="center">
    The Tailwind-Theme Plugin registers the <a ref="https://github.com/SallaApp/twilight-components">Twilight Web Component</a> styles and injects them using JavaScript instead of CSS. It's a good starting point for Tailwind-based themes.
    <br />
    <a href="https://salla.dev/"><strong>Explore our blogs »</strong></a>
    <br />
    <a href="https://github.com/SallaApp/twilight-components/edit/master/packages/tailwind-theme/issues/new">Report Bug</a> · 
    <a href="https://github.com/SallaApp/twilight-components/edit/master/packages/tailwind-theme/discussions/new">Request Feature</a> . <a href="https://t.me/salladev">&lt;/Salla Developers&gt;</a> . <a href="https://docs.salla.dev/docs/twilight-themes-documentation">Official Documentation</a> 
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details open>
  <summary>Table of Contents</summary>
<ol>
<li><a  href="#overview">Overview</a></li>
<li><a  href="#usage">Usage</a>
<ul>
<li><a  href="#jit-enabled">JIT Enabled</a></li>
</ul>
</li>
<li><a  href="#add-a-new-component">Add a New Component</a></li>
<li><a  href="#publish">Publish</a></li>
<li><a  href="#support">Support</a></li>
<li><a  href="#contributing">Contributing</a></li>
<li><a  href="#credits">Credits</a></li>
<li><a  href="#license">License</a></li>
</ol>
</details>

<br>

## Overview
The Tailwind-Theme Plugin registers the styles needed by the [Twilight Web Components](https://github.com/SallaApp/twilight-components) and then injects them into the theme stylesheet using JavaScript instead of CSS. It can also be used as a starter theme for any theme based on [Tailwind](https://tailwindcss.com/).
  
## Usage 
By default, any [Tailwind-based](https://tailwindcss.com/) theme will look for the `tailwind.config.d.ts` file at the root of the project to retrieve any pre-settings and customizations. Accordingly, the plugin Tailwind-Theme should be added to the `tailwind.config.d.ts` file as follows:

```js
plugins: [
  ...
  require('@salla.sa/twilight-tailwind-theme'),
  ....
]
```

### JIT Enabled

**Tailwind** added a [just-in-time compiler](https://v2.tailwindcss.com/docs/just-in-time-mode), which generates styles as the developer writes the theme rather than generating everything in advance at initial build time. Since JIT mode generates your CSS on-demand by scanning your template files, it’s crucial that the developer configure the `content` option in the `tailwind.config.d.ts` file with all of the theme paths, otherwise the CSS classes will be empty.


```js title="tailwind.config.d.ts"
...
content: [
  // theme views
  "views/**/*.twig",
  // list of classes which required by twilight web components
  "node_modules/@salla.sa/twilight-tailwind-theme/safe-list-css.txt"
],
...
```

 ## Add a New Component

 With Tailwind, developer style elements by applying pre-existing classes directly into the HTML. This is done using utility classes to build custom designs without writing CSS. Based on that, the developer may develop a new component by simple doing the following steps: 

 1. Create a new folder with the name of the new compnenet.
 2. Create a `utilities.json` file with list of new compnenet's classes as json.
 
## Publish 
Last, the developer may publish the project using the following command:
```
npm run publish
```


<p align="right">(<a href="#top">back to top</a>)</p>




## Support

The team is always here to help you. Happen to face an issue? Want to report a bug? You can submit one here on Github using the [Issue Tracker](https://github.com/SallaApp/theme-raed/issues/new). If you still have any questions, please contact us via the [Telegram Bot](https://t.me/SallaSupportBot) or join in the Global Developer Community on [Telegram](https://t.me/salladev).

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
