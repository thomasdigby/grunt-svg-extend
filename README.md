# grunt-svg-extend

> Converts SVG files to a series of SASS placeholders with encoded SVGs and optional PNG fallbacks. It should ease the process of creating UI icons for a site, and provide good browser support with the PNG fallback.

> I recommend combining this task with [grunt-svgmin](https://www.npmjs.org/package/grunt-svgmin) and [grunt-svg2png](https://www.npmjs.org/package/grunt-svg2png) to create a workflow that is entirely automated.

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
				pngsource: 'images/dist/png/',
				svgtest: 'no-svg'
			},
			output: '_icons',
			source: 'images/dist/svg/',
			target: 'css/scss/'
		}
	}
});
```

### Options

#### source
Type: `String`
Default value: null

Source directory of .svg files, cannot contain more than a single level.

#### target
Type: `String`
Default value: null

Target directory of .scss file.

#### output
Type: `String`
Default value: null

Name for the .scss file.

#### options.requirepng
Type: `String`
Default value: false

Set true if PNG fallbacks are declared

#### options.pngsource
Type: `String`
Default value: null

Source directory of the fallback .png file.

#### options.svgtest
Type: `String`
Default value: `no-svg`

Class used to detect fallback to png, default is modernizr's 'no-svg'.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
*	v0.1.3	Fixed PNG issues
*	v0.1.2	Removed underscore from 'svgextend' & added more useful grunt logs
*	v0.1.1	Fixed PNG path issue and updated readme
*	v0.1.0	Added PNG fallback option, choose a test class (e.g. no-svg) and a path to the fallback .png
*	v0.0.2	Update to package.json
*	v0.0.1	Initial commit

## License
Copyright (c) 2014 Thomas Digby. Licensed under the MIT license.
