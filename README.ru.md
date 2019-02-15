# jqReload
Плагин jQuery для автообновления информации на Bootstrap панелях

Основан на плагине [bootstrap-reload](https://github.com/saschavv/bootstrap-reload)

*Read this in other languages: [English](README.md), [Russian](README.ru.md).*

## Зависимости
* [jQuery](https://github.com/jquery/jquery)
* [Bootstrap](https://github.com/twbs/bootstrap)
* [Font Awesome](https://github.com/FortAwesome/Font-Awesome)

## Применение
```html
<div class="container">
	<!-- [jqReload widget] -->
	<div class="panel panel-default" data-url="/fetch-data">
		<div class="panel-heading">jqReload Widget <a class="pull-right" href="javascript:void(0);"><span class="reload-button fas fa-sync"></span></a></div>
		<div class="panel-body reload-panel">
			<div class="reload-container"><i class="reload-spinner fas fa-spinner fa-spin fa-5x"></i></div>
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

## Настройки по умолчанию
```javascript
{
	autoLoad: true, // Первоначальная загрузка
	delay: 3000, // Задержка перед первоначальной загрузкой	
	autoReload: true, // Автообновление
	interval: 60000, // Интервал автообновления
	dataType: 'html', // Тип данных, соответствует dataType в jQuery.ajax()
	beforeLoad: false, // function ($e)
	afterLoad: false // function ($e, data)
}
```

## Примеры
Пример обновления таблицы данными, полученными в json формате: [Example 1](https://solodyagin.github.io/jquery.reload/)
