var path = require('path');
module.exports = function(sails) {

  return {

    /**
     * Default configuration
     *
     * We do this in a function since the configuration key for
     * the hook is itself configurable, so we can't just return
     * an object.
     */
    defaults: {

      __configKey__: {
        // Turn traceur compile on by default
        compile: true
      }
    },

    /**
     * Initialize the hook
     * @param  {Function} cb Callback for when we're done initializing
     */
    initialize: function(cb) {

      // If the hook has been deactivated, just return
      if (!sails.config[this.configKey].compile) {
        sails.log.verbose("Traceur hook deactivated.");
        return cb();
      }

      //Load Traceur and override the default require; with async/await on.
      require('traceur').require.makeDefault(function(filename) {
        // don't transpile our dependencies, just our app
        return filename.indexOf('node_modules') === -1;
      }, { asyncFunctions: true });

      sails.log.verbose("Traceur activated. Enjoy ES6/7 power in your Sails app.");

      // We're done initializing.
      return cb();

    },

  };

};
