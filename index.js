var App = function(data) {
    var app = {
        output: outputElem(data),
        outputHolder: createHolder(data),
        name: data.name || "default name",
        pages: createPages(data.steps.sort(sortSteps)),
        currentPageIndex: null,
        pagesOrder: data.order,
        createNavigation: data.createNavigation ? createNavigation(data, outputElem(data)) : null,
        loadPage: loadPage
    }

    function createHolder(data) {
        var holder = document.createElement("div");
        holder.className = "b-wrapper__holder"
        outputElem(data).appendChild(holder);

        return holder;
    }

    function outputElem(data) {
        return data.output || document.body;
    }

    function loadPage(newPageIndex) {
        var oldPageIndex = this.currentPageIndex;

        if (oldPageIndex === newPageIndex) return;

        if (this.currentPageIndex !== null) {
            this.pages[oldPageIndex].finish();
        }
        
        this.pages[newPageIndex].start();
        this.currentPageIndex = newPageIndex;
    };

    function sortSteps(a, b) {
        return a.orederIndex > b.orederIndex;
    }

    function createNavigation(data, outputElem) {
        var nav = document.createElement("ul");
        nav.className = "b-nav";

        for (var i=0; i<data.steps.length; i++) {
            var navItem = document.createElement("li");
            navItem.className = "b-nav__frame"
            var navButton = document.createElement("buton");
            navButton.className = "b-nav__button"

            navButton.textContent = "item " + i;
            navButton.dataset.index = i;
            navButton.addEventListener("click", function() {
                app.loadPage.apply(app, [this.dataset.index]);
            });

            navItem.appendChild(navButton);
            nav.appendChild(navItem);
        }

        outputElem.appendChild(nav);
    }

    function createPages(data) {
        var pages = [];

        if (data) {
            for (var i=0; i<data.length; i++) {
                pages.push(new Page(data[i]));
            }
        }

        return pages;
    }

    function Page(data) {
        var page = {
            name: data.name,
            title: data.title,
            age: data.age,
            text: data.text,
            url: data.url,

            startMethods: data.startMethods || null,
            finishtMethods: data.finishtMethods || null,

            draw: function() {
                return "<h2>" + this.name + "</h2><h3>" + this.title + "</h3><p><em>" + this.age + "</em></p><p>" + this.text + "</p>"
            },

            start: function() {
                for (var i=0; i<this.startMethods.length; i++) {
                    new createNotification(this.startMethods[i]());
                }
                
                app.outputHolder.innerHTML = this.draw();
            },

            finish: function() {
                for (var i=0; i<this.startMethods.length; i++) {
                    new createNotification(this.finishtMethods[i]());
                }
            }
        };

        return page; 
    }

    return app;
};



container = new App(
    {
        output: document.querySelector(".b-wrapper"),
        steps: steps,
        name: "qwerty",
        order: ["gven", "nik", "shit", "can"],
        createNavigation: true 
    }
);
container.loadPage(0);




function createNotification(data) {
    var notificationHolder = document.querySelector(".b-notification");
    this.notification = document.createElement("div");
    this.notification.className = "b-notification__message";
    this.notification.textContent = data;

    notificationHolder.appendChild(this.notification);

    setTimeout(function() {
        this.notification.parentNode.removeChild(this.notification);
    }.bind(this), 4000);
}