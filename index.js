var App = function(data) {
    var app = {
        output: data.output || document.body,
        name: data.name || "default name",
        pages: createPages(data.steps.sort(sortSteps)),
        currentPageIndex: null,
        pagesOrder: data.order,
        loadPage: function(newPageIndex) {
            var oldPageIndex = this.currentPageIndex;

            if (oldPageIndex === newPageIndex) return;

            if (this.currentPageIndex !== null) {
                this.pages[oldPageIndex].finish();
            }
            
            this.pages[newPageIndex].start();
            this.currentPageIndex = newPageIndex;
        }
    }

    function sortSteps(a, b) {
        return a.orederIndex > b.orederIndex;
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
                    this.startMethods[i]();
                }
                
                app.output.innerHTML = this.draw();
            },

            finish: function() {
                for (var i=0; i<this.startMethods.length; i++) {
                    this.finishtMethods[i]();
                }
            }
        };

        return page; 
    }

    return app;
};



container = new App({output: document.querySelector(".b-wrapper"),steps: steps, name: "qwerty", order: ["gven", "nik", "shit", "can"] });
container.loadPage(0);