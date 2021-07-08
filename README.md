# smart-lazyload
An extension that supports lazy loading of image.

## Install
### Using unpkg CDN
```
<script src="https://unpkg.com/smart-lazyload/index.js"></script>
```

### Using npm
```bash
npm install smart-lazyload --save-dev
```

## Usage

### CommonJS usage
```
const lazyload = require('smart-lazyload')
```

### Call

#### Image tag demo
```
<img class="lazyload" src="" data-url="https://test.demo.com/images/test.png"/>
```
#### Initialize the extension after image tags are rendered
```
lazyload.init({
    className: 'lazyload',
    attribute: 'data-url'
})
```

## Method
lazyload.init(options)
- options => {Object} lazyload options.(required)

### Options
- className => {String} The class name of image tag.(required)
- attribute => {String} The attribute of data url within image tag.(required)

## License
smart-lazyload is [MIT licensed](https://github.com/AmoyDreamer/smart-lazyload/blob/master/LICENSE).
