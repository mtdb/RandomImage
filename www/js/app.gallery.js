app.gallery = {
    init: function() {
    	// pass
    },
    showing: 0,
    mutex: false,
    gallery: {},
    next: function() {
        var self = this;
        if (self.mutex)
            return;
        self.mutex = true;
        self.showing += 1;
        self.showImage();
        setTimeout(function() {
            self.mutex = false;
        }, 1000)
    },
    load: function(e, data) {
        var self = this,
            query = data.absUrl.match(/\?tag=.+/);
        if (!query) return;
        self.showing = 0;
        query = query[0].replace('?tag=','');

        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
            tags: query,
            format: 'json'
        }).success(function(data) {
            self.gallery = data;
            self.next();
        }).error(app.error);

    },
    showImage: function() {
        var self = this,
            img = $('<img />').attr({
                src: self.gallery.items[self.showing].media.m,
                width: '90%'
            });
        self.view.find('h1.ui-title').text(
                                self.gallery.items[self.showing].author);
        self.view.find('.photo').html(img);
        self.view.find('.published').text(
                                self.gallery.items[self.showing].published);
    }
}