var grunt = require('grunt');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.initConfig({
	uglify: {
	    my_target: {
	      files: {
	        'js/alljs.min.js': ['lib/*','js/config.js','js/model.js','js/tableService.js','js/controller.js']
	      }
	    }
	  }
});
grunt.registerTask('default', ['uglify']);