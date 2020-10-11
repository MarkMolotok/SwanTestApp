Ext.define('Swan.view.Book.EditWindow', {
	extend: 'Ext.window.Window',
    title: 'Книга',
    height: 230,
    width: 400,
    layout: 'fit',
    /*items: {
        xtype: 'grid',
        border: false,
        columns: [{header: 'World'}],                 // One header just for show. There's no data,
        store: Ext.create('Ext.data.ArrayStore', {}) // A dummy empty data store
    }*/

    doSave: function() {
        const me = this;

        if (!me.formPanel.isValid()) {
            Ext.Msg.alert('Ошибка', 'Не заполнены обязательные поля');
            return;
        }

        me.formPanel.submit({
            success: function(form, action) {
                me.callback();
                me.hide();
            },
            failure: function(form, action) {
                if (!action.result) {
                    Ext.Msg.alert('Ошибка', 'Ошибка при сохранении даннных');
                } else {
                    Ext.Msg.alert('Ошибка', action.result.msg);
                }
            }
        });
    },

    show: function() {
        const me = this;

        me.callback = function(){};

        me.callParent();

        if (arguments[0] && arguments[0].data) {
            me.formPanel.getForm().setValues(arguments[0].data);
        }
        if (arguments[0] && arguments[0].callback) {
            me.callback = arguments[0].callback;
        }
    },

    initComponent: function() {
        const me = this;

        me.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            url: 'index.php/Book/save',

            // Fields will be arranged vertically, stretched to full width
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },

            // The fields
            defaultType: 'textfield',
            items: [{
                xtype: 'hidden',
                name: 'book_id'
            }, {
                fieldLabel: 'Автор',
                name: 'author_name',
                allowBlank: false
            }, {
                fieldLabel: 'Название',
                name: 'book_name',
                allowBlank: false
            }, {
                xtype: 'numberfield',
                fieldLabel: 'Год издания',
                name: 'book_year',
                allowBlank: false,
                maxLength: 4
            }],
            buttons: [{
                text: 'Сохранить',
                handler: function() {
                    me.doSave();
                }
            }, '->' , {
                text: 'Отмена',
                handler: function() {
                    me.hide();
                }
            }]
        });

        me.items = [
            me.formPanel
        ];

        //renderTo: Ext.getBody()

        me.callParent();
    }
});