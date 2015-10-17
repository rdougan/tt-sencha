Ext.define('ttapp.controller.TinkChat', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
            backBtn: 'button[cls~=back-btn-icon]'
        },
		control: {
			'tinkchat': {
				show: 'renderList',
				hide: 'removeList'
			},
			'tinkchat dataview': {
				itemtap: 'onChatSelect'
			},
			'backBtn': {
				tap: 'backToTinkBox'
			}
		}
	},

	removeList: function() {
		var me = this;
		if(!Ext.isEmpty(window.fromTinkReplay)){
			if(window.fromTinkReplay == 1) {
				delete window.fromTinkReplay;
			}
		} else {
			me.list.destroy();
		}
	},

	renderList: function(component) {
		var list = Ext.create('Ext.List', {
			height: '100%',
			cls:'tinkchat-list',
			useSimpleItems: true,
			emptyText: 'No chats available.',
			itemTpl: [
				/*'<tpl if="send == 1">',*/
				'<tpl if=\'for_inbox == false\'>',
					'<div class="chat-list">',
						'<span class="left-sec">{text}</span><span class="right-sec"><span class="seconds">{seconds_sent} sec(s)</span><span class="img"><img class="tink" src="{original_trinket_file_path}"></span><span class="date">{formatted_timestamp}</span></span>',
					'</div>',
				'<tpl else>',
					/*'<tpl if="unread == 1">',*/
					'<tpl if=\'unread == true\'>',
						'<div class="chat-list receive-chat">',
							'<span class="right-sec"><span class="open">Open it!</span><span class="img"><img class="tink-new" src="{original_trinket_file_path}"></span><span class="date">{formatted_timestamp}</span></span><span class="left-sec">{text}</span>',
						'</div>',
					'<tpl else>',
						'<div class="chat-list receive-chat">',
							'<span class="right-sec"><span class="seconds">{seconds_sent} sec(s)</span><span class="img"><img src="{original_trinket_file_path}"></span><span class="date">{formatted_timestamp}</span></span><span class="left-sec">{text}</span>',
						'</div>',
					'</tpl>',
				'</tpl>'
			],
			store: {
				id: 'TinkChatStore',
				fields: ['id', 'from_user_name', 'to_user_name', 'from_user', 'formatted_timestamp', 'to_user', 'send_timestamp', 'trinket_name', 'trinket_file_path', 'original_trinket_file_path', 'text', 'seconds_sent', 'for_inbox', 'unread'],
				data: []
			}
		});
		this.list = list;
		component.add(list);
		component.add(ttapp.util.Common.createMenuButton());
	},
	
	onChatSelect: function(target, index, e, record, eOpts) {
		console.log(record);
		if(eOpts.target.className == "tink-new") {
			Ext.Ajax.request({
	            url: ttapp.config.Config.getBaseURL()+'/message-read-v2/',
	            method: 'POST',
	            disableCaching: false,
	            jsonData: {
	            	"from_user": record.data.from_user,
	            	"to_user": record.data.to_user,
	            	"send_timestamp": record.data.send_timestamp,
	            	"text": record.data.text,
	            	"seconds_sent": record.data.seconds_sent,
	            	"unread": false,
	            	"trinket_name": record.data.trinket_name
	            },
	            success: function(response) {
	                console.log(response);
	            },
	            failure: function(error) {
	            }
	        });
		}
		var element = Ext.get(eOpts.target),
            me = this;

        window.fromTinkReplay = 1;

        Ext.getStore('profilestore').getPhoneNumber(function(from_user) {
            if ((from_user != record.data.from_user) && (record.data.unread)) {
                me.tinkRead(element, record);
            }

            me.getApplication().getController("ttapp.controller.ReplayTink").addReplay(record.data.seconds_sent, record.data.text, record.data.trinket_name);
        });
		// if(eOpts.target.className == 'tink') {
		// 	Ext.Ajax.request({
  //               url: ttapp.config.Config.getBaseURL()+'/message-read-v2/',
  //               method: 'POST',
  //               disableCaching: false,
  //               jsonData: {
  //               	"from_user": record.data.from_user,
  //               	"to_user": record.data.to_user,
  //               	"send_timestamp": record.data.send_timestamp,
  //               	"text": record.data.text,
  //               	"seconds_sent": record.data.seconds_sent,
  //               	"unread": true,
  //               	"trinket_name": record.data.trinket_name
  //               },
  //               success: function(response) {
  //                   var json = Ext.JSON.decode(response.responseText);
  //                   console.log(json);
  //               },
  //               failure: function(error) {
  //               }
  //           });
		// } 
			//{
			//ttapp.app.getController('Tink').useActiveTrinket();
			// var me = this;
	  //       Ext.getStore('profilestore').getActiveTrinket(function(trinketName) {
	  //           me.activeTrinketName = trinketName;

	  //           Ext.getStore('trinketstore').getThumbnailPath(me.activeTrinketName, function(activeTrinketThumbnailPath) {
	  //               Ext.getStore('trinketstore').getSwiffyPath(me.activeTrinketName, function(activeTrinketSwiffyPath) {
	  //                   me.showActiveTrinketThumbnail(activeTrinketThumbnailPath);

	  //                   var trinketArea = Ext.get('swiffydivtinkchat');
	  //                   trinketArea.setHtml('<iframe id="tinkcontainertinkchat" class="tinkanimation" allowtransparence="true"></iframe>');

	  //                   var iframe = trinketArea.child('iframe');
	  //                   iframe.dom.style.opacity = 0;

	  //                   iframe.dom.onload = function() {
	  //                       iframe.dom.style.opacity = 1;
	  //                       iframe.dom.onload = null;

	  //                       Ext.Viewport.unmask();
	  //                   };

	  //                   iframe.dom.src = activeTrinketSwiffyPath;
	  //               });
	  //           });
	  //       });
	},

	backToTinkBox: function() {
		Ext.Viewport.animateActiveItem('tinkbox', {type: 'slide', direction: 'right'});
	}
});