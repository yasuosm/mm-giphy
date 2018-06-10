# MM Giphy

A React.js test for MM

## Requirements

- [x] Pull from the Giphy trending endpoint
- [x] Adapts to browser width
- [x] Images in grid: Desktop row of 4 images, Tablet row of 3 images, Mobile row of 2 images
- [x] When user clicks or taps on image, show image full screen
- [x] Only load maximum 20 images at a time

## Development

Application created with [Rekit](http://rekit.js.org/)

## Deployment

```sh
npm install
npm run build
```

`npm run build` will create a production `build` directory. Set up your favorite HTTP server to serve `index.html`. Example:

```sh
npm install -g serve
serve -s build
```
