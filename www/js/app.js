var app = {
    // Application Constructor
    init: function() {
        $('[data-role=page]').each(function() {
            var controller = $(this).attr('id');

            if (!app[controller]) {
                console.warn('app.' + controller + ' is undefined');
                return;
            }

            if (app[controller].init)
                app[controller].init();

            if (app[controller].bindEvents)
                app[controller].bindEvents();

            // define a view for each page with controller
            app[controller].view = $(this);
        });
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        $(document).bind('pagechange', function(e, data) {
            var controller = $.mobile.activePage.attr('id');
            if (!app[controller]) return;

            if (app[controller].load)
                app[controller].load(e, data);
        });
        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        if (id == 'deviceready') {
            navigator.accelerometer.watchAcceleration(function(acceleration) {
                if (acceleration.x > 0.5)
                    app.gallery.next();
            }, app.error, {frequency: 1000});
        }
    },
    error: function() {
        alert('error');
    }
}
