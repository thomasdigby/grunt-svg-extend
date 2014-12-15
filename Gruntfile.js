/*
 * grunt-svg-extend
 * https://github.com/thomasdigby/grunt-svg-extend.git
 *
 * Copyright (c) 2014 Thomas Digby
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// load all npm grunt tasks
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		svgextend: {
			all: {
				options: {
					requirePng: true,
					pngDir: 'images/dist/png/',
					featureTest: 'no-svg'
				},
				inputDir: 'images/dist/svg/',
				outputDir: 'css/scss/',
				outputName: '_icons',
				outputType: 'mixin'
			}
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['svgextend']);
};
