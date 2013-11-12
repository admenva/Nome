/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),

		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			server: {
				src: ['src/server/**/*.js'],
				dest: 'build/<%= pkg.name %>-server.js'
			},
			client: {
				src: ['src/client/**/*.js'],
				dest: 'build/<%= pkg.name %>-client.js'
			}
		},

		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			client: {
				src: '<%= concat.client.dest %>',
				dest: 'build/<%= pkg.name %>-client.min.js'
			}
		},

		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				globals: {
					'require': false,
					'define': false,
					'module': false,
					'exports': false,
					'console': false
				}
			},

			gruntfile: {
				src: 'Gruntfile.js'
			},

			lib_test: {
				src: ['src/**/*.js', 'test/**/*.js']
			}
		},

		nodeunit: {
			files: ['test/**/*_test.js']
		},

		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},

			lib_test: {
				files: '<%= jshint.lib_test.src %>',
				tasks: ['default']
			}/*,

			lib_test: {
				files: '<%= jshint.lib_test.src %>',
				tasks: ['jshint:lib_test', 'nodeunit']
			}*/
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task.
	grunt.registerTask('default', ['jshint', /*'nodeunit',*/ 'concat', 'uglify']);

};
