/*!
 * jqReload - jQuery plugin to add loader to Bootstrap panels + auto fetch data from server
 * Based on https://github.com/saschavv/bootstrap-reload
 * @author: Sergey Solodyagin (solodyagin@gmail.com)
 * @license: MIT
 * @version: 1.0.4
 * @requires: jQuery v1.12.4+, Font Awesome v5.0.0+, Bootstrap v3.3.7
 */

(function ($) {
	'use strict';

	// Define the jqreload namespace and default settings
	$.jqreload = {
		defaults: {
			autoLoad: true, // Initial load
			delay: 3000, // Delay of initial load
			autoReload: true, // Autoreload
			interval: 60000, // Interval of autoreload
			dataType: 'html', // The type of data that you're expecting back from the server (see jQuery.ajax())
			beforeLoad: false, // function ($e)
			afterLoad: false // function ($e, data)
		}
	};

	// Constructor
	var jqReload = function ($e, options) {

		// Private variables and methods
		var _data = $e.data('jqreload');
		var _userOptions = (typeof options === 'function') ? {afterLoad: options} : options;
		var _options = $.extend({}, $.jqreload.defaults, _userOptions, _data || {});

		var _init = function () {
			_options.reloadContainer = $e.find('.reload-container'); // Container of animation
			_options.reloadButton = $e.find('.reload-button');
			_options.reloadButton.click(function () {
				_reload();
				return false;
			});
			_options.reloadData = $e.find('.reload-data'); // Container of data
			if (_options.autoLoad) {
				setTimeout(function () {
					_observe();
				}, _options.delay);
			}
			if (_options.autoReload) {
				_options.reloadTimerId = setInterval(function () {
					_reload();
				}, _options.interval);
			}
		};

		var _load = function() {
			_options.reloadButton.addClass('fa-spin');
			_options.reloadContainer.fadeIn();
			$.ajax({
				method: 'GET',
				url: $e.data('url'),
				dataType: _options.dataType,
				beforeSend: function() {
					if (_options.beforeLoad) {
						_options.beforeLoad($e);
					}
				},
				success: function (data) {
					if (_options.afterLoad) {
						_options.afterLoad($e, data);
					} else {
						_options.reloadData.html(data);
					}
					_options.reloadButton.removeClass('fa-spin');
					_options.reloadContainer.fadeOut();
				}
			});
		};

		var _observe = function () {
			if ($e.is(':visible')) {
				_load();
			}
		};

		var _config = function (value) {
			if (value === undefined) {
				return _options;
			}
			$.extend(_options, value);
		};

		var _reload = function () {
			_observe();
		};

		// Remove the jqreload behavior and data from an element
		var _destroy = function () {
			if (_options.reloadTimerId !== undefined)
				clearInterval(_options.reloadTimerId);
			return $e.unbind('.jqreload').removeData('jqreload');
		};

		// Initialization
		$e.data('jqreload', $.extend({}, _data, {initialized: true}));
		_init();

		// Expose API methods via the jQuery.jqreload namespace, e.g. $('sel').jqreload.method()
		$.extend($e.jqreload, {
			config: _config,
			reload: _reload,
			destroy: _destroy
		});
	};

	// Define the jqreload plugin method and loop
	$.fn.jqreload = function (options) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('jqreload');

			// Instantiate jqReload on this element if it hasn't been already
			if (data && data.initialized) {
				return;
			}
			jqReload($this, options);
		});
	};
})(jQuery);
