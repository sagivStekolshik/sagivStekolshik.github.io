<template>
  <div id="app">
    <reddit-input :subreddit="subreddit" @subredditChange="debouncedSubredditImgGetter($event)"></reddit-input>
    <div flexWrap layout="row center-spread">
        <reddit-image v-for="item in subredditObjArr" :reddit-object="item"></reddit-image>
    </div>
  </div>
</template>

<script>
    import input from "./components/redditInput.vue";
    import redditimg from "./components/redditImg.vue";
    import debounce from "./js/debounce";
    import fixImgurURL from "./js/fixImgurURL";

    export default {
        name: 'app',
        data() {
            return {
                subreddit: "aww",
                subredditObjArr: [],
                paging: {
                    before: null,
                    after: null
                }
            }
        },
        components: {
            "reddit-input": input,
            "reddit-image": redditimg
        },
        methods: {
            // a get function using redditjs api to get 9 new images from the selected subreddit
            getSubredditImg() {
                let contex = this;
                reddit.hot(this.subreddit).limit(9).fetch(res => {
                    // res contains JSON parsed response from Reddit
                    contex.subredditObjArr = res.data.children.map((obj) => {
                        if (obj.data.url.includes("imgur")) {
                            obj.data.url = fixImgurURL(obj.data.url);
                        }
                        return {
                            id: obj.data.id,
                            title: obj.data.title,
                            imgURL: obj.data.url
                        }
                    }, err => {
                        console.log("err");
                    });

                });
            },
            debouncedSubredditImgGetter(subreddit) {
                if (subreddit.length !== 0) {
                    this.subreddit = subreddit;
                    debounce(this.getSubredditImg(), 300, false);
                }
            }
        },
        created() {
            return this.getSubredditImg();
        }
    }

</script>

<style>
    body {
        padding: 0 10px;
    }

    [flexWrap] {
        flex-wrap: wrap;
    }

</style>
