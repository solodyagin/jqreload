module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			},
			files: ['jquery.reload.js']
		},

		uglify: {
			options: {
				output: {
					comments: '/^!/'
				}
			},
			main: {
				files: {
					'jquery.reload.min.js': 'jquery.reload.js'
				}
			}
		},

		cssmin: {
			main: {
				files: {
					'jquery.reload.min.css': 'jquery.reload.css'
				}
			}
		},

		copy: {
			main: {
				files: [{
					src: ['jquery.reload.min.js', 'jquery.reload.min.css'],
					dest: 'docs/'
				}]
			}
		},

		connect: {
			server: {
				options: {
					port: 9001,
					base: 'docs'
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			main: {
				files: ['jquery.reload.js'],
				tasks: ['check', 'minify', 'copy'],
				options: {
					atBegin: true
				}
			},
		},

	});

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('check', 'jshint');
	grunt.registerTask('minify', ['uglify', 'cssmin']);
	grunt.registerTask('server', ['copy', 'connect', 'watch']);
	grunt.registerTask('default', ['check', 'minify', 'server']);

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
};
