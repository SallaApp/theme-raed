

<div id="top"></div>

<br />
<div align="center">
     <a href="https://salla.dev">
        <img src="https://salla.dev/wp-content/uploads/2023/03/1-Light.png" alt="Logo">
     </a>
     <h1 align="center">Salla Core JS</h1>
     <p align="center">
        Kick off your Salla JS project with this core package. It includes the main elements needed for building a JS project. On top of that, it's based on the Event-Driven Architecture.
          <br />
          <a href="https://salla.dev/"><strong>Explore our blogs »</strong></a>
          <br />
          <br />
          <a href="https://github.com/SallaApp/twilight/issues/new">Report Bug</a> ·
          <a href="https://github.com/SallaApp/twilight/discussions/new">Request Feature</a> . 
          <a href="https://t.me/salladev">&lt;/Salla Developers&gt;</a> .
          <a href="https://docs.salla.dev/docs/twilight-themes-documentation/8830a91f78c7d-event">Official Documentation</a> 
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
               <li><a href="#installation">Installation</a></li>
               <li><a href="#whats-included">What's included?</a></li>
               </ul>
          <li><a href="#usage">Usage</a></li>
                         <ul>
                         <li><a href="#confiruration">Confiruration</a></li>
                         <li><a href="#helpers">Helpers</a></li>
                         <li><a href="#storage">Storage</a></li>
                         <li><a href="#cookies">Cookies</a></li>
                         <li><a href="#logger">Logger</a></li>
                         <li><a href="#events">Events</a></li>
                         <ul>
                            <li><a href="#listening-to-the-event">Listening to the event</a></li>
                            </ul>
                         </ul>
                         </li>
            <li><a href="#support">Support</a></li>
            <li><a href="#contributing">Contributing</a></li>
            <li><a href="#credits">Credits</a></li>
            <li><a href="#license">License</a></li>
               </ul>
          </li>
     </ol>
</details>
<!-- Overview -->

## Overview
**Salla Core JS** package is based on the Event-Driven Architecture, which is a modern design approach centered on data that represents "events" (i.e., a product has been added to the cart). In event-driven programming, an event is the result of a single or multiple actions. Subscribers can listen to that event and take action after it is released by the emitter.


## Getting Started
**Salla Core JS** uses [EventEmitter2](https://www.npmjs.com/package/eventemitter2), which is an implementation of the [EventEmitter](https://nodejs.dev/learn/the-nodejs-event-emitter) module found in Node.js. It not only outperforms EventEmitter in benchmarks and is browser-compatible, but it also adds a slew of new non-breaking functionality to the EventEmitter interface.



### Installation 
**Salla Core JS** can be installed from the `npm` using the following commands:

```npm title="NPM Installation Command"
npm install @salla.sa/base --save
```

```yarn title="Yarn Installation Command"
yarn add @salla.sa/base
```

### What's included?
A quick look at the top-level files in the **Salla Core JS** project:

```
.
├── src / helpers
├── src / config.d.ts
├── src / cookie.ts
├── src / event.js
├── src / index.ts
├── src / logger.ts
└── src / storage.js
```

## Usage

```js
import Salla from "@salla.sa/base"
```

Upon the installation, the following will be available to the developer:

### Confiruration
When the JS Core project is first loaded, the initialization procedure is used to obtain the necessary configuration settings. The developer has the ability to configure the project to meet his needs.

### Helpers
The JS Core project is packaged with a variety of helpful functions that may be accessed and used directly within projects. 

### Storage
Developers can use local storage to save and retrieve data in the browser. The data in local storage does not have an expiration date. This means that even if the tab or browser window is closed, the data will remain. Furthermore, the data is only saved locally. 

### Cookies
The JS Core project makes it easy to create, retrieve, and modify cookies. Name, value, and length can be limited.

###  Logger
The JS Core project includes a logger tool that helps in tracking the execution flow and determining why certain things occur in the JS application.

### Events
The Events can be triggered by the emitter's 'emit()' method. This method causes the event to be pushed using the data that the developer has provided.

For example, the developer may create an event based on verified login by the user. Simply, the  `emit()`  method can be called with a list of parameters. These parameters state the event's action and the passed data along with it as below:

```js
// via event name
Salla.event.emit("auth::verified",  {success:  true},  'email')
```

#### Listening to the event 

After creating the event along with its list of data, the next step is to implement an appropriate listener for that event. In  **Salla JS Events**, this can be achieved using two methods:

- Using the event name and result directly along with an anonymized function to perform the needed action based on the event result.
```js
// via event name
Salla.event.on('auth::verified',(response, authType)  =>  {
// lets do anything when the event emit
console.log('The customer has been verifed');
console.log(response, authType)
});
``` 
- Adding a  `one`  time listener for the event along with an anonymized function to perform the needed action based on the event result.
```js
// Adds a one time listener for the event.
Salla.event.once('auth::verified',(response, authType)  =>  {
// The listener is invoked only the first time
// the event is fired, after which it is removed.
console.log('The customer has been verifed');
console.log(response, authType)
})
```
<p align="right">(<a href="#top">back to top</a>)</p>

### FormDataWrapper

The FormDataWrapper provides a unified interface for working with both regular objects and FormData, making it easier to handle file uploads and form data in a consistent way.

#### Usage Examples

##### Example 1: Basic file handling with FormData
```js
const formData = new FormData();
const wrapped = createWrapper(formData);

// Adding a single file
const file1 = new File(['Hello World'], 'hello.txt', { type: 'text/plain' });
wrapped.document = file1;  // Works via proxy
// OR
wrapped.setFile('document', file1);  // Explicit file method

// Getting the file back
const retrievedFile = wrapped.document;  // Returns File object
console.log(retrievedFile.name);  // 'hello.txt'
console.log(retrievedFile.size);  // 11 (bytes)
```

##### Example 2: Multiple files with the same key
```js
const file2 = new File(['Second file'], 'second.txt', { type: 'text/plain' });
const file3 = new File(['Third file'], 'third.txt', { type: 'text/plain' });

// Setting multiple files at once (replaces existing)
wrapped.attachments = [file2, file3];

// Or append files one by one
wrapped.append('photos', new File(['Photo 1'], 'photo1.jpg', { type: 'image/jpeg' }));
wrapped.append('photos', new File(['Photo 2'], 'photo2.jpg', { type: 'image/jpeg' }));

// Get all files for a key
const allPhotos = wrapped.getFiles('photos');
console.log(allPhotos.length);  // 2
console.log(allPhotos.map(f => f.name));  // ['photo1.jpg', 'photo2.jpg']
```

##### Example 3: Mixed content (files and regular data)
```js
wrapped.username = 'john_doe';
wrapped.age = 30;
wrapped.avatar = new File(['avatar data'], 'avatar.png', { type: 'image/png' });

// Check if property is a file
console.log(wrapped.isFile('avatar'));  // true
console.log(wrapped.isFile('username'));  // false

// Get file info without reading content
const fileInfo = wrapped.getFileInfo('avatar');
console.log(fileInfo);  // [{ name: 'avatar.png', size: 11, type: 'image/png' }]
```

##### Example 4: Working with either object or FormData
```js
function processUserData(data: Record<string, any> | FormData) {
  const wrapped = createWrapper(data);
  
  // These operations work for both types
  wrapped.name = 'Jane Doe';
  wrapped.email = 'jane@example.com';
  
  // Handle file upload (works differently based on type)
  const profilePic = new File(['pic'], 'profile.jpg', { type: 'image/jpeg' });
  wrapped.profilePicture = profilePic;
  
  // Check if we have a file
  if (wrapped.isFile('profilePicture')) {
    const file = wrapped.getFile('profilePicture');
    console.log(`Uploaded file: ${file?.name}, Size: ${file?.size} bytes`);
  }
  
  // Convert to object for processing
  const obj = wrapped.toObject();
  console.log('Data keys:', Object.keys(obj));
  
  return wrapped;
}
```

##### Example 5: Real-world form submission scenario
```js
function handleFormSubmit(formElement: HTMLFormElement) {
  const formData = new FormData(formElement);
  const wrapped = createWrapper(formData);
  
  // Add timestamp
  wrapped.submittedAt = Date.now();
  
  // Validate files
  const uploadedFiles = wrapped.getFiles('documents');
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  for (const file of uploadedFiles) {
    if (file.size > maxSize) {
      console.error(`File ${file.name} exceeds maximum size`);
      wrapped.delete('documents');
      wrapped.error = 'File too large';
    }
  }
  
  // Add computed property
  wrapped.fileCount = uploadedFiles.length;
  
  // Get the modified FormData for submission
  const finalFormData = wrapped.getRawData() as FormData;
  
  // Submit with fetch
  fetch('/api/submit', {
    method: 'POST',
    body: finalFormData
  });
}
```

##### Example 6: Type-safe file handling
```js
interface UserProfile {
  name: string;
  email: string;
  avatar?: File;
  documents?: File[];
}

function createUserProfile(data: UserProfile | FormData) {
  const wrapped = createWrapper(data);
  
  // Type-safe access
  const name: string = wrapped.name;
  const avatar: File | null = wrapped.getFile('avatar');
  const docs: File[] = wrapped.getFiles('documents');
  
  // Process files
  if (avatar) {
    console.log(`Avatar: ${avatar.name} (${avatar.type})`);
  }
  
  docs.forEach((doc, index) => {
    console.log(`Document ${index + 1}: ${doc.name}`);
  });
  
  return wrapped.toObject();
}
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Support

The team is always here to help you. Happen to face an issue? Want to report a bug? You can submit one here on Github using the [Issue Tracker](https://github.com/SallaApp/twilight-vscode-extension/issues/new). If you still have any questions, please contact us via the [Telegram Bot](https://t.me/SallaSupportBot) or join in the Global Developer Community on [Telegram](https://t.me/salladev).

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

