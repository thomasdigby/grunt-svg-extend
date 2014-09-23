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
		svg_extend: {
			all: {
				source: 'images/dist/svg/',
				target: 'css/scss/',
				options: {
					pngPath: 'images/dist/png/'
				}
				//outputname: '_icons'
			}
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// By default, lint and run all tests.
	grunt.registerTask('default', ['svg_extend']);

};
