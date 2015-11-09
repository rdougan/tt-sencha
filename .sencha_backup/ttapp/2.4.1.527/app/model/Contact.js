Ext.define('ttapp.model.Contact', {
    extend: 'Ext.data.Model',

    config: {
        identifier: {
            type: 'uuid'
        },
        fields: [
            'id',
            'first_name',
            'last_name',
            'on_tinktime',
            'phone_number',
            'phone_type',
            'time_split',
            'profile_url'
        ]
    }
});
