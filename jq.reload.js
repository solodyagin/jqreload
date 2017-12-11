/*
 * jqReload - плагин jQuery для автообновления информации на bootstrap-панелях
 * Основан на https://github.com/saschavv/bootstrap-reload
 * Лицензия: MIT
 * Версия: 1.0
 * @requires jQuery v1.12.4+, Font Awesome v4.7.0+, Bootstrap v3.3.7
 */

(function ($) {
	'use strict';
	$.jqreload = {
		defaults: {
			autoLoad: true, // Первоначальная загрузка
			idle: 3000, // Задержка перед первоначальной загрузкой	
			autoReload: true, // Автообновление
			interval: 60000, // Интервал автообновления
			beforeLoad: false, // function ($e)
			afterLoad: false // function ($e, data)
		}
	};
	var jqReload = function ($e, options) {
		var _data = $e.data('jqreload');
		var _userOptions = (typeof options === 'function') ? {afterLoad: options} : options;
		var _options = $.extend({}, $.jqreload.defaults, _userOptions, _data || {}); // Устанавливаем конфигурационные параметры
		var _init = function () {
			_options.reloadContainer = $e.find('.reload-container'); // Контейнер для анимации обновления
			_options.reloadButton = $e.find('.reload-button');
			_options.reloadButton.click(function () {
				_observe();
				return false;
			});
			_options.reloadData = $e.find('.reload-data'); // Контейнер для данных после обновления
			// Устанавливаем таймер первоначальной загрузки
			if (_options.autoLoad) {
				setTimeout(function () {
					_observe();
				}, _options.idle);
			}
			// Устанавливаем таймер автообновления
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
				dataType: 'json',
				async: true,
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
