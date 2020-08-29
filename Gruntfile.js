module.exports = function (grunt) {
	"use strict";

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// JS
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
					' * <%= pkg.plugin.companySite %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.plugin.companyName %>\n' +
					' * Licensed GPLv2+' +
					' */\n',
				separator: ';\r\n'
			},
			dist: {
				src: [
					'assets/js/*.js',
					'!assets/js/*min.js'
				],
				dest: 'assets/js/all.js'
			},
			distMin: {
				src: [
					'!assets/js/*min.js',
					'assets/js/*.js'
				],
				dest: 'assets/js/all.min.js'
			}
		},
		uglify: {
			project: {
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * <%= pkg.homepage %>\n' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.plugin.companyName %>\n' +
						' * Licensed GPLv2+' +
						' */\n',
					report: 'min',
					compress: {
						drop_console: true,
						sequences: false
					}
				},
				files: [{
					expand: true,
					src: ['*.js', '!*.min.js'],
					dest: 'assets/js',
					cwd: 'assets/js',
					rename: function (dst, src) {
						// To keep the source js files and make new files as `*.min.js`:
						return dst + '/' + src.replace('.js', '.min.js');
					}
				}]
			},
			vendor: {
				options: {
					report: 'min',
					compress: {
						drop_console: true,
						sequences: false
					}
				},
				files: {
					// 'assets/vendor/flowtype.min.js': ['assets/vendor/flowtype.js']
				}
			}
		},
		jshint: {
			gruntfile: {
				options: {
					jshintrc: '.gruntjshintrc'
				},
				src: ['Gruntfile.js']
			},
			project: {
				options: {
					jshintrc: '.jshintrc'
				},
				expand: true,
				cwd: 'assets/js',
				src: [
					'*.js',
					'!*.min.js'
				]
			}
		},
		bower: {
			all: {
				dest: 'assets/vendor/',
				// js_dest: 'assets/vendor/js/',
				// css_dest: 'assets/vendor/css/',
				// fonts_dest: 'assets/vendor/fonts/',
				// images_dest: 'assets/vendor/images/',
				options: {
					expand: true
				}
			}
		},

		// Images
		imagemin: {
			plugin: {
				options: {
					optimizationLevel: 3,
					svgoPlugins: [{removeViewBox: false}]
				},
				files: [{
					expand: true,
					cwd: 'assets/images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'assets/images/'
				}]
			}
		},

		// PHP
		// Lint .php files for syntax errors
		phpdoc: {
			dist: {
				src: [
					'**/*.php',
					'!vendor/**',
					'!**/vendor/**',
					'!node_modules/**',
					'!**/node_modules/**',
				],
				dest: 'docs/php'
			}
		},
		phplint: {
			all: ['*.php', 'includes/**/*.php']
		},
		phpcs: {
			all: {
				src: ['*.php', 'includes/**/*.php']
			},
			options: {
				bin: 'vendor/squizlabs/php_codesniffer/bin/phpcs',
				standard: '.phpcs.plugin.xml.dist',
				reportFile: 'docs/phpcs.txt',
			}
		},
		phpcbf: {
			app: {
				src: ['*.php', 'includes/**/*.php']
			},
			options: {
				bin: 'vendor/squizlabs/php_codesniffer/bin/phpcbf',
				standard: '.phpcs.plugin.xml.dist',
				callback: 'docs/phpcbf.txt',
			}
		},
		phpunit: {
			all: {
				dir: 'tests/',
				cmd: 'phpunit',
				args: ['-c', 'phpunit.xml']
			}
		},

		// i18n
		// Check text domain is last argument of i18n functions
		checktextdomain: {
			options: {
				report_variable_domain: false,
				correct_domain: true,
				text_domain: '<%= pkg.name %>',
				keywords: [
					'__:1,2d',
					'_e:1,2d',
					'_x:1,2c,3d',
					'_ex:1,2c,3d',
					'_n:1,2,4d',
					'_nx:1,2,4c,5d',
					'_n_noop:1,2,3d',
					'_nx_noop:1,2,3c,4d',
					'esc_attr__:1,2d',
					'esc_html__:1,2d',
					'esc_attr_e:1,2d',
					'esc_html_e:1,2d',
					'esc_attr_x:1,2c,3d',
					'esc_html_x:1,2c,3d'
				]
			},
			files: {
				expand: true,
				src: [
					'*.php',
					'includes/**/*.php'
				]
			}
		},
		makepot: {
			target: {
				options: {
					cwd: '',
					domainPath: 'languages',
					exclude: [],
					include: [],
					mainFile: '',
					potComments: '',
					potFilename: '',
					potHeaders: {
						poedit: true,
						'plural-forms': 'nplurals=2; plural=n != 1;',
						// 'x-poedit-keywordslist': true,
						'Report-Msgid-Bugs-To': '<%= pkg.plugin.bugsURL %>',
						'x-poedit-language': 'English',
						'x-poedit-country': 'UNITED STATES',
						'x-poedit-sourcecharset': 'utf-8',
						'x-poedit-keywordslist': '__;_e;_x:1,2c;_ex:1,2c;_n:1,2;_nx:1,2,4c;_n_noop:1,2;_nx_noop:1,2,3c;esc_attr__;esc_html__;esc_attr_e;esc_html_e;esc_attr_x:1,2c;esc_html_x:1,2c;',
						'x-poedit-bookmarks': '',
						'x-poedit-searchpath-0': '.',
						'x-textdomain-support': 'yes'
					},
					processPot: null,
					type: 'wp-plugin',
					updateTimestamp: true,
					updatePoFiles: false
				}
			}
		},
		addtextdomain: {
			options: {
				textdomain: '<%= pkg.plugin.langDomain %>',
				updateDomains: true
			},
			target: {
				files: {
					src: [
						'*.php',
						'**/*.php',
						'!node_modules/**',
						'!tests/**'
					]
				}
			}
		},

		// SASS
		compass: {
			dev: {
				sassDir: 'assets/scss',
				cssDir: 'assets/css',
				imagesDir: 'assets/images',
				javascriptsDir: 'assets/js',
				fontsDir: 'assets/fonts',
				environment: 'development',
				outputStyle: 'expanded',
				relativeAssets: true,
				noLineComments: true
			},
			prod: {
				sassDir: 'assets/scss',
				cssDir: 'assets/css',
				imagesDir: 'assets/images',
				javascriptsDir: 'assets/js',
				fontsDir: 'assets/fonts',
				environment: 'production',
				outputStyle: 'compressed',
				relativeAssets: true,
				noLineComments: true,
				force: true
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'assets/css',
					src: ['*.css', '!*.min.css'],
					dest: 'assets/css',
					ext: '.min.css'
				}]
			}
		},

		// Readme
		wp_readme_to_markdown: {
			your_target: {
				files: {
					'README.md': 'readme.txt'
				}
			},
		},

		// Versioning
		changelog: {
			plugin: {
				options: {
					dest: 'release-notes/<%= package.version %>.txt',
					logArguments: [
						'--pretty=* %h - %ad: %s',
						'--no-merges',
						'--date=short'
					],
					template: '{{> features}}',
					featureRegex: /^(.*)$/gim,
					partials: {
						features: '{{#if features}}{{#each features}}{{> feature}}{{/each}}{{else}}{{> empty}}{{/if}}\n',
						feature: '- {{this}} {{this.date}}\n'
					}
				}
			}
		},
		bump: {
			options: {
				files: ['package.json', 'composer.json'],
				updateConfigs: ['pkg'],
				commit: false,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json', 'composer.json'],
				createTag: false,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: false,
				pushTo: 'upstream',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: false,
				prereleaseName: false,
				metadata: '',
				regExp: false
			}
		},
		replace: {
			plugin_file: {
				src: ['<%= pkg.plugin.pluginFile %>'],
				overwrite: true,
				replacements: [{
					from: /Version:\s*(.*)/,
					to: "Version:         <%= pkg.version %>"
				}]
			},
			plugin_file_defined: {
				src: ['<%= pkg.plugin.pluginFile %>'],
				overwrite: true,
				replacements: [{
					from: /VERSION'\s*(.*)/,
					to: "VERSION', '<%= pkg.version %>' );"
				}]
			},
			reamde_md: {
				src: ['README.md'],
				overwrite: true,
				replacements: [{
					from: /~Current Version:\s*(.*)~/,
					to: "~Current Version: <%= pkg.version %>~"
				}, {
					from: /Latest Stable Release:\s*\[(.*)\]\s*\(https:\/\/github.com\/pods-framework\/pods\/releases\/tag\/(.*)\s*\)/,
					to: "Latest Stable Release: [<%= pkg.git_tag %>](https://github.com/pods-framework/pods/releases/tag/<%= pkg.git_tag %>)"
				}]
			},
			reamde_txt: {
				src: ['readme.txt'],
				overwrite: true,
				replacements: [{
					from: /Stable tag: (.*)/,
					to: "Stable tag: <%= pkg.version %>"
				}]

			},
		},

		// Gitops
		gittag: {
			addtag: {
				options: {
					tag: '<%= pkg.version %>',
					message: 'Version <%= pkg.version %>'
				}
			}
		},
		gitcommit: {
			commit: {
				options: {
					message: 'Version <%= pkg.version %>',
					noVerify: true,
					noStatus: false,
					allowEmpty: true
				},
				files: {
					src: ['README.md', 'readme.txt', '<%= pkg.plugin.pluginFile %>', 'package.json', 'composer.json', 'languages/**']
				}
			}
		},
		gitpush: {
			push: {
				options: {
					tags: true,
					remote: 'origin',
					branch: 'master'
				}
			}
		},

		// Dist
		composer : {
			options : {
				cwd: 'build/temp/',
				composerLocation: '/usr/local/bin/composer'
			},
			build: {
				options : {
					flags: ['no-dev', 'optimize-autoloader', 'prefer-dist'],
					cwd: 'build/temp/'
				}
			}
		},
		copy: {
			bower: {
				cwd: 'assets/bower_components',
				expand: true,
				flatten: true,
				src: [
					// 'Pristine/dist/*.js'
				],
				dest: 'assets/vendor/'
			},
			build: {
				src: [
					'**',
					'!node_modules/**',
					'!Gruntfile.js',
					'!package.json',
					'!yarm.lock',
					// '!composer.json',
					'!composer.lock',
					'!readme.txt',
					'!config.rb',
					'!yarn.lock',
					'!*.bak',
					'!bower.json',
					'!phpunit.xml.dist',
					'!build/**',
					'!vendor/**',
					'!bin/**',
					'!docs/**',
					'!tests/**',
					'!scss/**',
					'!*.bak/**',
					'!assets/bower_components/**'
				],
				dest: 'build/temp/'
			},
		},
		clean: {
			build: {
				src: [
					'build/temp/',
				]
			}
		},
		compress: {
			build: {
				options: {
					mode: 'zip',
					archive: 'build/<%= pkg.name %>.<%= pkg.version %>.zip'
				},
				expand: true,
				cwd: 'build/temp/',
				src: [
					'*',
					'assets/css/**',
					'assets/js/**',
					'assets/images/**',
					'assets/vendor/**',
					'includes/**',
					'languages/**',
					'vendor/**',
					// '!docs',
					// '!composer.lock',
					// '!Gruntfile.js',
					// '!bin/**',
					// '!tests/**',
					// '!assets/js/src/**',
					// '!.git',
					// '!.DS_Store',
					// '!build',
					// '!*.bak',
					// '!node_modules',
					// '!assets/bower_components/**',
					// '!CONTRIBUTING.md',
					// '!config.rb',
					// '!bower.json',
					// '!composer.json',
					// '!package.json',
					// '!phpunit.xml.dist'
				],
				dest: '<%= pkg.name %>/'
			}
		},

		// Watching
		watch: {
			compass: {
				files: 'config.rb',
				tasks: ['compass', 'notify:css']
			},
			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile'],
			},
			js: {
				options: {
					debounceDelay: 500
				},
				files: ['<%= concat.dist.src %>'],
				tasks: ['jshint:project', 'uglify:project', 'notify:js']
				// tasks: ['jshint:project', 'concat', 'uglify:project', 'notify:js']
			},
			css: {
				options: {
					debounceDelay: 500
				},
				files: ['**/*.scss', '!node_modules/**', '!vendor/**'],
				tasks: ['compass', 'cssmin', 'notify:css']
			},
			php: {
				options: {
					debounceDelay: 500
				},
				files: ['*.php', '**/*.php', '!node_modules/**'],
				tasks: ['phplint', 'addtextdomain', 'checktextdomain', 'makepot', 'notify:php']
			},
			images: {
				options: {
					debounceDelay: 500
				},
				files: ['**/*.{png,jpg,gif}'],
				tasks: ['imagemin', 'notify:images']
			}
		},
		notify: {
			js: {
				options: {
					title: '"JavaScript"',
					message: '"JavaScript code combined and uglified"'
				}
			},
			php: {
				options: {
					title: '"PHP tasks complete"',
					message: '"All PHP tasks complete"'
				}
			},
			css: {
				options: {
					title: '"SCSS tasks complete"',
					message: '"SCSS files compressed"'
				}
			},
			images: {
				options: {
					title: '"Images tasks complete"',
					message: '"Images files compressed"'
				}
			}
		}
	});

	// Register tasks.
	grunt.registerTask('default', [
		'readme',
		'watch'
	]);
	grunt.registerTask('readme', ['wp_readme_to_markdown']);
	grunt.registerTask('dependencies', [
		'bower',
		'copy:bower',
		'uglify:vendor'
	]);
	grunt.registerTask('test', [
		'phplint',
		'checktextdomain',
		'jshint',
		'phpdoc',
		'phpunit',
		'phpcbf',
		'phpcs'
	]);
	grunt.registerTask('readpkg', 'Read in the package.json file', function () {
		grunt.config.set('pkg', grunt.file.readJSON('./package.json'));
	});
	grunt.registerTask('version', 'Updates version for the plugin', function (step) {
		if (step === undefined) {
			step = 'patch';
		}
		if (!['patch', 'minor', 'major'].includes(step)) {
			grunt.log.writeln('Invalid step for version upgrade:' + step);
			grunt.log.writeln('\n');
			grunt.log.writeln('grunt version - updates patch version\ngrunt version:patch - updates patch version\ngrunt version:minor - updates to next minor version\ngrunt version:major - updates to next major version\n\n');
			return;
		}
		grunt.task.run(['bump:' + step, 'readpkg', 'version_replace']);
	});
	grunt.registerTask('version_replace', [
		'replace:reamde_md',
		'replace:reamde_txt',
		'replace:plugin_file',
		'replace:plugin_file_defined'
	]);
	grunt.registerTask('lang', [
		'checktextdomain',
		'addtextdomain',
		'makepot'
	]);
	grunt.registerTask('build', [
		'uglify',
		'imagemin',
		'compass:prod',
		'cssmin',
		'copy:build',
		'composer:install:no-dev',
		'compress',
		// 'clean',
	]);

	// Review Tasks
	grunt.registerTask('release', [
		'readme',
		'version',
		'gitcommit:version',
		'gittag:addtag',
		'gitpush:version',
		'gitpush:tag'
	]);
	grunt.registerTask('git:commit', ['gitcommit']);
	grunt.registerTask('dogit', [
		'gitcommit',
		'gittag',
		'gitpush'
	]);
};
