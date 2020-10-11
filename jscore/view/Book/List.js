/**
 * Список книг
 */
Ext.define('Swan.view.Book.List', {
	extend: 'Ext.grid.Panel',
	requires: [
		'Swan.view.Book.EditWindow'
	],
	store: {
		proxy: {
			type: 'ajax',
			url: 'index.php/Book/loadList',
			reader: {
				type: 'json',
				idProperty: 'book_id'
			}
		},
		autoLoad: true,
		remoteSort: false,
		sorters: [{
			property: 'book_name',
			direction: 'ASC'
		}]
	},
	defaultListenerScope: true,
	columns: [{
		dataIndex: 'author_name',
		text: 'Автор',
		width: 150
	}, {
		dataIndex: 'book_name',
		text: 'Название книги',
		flex: 1
	}, {
		dataIndex: 'book_year',
		text: 'Год издания',
		width: 150
	}],

	initComponent: function() {
		const me = this;

		me.tbar = [{
			text: 'Добавить',
			handler: function() {
				const wnd = Ext.create('Swan.view.Book.EditWindow');

				wnd.show({
					callback: function() {
						me.store.reload();
					}
				});
			}
		}, {
			text: 'Редактировать',
			handler: function() {
				if (me.selection.data) {
					const wnd = Ext.create('Swan.view.Book.EditWindow');
					wnd.show({
						data: me.selection.data,
						callback: function() {
							me.store.reload();
						}
					});
				}
			}
		}, {
			text: 'Удалить',
			handler: function() {
				// todo надо реализовать удаление
				Ext.Msg.alert('В разработке', 'Данный функционал ещё не реализован');
			}
		}, {
			text: 'Экспорт в XML',
			handler: function() {
				// todo надо реализовать удаление
				Ext.Msg.alert('В разработке', 'Данный функционал ещё не реализован');
			}
		}];

		me.callParent();
	}
});