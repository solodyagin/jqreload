/*
 * jqReload - jQuery plugin for autoreload information in Bootstrap Panels
 * Based on https://github.com/saschavv/bootstrap-reload
 * @license: MIT
 * @version: 1.0.2
 * @requires: jQuery v1.12.4+, Font Awesome v4.7.0+, Bootstrap v3.3.7
 */

(function ($) {
	'use strict';
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
	var jqReload = function ($e, options) {
		var _data = $e.data('jqreload');
		var _userOptions = (typeof options === 'function') ? {afterLoad: options} : options;
		var _options = $.extend({}, $.jqreload.defaults, _userOptions, _data || {});
		var _init = function () {
			_options.reloadContainer = $e.find('.reload-container'); // Container of animation
			_options.reloadButton = $e.find('.reload-button');
			_options.reloadButton.click(function () {
				_observe();
				return false;
			});
			_options.reloadData = $e.find('.reload-data'); // Container of data
			// Set timer of initial load
			if (_options.autoLoad) {
				setTimeout(function () {
					_observe();
				}, _options.delay);
			}
			// Set timer of autoreload
			if (_options.autoReload) {
				setInterval(function () {
					_observe();
				}, _options.interval);
			}
		};
		var _load = function() {
			_options.reloadButton.addClass('fa-spin');
			_options.reloadContainer.fadeIn();
			$.ajax({
				type: 'GET',
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
		var _destroy = function () {
			return $e.unbind('.jqreload').removeData('jqreload');
		};
		$e.data('jqreload', $.extend({}, _data, {initialized: true}));
		_init();
		$.extend($e.jqreload, {
			config: _config,
			reload: _reload,
			destroy: _destroy
		});
	};
	$.fn.jqreload = function (options) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('jqreload');
			if (data && data.initialized) {
				return;
			}
			new jqReload($this, options);
		});
	};
})(jQuery);
