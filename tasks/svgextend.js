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

	grunt.registerMultiTask('svg_extend', 'Converts SVG files to a series of SASS placeholders with base64 encoded SVGs with optional PNG fallbacks', function () {

		var options = this.data,
			path = require('path'),
			cheerio = require('cheerio'),
			sourceDir = path.normalize('./'),
			targetDir = path.normalize('./'),
			pngPath = path.normalize('./'),
			scssFile,
			svgs = [];

		// get date
		function getDateTime() {

			// get time
			var date = new Date(),
				sec = date.getSeconds(),
				hour = date.getHours(),
				min = date.getMinutes(),
				day = date.getDate(),
				month = date.getMonth() + 1,
				year = date.getFullYear();

			// prettify
			hour = (hour < 10 ? "0" : "") + hour;
			min = (min < 10 ? "0" : "") + min;
			sec = (sec < 10 ? "0" : "") + sec;
			month = (month < 10 ? "0" : "") + month;
			day = (day < 10 ? "0" : "") + day;

			// return
			return year + "/" + month + "/" + day + " at " + hour + ":" + min + ":" + sec;
		}

		function buildFile (options) {

			sourceDir = path.normalize(options.source + '/');
			targetDir = path.normalize(options.target + '/');
			scssFile = targetDir + '_icons.scss';

			if (options.options != 'undefined') {
				pngPath = path.normalize(options.options.pngPath + '/');
			}

			console.log('');
			if (!grunt.file.exists(targetDir)) {
				console.log('-> ' + scssFile + ' created');
				grunt.file.mkdir(targetDir);
			} else {
				console.log('-> ' + scssFile + ' updated');
			}

			getSVG(function () {
				createFile();
			});
		};

		function createFile () {

			var code = '',
				cssContent = ['/** #file generated with svg-extend on ' + getDateTime() + ' */'];

			svgs.forEach(function (icon) {

				var prefix = "data:image/svg+xml;charset=US-ASCII,",
					dataURI = prefix + encodeURIComponent(icon.svg
					//strip newlines and tabs
					.replace(/[\n\r]/gmi, "")
					.replace(/\t/gmi, " ")
					//strip comments
					.replace(/<\!\-\-(.*(?=\-\->))\-\->/gmi, "")
					//replace
					.replace(/'/gmi, "\\i"));

				var className = icon.id,
					hasPng = pngPath != 'undefined' ? '.no-svg & {background-image: url(\'' + pngPath + className + '.png\');}' : '',
					css = [
					'%' + className + ' {',
						'background-image: url(\'' + dataURI + '\');',
						hasPng,
					'}'
					].join('');

				cssContent.push(css);
			});

			grunt.file.write(scssFile, cssContent.join("\n").replace(/\.min/g, ""));
			//console.log(cssContent);
		};

		function getSVG(cb) {
			console.log("");

			var i = 0;
			grunt.file.recurse(sourceDir, function (abspath, rootdir, subdir, filename) {

				console.log(filename);

				if (path.extname(filename) != '.svg') {
					return;
				}
				addToArray(sourceDir + '/' + filename);
				i++;
			});
			if (i == 0) {
				console.log("");
				console.log("  Error: no SVG Files found in " + sourceDir);
				console.log("");
			} else {
				console.log("");
				console.log("-> " + svgs.length + " icons created");
				console.log("");
				cb();
			}
		};

		function addToArray(file) {

			var id = path.basename(file, '.svg'),
				svgXml = grunt.file.read(file),
				$ = cheerio.load(svgXml, {
					ignoreWhitespace: false,
					xmlMode: true
				});

			svgs.push({
				id: id,
				svg: $.root().html().toString()
			});
		}

		// if no source declared, throw error
		if (!options.source) {
			throw new Error('SVG source folder must be defined');
		}

		// build .scss file
		buildFile(options);
	});

};
