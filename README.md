# NoPhoneWeek - front-end

[![Build Status](https://travis-ci.org/NoPhoneWeek/front-end.svg?branch=master)](https://travis-ci.org/NoPhoneWeek/front-end)

### Requirements

> This project was tested on an UNIX based OS (Ubuntu 15.04 and OS X 10.11)

| Package | Minimal version |
| --- | --- |
| nodejs | v5 |
| npm | 3.8.6 |
| gulp | view package.json |
| bower | view package.json |
| boostrap | 3.3.6 |

### Installation

```
npm install
```

### Run 
```
npm start
```

### Build
To build distribution files without running the live server
```
npm run build
```

### Generating Images
Images should be built with the primary build task but to build images explicitly run `npm run images`.

> For production and if you want optimized images in dev use `npm run optimized-images` (requires imagemagick & graphicsmagick)

### Generating Styleguide
```
npm run styleguides
```
and your styleguide will be available in `{hostname}/styleguides.html` from the browser.

### Test
```
npm test
```

### Contributing
You are encouraged to contribute. To do so please read the [contributing guide](https://github.com/NoPhoneWeek/front-end/blob/master/CONTRIBUTING.md)

