# jqReload
jQuery plugin for autoreload information in Bootstrap Panels

Based on [bootstrap-reload](https://github.com/saschavv/bootstrap-reload)

*Read this in other languages: [English](README.md), [Russian](README.ru.md).*

## Dependency
* [jQuery](https://github.com/jquery/jquery)
* [Bootstrap](https://github.com/twbs/bootstrap)
* [Font Awesome](https://github.com/FortAwesome/Font-Awesome)

## Usage
```html
<div class="container">
	<!-- [jqReload widget] -->
	<div class="panel panel-default" data-url="/fetch-data">
		<div class="panel-heading">jqReload Widget <a class="pull-right" href="javascript:;"><span class="reload-button fa fa-refresh"></span></a></div>
		<div class="panel-body reload-panel">
			<div class="reload-container"><i class="reload-spinner fa fa-spinner fa-spin fa-5x"></i></div>
			<div class="reload-data">
			<!-- The Received data will be placed here -->
			</div>
		</div>
	</div>
	<!-- [/jqReload widget] -->
</div>
```
```javascript
$(".panel").jqreload(options);

```

## Options / Defaults
```javascript
{
	autoLoad: true, // Initial load
	delay: 3000, // Delay of initial load
	autoReload: true, // Autoreload
	interval: 60000, // Interval of autoreload
	dataType: 'html', // The type of data that you're expecting back from the server (see jQuery.ajax())
	beforeLoad: false, // function ($e)
	afterLoad: false // function ($e, data)
}
```

## Examples
An example of updating a table with data obtained in json format: [Example](https://solodyagin.github.io/jquery.reload/)
