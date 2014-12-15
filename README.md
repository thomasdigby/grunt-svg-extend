# grunt-svg-extend

> Grunt task for converting SVGs to embedded data-uris, outputting a series of SASS placeholders/mixins or CSS selectors. You can specify a PNG fallback location and combine it with a feature test to provide a fallback for unsupporting browsers.

> Recommended to combine this task with [grunt-svgmin](https://www.npmjs.org/package/grunt-svgmin) and [grunt-svg2png](https://www.npmjs.org/package/grunt-svg2png) to create an automated UI workflow without the overheads of other grunt icon solutions.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-svg-extend --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-svg-extend');
```

## The "svgextend" task

### Overview
In your project's Gruntfile, add a section named `svgextend` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	svgextend: {
		all: {
			options: {
				requirePng: true,
				pngDir: '/images/dist/png/',
				featureTest: 'no-svg'
			},
			inputDir: 'images/dist/svg/',
			outputDir: 'css/scss/',
			outputName: '_icons',
			outputType: 'mixin'
		}
	}
});
```

### Options

#### inputDir
Type: `String`
Default value: `null`

Source directory of input SVG files, cannot (currently) contain more than a single level.

#### outputDir
Type: `String`
Default value: `null`

Target directory for output file.

#### outputName
Type: `String`
Default value: `null`

Name for the output file.

#### outputType
Type: `String`
Default value: `null`

Choose either `placeholder`, `mixin` or `class`. This will output either a `.scss` or `.css` file dependent on the choice of a regular selector or a SASS feature.


#### options.pngDir
Type: `String`
Default value: `images/dist/png/`

Source directory of the fallback PNG file.

#### options.requirePng
Type: `String`
Default value: `false`

Set to true if PNG fallback is required.

#### options.featureTest
Type: `String`
Default value: `no-svg`

Class used to detect fallback, default is modernizr's `no-svg`.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
*	v1.0.0  Rewritten to include a number of outputs: placeholder, mixin and class selector. Improved parameter names, better error handling and a few bug fixes.

*	v0.1.5	Included mixin option for implementation within media queries
*	v0.1.4	Updated task overview
*	v0.1.3	Fixed PNG issues
*	v0.1.2	Removed underscore from 'svgextend' & added more useful grunt logs
*	v0.1.1	Fixed PNG path issue and updated readme
*	v0.1.0	Added PNG fallback option, choose a test class (e.g. no-svg) and a path to the fallback .png
*	v0.0.2	Update to package.json
*	v0.0.1	Initial commit

## License
Copyright (c) 2014 Thomas Digby. Licensed under the MIT license.
