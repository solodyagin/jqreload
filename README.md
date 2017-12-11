# jqReload
Плагин jQuery для автообновления информации на bootstrap-панелях

Основан на плагине [bootstrap-reload](https://github.com/saschavv/bootstrap-reload)

Пример обновления таблицы:

```html
<script src="//code.jquery.com/jquery-1.12.4.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<script>
$('#panel1').jqreload({
	idle: 4000,
	interval: 60000,
	beforeLoad: function ($e) {
		$e.find('.reload-data table').empty();
	},
	afterLoad: function ($e, data) {
		var $table = $e.find('.reload-data table');
		$.each(data, function (key, value) {
			$('<tr><td>' + key + '</td><td>' + value + '</td></tr>').appendTo($table);
		});
	}
});
</script>
<style>
	.reload-panel {
		min-height: 180px;
		position: relative;
	}
	.reload-container {
		position: absolute;
		top: 0;
		right: 0;
		background: rgba(0,0,0,.1);
		width:100%;
		height:100%;
		display: none;
		text-align: center;
		z-index: 4;
	}
	.reload-spinner {
		padding: 30px;
		opacity: .8;
	}
</style>
<div id="panel1" class="panel panel-default" data-url="/fetch-data">
	<div class="panel-heading">Panel 1 <a class="pull-right" href="javascript:;"><span class="reload-button fa fa-refresh"></span></a></div>
	<div class="panel-body reload-panel">
		<div class="reload-container"><i class="reload-spinner fa fa-spinner fa-spin fa-5x"></i></div>
		<div class="reload-data">
			<table class="table table-bordered table-condensed"></table>
		</div>
	</div>
</div>
```
