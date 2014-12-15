/*
 * grunt-svg-extend
 * https://github.com/thomasdigby/grunt-svg-extend.git
 *
 * Copyright (c) 2014 Thomas Digby
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// External dependencies
	var path = require('path'),
		cheerio = require('cheerio');

	// Register task
	grunt.registerMultiTask('svgextend', 'Grunt task for converting SVGs to embedded data-uris', function () {

		var params = this.data,
			options = this.options({
				requirePng: false,
				pngDir: 'images/dist/png/',
				featureTest: 'no-svg'
			}),
			inputArray = [],
			outputContent = ['/* Compiled by grunt-svg-extend */'],
			outputFile = params.outputType === 'class' ? '.css' : '.scss';

		// initiate grunt task
		var init = function () {

			// get all svg's from source directory
			collectInput(function () {
				createOutput();
			});
		};

		var collectInput = function (cb) {

			var i = 0;

			// test input directory
			if (!grunt.file.exists(path.normalize(params.inputDir + '/'))) {
				grunt.log.writeln('');
				grunt.fail.warn('Please ensure input directory path is correct');
			}

			// for each file in source directory
			grunt.file.recurse(params.inputDir, function (abspath, rootdir, subdir, filename) {

				// log out name
				grunt.log.writeln(filename);

				// if file is svg, add to array
				if (path.extname(filename) === '.svg') {

					var id = filename.replace(/\.min.svg/g, '');

					pushToArray(id, abspath);
					i++;
				} else {
					return;
				}
			});

			// callback
			cb();
		};

		var pushToArray = function (id, svg) {

			// collate svg data
			var id = path.basename(id),
				svgXml = grunt.file.read(svg),
				$ = cheerio.load(svgXml, {
					ignoreWhitespace: false,
					xmlMode: true
				});

			// push svg to input array
			inputArray.push({
				id: id,
				svg: $.root().html().toString()
			});
		};

		// Create output file
		var createOutput = function () {

			var targetDir = path.normalize(params.outputDir + '/'),
				targetFile = params.outputDir + params.outputName + outputFile;

			if (inputArray.length < 1) {
				grunt.log.writeln('');
				grunt.fail.warn('No SVGs found');
			}

			inputArray.forEach(function (icon) {

				// create svg string & remove newlines, tabs & comments
				var prefix = "data:image/svg+xml;charset=US-ASCII,",
					encodedUri = prefix + encodeURIComponent(icon.svg.replace(/[\n\r]/gmi, "").replace(/\t/gmi, " ").replace(/<\!\-\-(.*(?=\-\->))\-\->/gmi, "").replace(/'/gmi, "\\i"));

				// test input directory
				if (params.outputType !== 'placeholder' && params.outputType !== 'mixin' && params.outputType !== 'class') {
					grunt.log.writeln('');
					grunt.fail.warn('outputType needs to be one of placeholder, mixin or class');
				}

				switch (params.outputType) {
					case 'placeholder':
						createPlaceholder(icon.id, encodedUri);
						break;
					case 'mixin':
						createMixin(icon.id, encodedUri);
						break;
					case 'class':
						createClass(icon.id, encodedUri);
						break;
				}
			});

			if (!grunt.file.exists(targetDir)) {
				grunt.file.mkdir(targetDir);
			}

			// log out name
			grunt.log.writeln('');
			grunt.log.writeln(targetFile + ' created');
			grunt.file.write(targetFile, outputContent.join('\n'));
		};
		var createPlaceholder = function (id, svg) {

			var outputFallback;

			// if pngs are required
			if (options.requirePng) {
				outputFallback = [
					'.' + options.featureTest + ' & {',
						'background-image: url(\'' + options.pngSource + id + '.png\');',
					'}'
				].join('');
			}

			// create placeholder object
			var output = [
					'%' + id + ' {',
						'background-image: url(\'' + svg + '\');',
						outputFallback,
					'}'
				].join('');

			outputContent.push(output);
		};
		var createMixin = function (id, svg) {

			var outputFallback;

			// if pngs are required
			if (options.requirePng) {
				outputFallback = [
					'.' + options.featureTest + ' & {',
						'background-image: url(\'' + options.pngSource + id + '.png\');',
					'}'
				].join('');
			}

			// create mixin object
			var output = [
				'@mixin ' + id + '() {',
					'background-image: url(\'' + svg + '\');',
					outputFallback,
				'}'
			].join('');

			outputContent.push(output);
		};
		var createClass = function (id, svg) {

			var outputFallback;

			// if pngs are required
			if (options.requirePng) {
				outputFallback = [
					'.' + options.featureTest + ' .' + id + ' {',
						'background-image: url(\'' + options.pngDir + id + '.png\');',
					'}'
				].join('');
			}

			// create class and declaration block
			var output = [
				'.' + id + ' {',
					'background-image: url(\'' + svg + '\');',
				'}',
				outputFallback,
			].join('');

			outputContent.push(output);
		};

		init();
	});
};