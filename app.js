/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'ttapp',

    requires: [
        'Ext.MessageBox', 'Ext.device.Contacts',
        'ttapp.overrides.SizeMonitor', 'ttapp.overrides.PaintMonitor'
    ],
    controllers: ['Main', 'Tink', 'SendTo', 'Landing', 'Authenticate',
    'Trinket', 'DogEar', 'Split', 'Feed', 'ReplayTink', 'TinkChat'],

    views: [
        'Landing', 'Feed', 'Tink', 'SendTo', 'Trinket',
        'Authenticate', 'ConfirmPhoneNumber', 'DogEar',
        'Split', 'Options', 'PrivacyPolicy', 'Intro', 'PhoneContacts', 'TinkoMeter', 'TinkBox', 'TinkChat'
    ],
    
    stores: ['Trinkets', 'Contacts', 'Messages', 'Profile', 'IpInfo'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },


    launch: function() {
        // get tinkbox content
        ttapp.util.FeedProxy.process(true);

        // get trinket content
        ttapp.util.TrinketProxy.process(true, function() {
            // check on server, if user is verified
            ttapp.util.Common.isUserVerifiedOnServer(function(success) {
                // Destroy the #appLoadingIndicator element
                Ext.fly('appLoadingIndicator').destroy();

                // Initialize the main view
                if (success) {
                    Ext.Viewport.add({
                        cls: 'bg-transparent'
                    });

                    ttapp.app.getController('Landing').onUserAction(true);
                }
                else {
                    /*previous code*/
                    //Ext.Viewport.add(Ext.create('ttapp.view.Landing'));
                    Ext.Viewport.add(Ext.create('ttapp.view.Authenticate'));
                }
            });
        });

        // get contacts from device
        ttapp.util.ContactsProxy.process(Ext.getStore('phonecontacts'));

        // set user's country dial code based on ip-address
        ttapp.util.Common.setDialCode();
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
