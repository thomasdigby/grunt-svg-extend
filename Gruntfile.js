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

	grunt.loadTasks('tasks');

	grunt.registerTask('default', ['svg_extend']);
};
