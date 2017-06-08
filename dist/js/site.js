(function () {

    "use strict";

    var app = new Vue({
        el: '#app',
        data: {
            subreddit: "cats",
            subredditObjArr: []
        },
        methods: {
            // a get function using redditjs api to get 9 new images from the selected subreddit
            getSubredditImg() {
                reddit.hot(this.subreddit).limit(9).fetch(res=> {
                    // res contains JSON parsed response from Reddit
                    app.subredditObjArr = res.data.children.map((obj) => {
                        return {
                            id: obj.data.id,
                            title: obj.data.title,
                            imgURL: obj.data.url
                        }
                    }, err=>{
                        console.log("err");
                    });

                });
            },
            debouncedSubredditImgGetter(){
              debounce(this.getSubredditImg(),500,false);
            }

        },
        created() {
            this.getSubredditImg();
        }
    });


    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait, immediate) {
        let timeout;
        return () => {
            let context = this,
                args = arguments,
                later = () => {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow)
                func.apply(context, args);
        };
    };

})();
