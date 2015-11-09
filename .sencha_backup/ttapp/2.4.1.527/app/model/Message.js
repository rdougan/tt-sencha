 Ext.define('ttapp.model.Message', {
            extend: 'Ext.data.Model',
            config: {
                 identifier: {
                    type: 'uuid'
                },
                fields: [
                {
                    name: 'from_user_name',
                    type: 'string'                    
                },
                {
                    name: 'to_user_name',
                    type: 'string'                    
                },
                {
                    name: 'from_user',
                    type: 'string'
                }, {
                    name: 'to_user',
                    type: 'string'
                }, {
                    name: 'send_timestamp',
                    type: 'string'
                }, {
                    name: 'formatted_timestamp',
                    type: 'string'
                }, {
                    name: 'trinket_name',
                    type: 'string'
                }, {
                    name: 'original_trinket_file_path',
                    type: 'string'
                }, {
                    name: 'trinket_file_path',
                    type: 'string'
                }, {
                    name: 'text',
                    type: 'string'
                },{
                    name: 'seconds_sent',
                    type: 'int'
                },{
                    name: 'for_inbox',
                    type: 'boolean'
                },
                {
                    name: 'unread',
                    type: 'boolean'
                }]
            }
        });

