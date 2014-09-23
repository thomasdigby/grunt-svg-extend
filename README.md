# grunt-svg-extend

> Converts SVG files to a series of SASS placeholders with base64 encoded SVGs

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

## The "svg_extend" task

### Overview
In your project's Gruntfile, add a section named `svg_extend` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	svg_extend: {
		all: {
			source: 'images/svg/',
			target: 'css/scss/',
			scssName: '_icons'
		}
	}
});
```

### Options

#### source
Type: `String`
Default value: null

Source directory of SVG files, cannot contain more than a single level.

#### target
Type: `String`
Default value: null

Target directory of SCSS file.

#### scssName
Type: `String`
Default value: null

Name for the .scss file.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.0.1: Initial commit

## License
Copyright (c) 2014 Thomas Digby. Licensed under the MIT license.
