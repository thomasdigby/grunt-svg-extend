/*
 * grunt-svg-extend
 * https://github.com/thomasdigby/grunt-svg-extend.git
 *
 * Copyright (c) 2014 Thomas Digby
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('svgextend', 'Converts SVG files to a series of SASS placeholders with encoded SVGs and optional PNG fallbacks', function () {

		var path = require('path'),
			cheerio = require('cheerio'),
			data = this.data,
			imgArray = [],
			source,
			target,
			output,
			requirePng = data.options.requirepng ? data.options.requirepng : false,
			pngSource,
			svgTest = 'no-svg',
			scss;

		// if no source declared, throw error
		if (!data.source) {
			throw new Error('SVG source folder must be defined');
		}

		// init
		init(data);

		// main
		function init() {

			// get params from gruntfile.js
			getCustomParams();

			// create directory
			createDir();

			// get all images from source folder
			collectImg(function () {
				createScss();
			});
		};
		function collectImg(callback) {

			var i = 0;
			// spacer
			console.log('');

			// for each file in source directory
			grunt.file.recurse(source, function (abspath, rootdir, subdir, filename) {

				// log out name
				console.log(filename);

				// if file is svg, add to array
				if (path.extname(filename) === '.svg') {
					addToArray(source + '/' + filename);
					i++;
				} else {
					return;
				}
			});

			// if no svgs are found, return error
			if (i == 0) {
				grunt.log.errorlns(source + ' contains no SVGs');
				console.log('');
			} else {
				console.log('');
				grunt.log.ok(imgArray.length + ' icons created');
				callback();
			}
		};
		function createScss() {

			var content = ['/* Compiled by grunt-svg-extend */'];

			imgArray.forEach(function (icon) {

				// create svg string & remove newlines, tabs & comments
				var svgPrefix = "data:image/svg+xml;charset=US-ASCII,",
					encodedURI = svgPrefix + encodeURIComponent(icon.svg.replace(/[\n\r]/gmi, "").replace(/\t/gmi, " ").replace(/<\!\-\-(.*(?=\-\->))\-\->/gmi, "").replace(/'/gmi, "\\i")),
					pngCode = '.' + svgTest + ' & { background-image: url(\'' + pngSource + icon.id + '.png\'); }',
					fallback = requirePng ? pngCode : '';

				// create
				var css = [
					'%' + icon.id + ' {',
						'background-image: url(\'' + encodedURI + '\');',
						fallback,
					'}'
					].join('');

				content.push(css);
			});

			grunt.file.write(scss, content.join("\n").replace(/\.min/g, ""));
		};

		// utils
		function addToArray(file) {

			var id = path.basename(file, '.svg'),
				svgXml = grunt.file.read(file),
				$ = cheerio.load(svgXml, {
					ignoreWhitespace: false,
					xmlMode: true
				});

			imgArray.push({
				id: id,
				svg: $.root().html().toString()
			});
		};
		function createDir() {
			// if target directory does not exist
			if (!grunt.file.exists(target)) {
				console.log('');
				console.log('> ' + scss + ' created');
				// create directory
				grunt.file.mkdir(target);
			}
		};
		function getCustomParams() {

			// save params
			source = path.normalize(data.source + '/');
			target = path.normalize(data.target + '/');
			output = data.output;
			scss = target + output + '.scss';

			// if pngs are required
			if (requirePng) {
				svgTest = data.options.svgtest != undefined ? data.options.svgtest : 'no-svg';
				pngSource = data.options.pngsource != undefined ? data.options.pngsource : '/';
			}
		};
	});
};