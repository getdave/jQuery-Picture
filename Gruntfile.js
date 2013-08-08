'use strict';

var path = require('path');


module.exports = function(grunt) {

        // load all grunt tasks
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

        grunt.initConfig({


        // watch for changes and trigger compass, jshint, uglify and livereload
        watch: {
            options: {
                livereload: true,
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint', 'uglify']
            },
        },



        // javascript linting with jshint
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                "force": true
            },
            all: [
                'Gruntfile.js',
                'js/jquery-picture.js'
            ]
		},

        // uglify to concat, minify, and make source maps
        uglify: {
            dist: {
                options: {
                    sourceMap: 'js/map/source-map.js'
                },
                files: {
                    'js/jquery-picture.min.js': [
                        'js/jquery-picture.js'
                    ]
                }
            }
        },
    });



    // register task
    grunt.registerTask('default', [
        'watch'
    ]);

};
