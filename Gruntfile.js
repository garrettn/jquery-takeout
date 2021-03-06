'use strict';

module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed MIT */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg._pluginName %>.js'],
        dest: 'dist/jquery.<%= pkg._pluginName %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/jquery.<%= pkg._pluginName %>.min.js'
      }
    },
    qunit: {
      all: {
        options: {
          urls: ['', '-1edge', '-2edge'].map(function (version) {
            return 'http://localhost:9000/test/<%= pkg._pluginName %>' + version + '.html';
          })
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      }
    },
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 9000
        }
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json', '<%= pkg._pluginName %>.jquery.json'],
        updateConfigs: ['pkg'],
        commitFiles: ['package.json', 'bower.json', '<%= pkg._pluginName %>.jquery.json', 'dist/jquery.<%= pkg._pluginName %>.js', 'dist/jquery.<%= pkg._pluginName %>.min.js', 'CHANGELOG.md'],
        pushTo: ['origin']
      }
    },
    changelog: {
      options: {

      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'connect', 'qunit', 'clean', 'concat', 'uglify']);
  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('test', ['jshint', 'connect', 'qunit']);

  grunt.registerTask('release', 'Alias for "bump-only", "changelog", and "bump-commit" tasks.', function (versionType) {
    grunt.task.run('bump-only' + (versionType ? ':' + versionType : ''));
    grunt.task.run('default');
    grunt.task.run('changelog');
    grunt.task.run('bump-commit');
  });
};
