<template>
  <div id="app">
    <div layout="row center-left">
        <reddit-input :subreddit="subreddit" @subredditChange="debouncedSubredditImgGetter($event)"></reddit-input>
<!--        <reddit-pager></reddit-pager>-->
    </div>
    <div flexWrap layout="row center-spread">
        <reddit-image v-for="item in subredditObjArr" :reddit-object="item"></reddit-image>
    </div>
  </div>
</template>

<script>
    import redditInput from "./components/redditInput.vue";
    import redditimg from "./components/redditImg.vue";
    import redditPager from "./components/redditPager.vue"

    import debounce from "./js/debounce";
    import fixImgurURL from "./js/fixImgurURL";

    export default {
        name: 'app',
        data() {
            return {
                subreddit: "cats",
                subredditObjArr: [],
                paging: {
                    before: null,
                    after: null,
                    currentPage: 1
                }
            }
        },
        components: {
            "reddit-input": redditInput,
            "reddit-image": redditimg,
            "reddit-pager": redditPager
        },
        computed: {
            reducedSubredditObjArr() {
                console.log("hi from comp");
                return this.subredditObjArr.slice(this.paging * 9 - 9, this.paging * 9 - 1);
            }
        },
        methods: {
            // a get function using redditjs api to get 9 new images from the selected subreddit
            getSubredditImg() {
                let regexURLVerificationOfImage = /(.jpg|.gif|.png)$/,
                    contex = this;
                reddit.hot(this.subreddit).limit(9 * 7).fetch(res => {
                    if (res.data.children) {
                        // res contains JSON parsed response from Reddit
                        contex.subredditObjArr = res.data.children
                        //map the recived obj to a manageble redditObj with correct urls
                            .map((obj) => {
                                    if (obj.data.url.includes("imgur")) {
                                        obj.data.url = fixImgurURL(obj.data.url);
                                    }
                                    return {
                                        id: obj.data.id,
                                        title: obj.data.title,
                                        imgURL: obj.data.url
                                    }
                                }

                            )
                        //weed out stray urls that dosn't show pictures
                            .filter((redditObj) => {
                                if(regexURLVerificationOfImage.test(redditObj.imgURL))
                                    return true;
                                return false;
                            }).slice(0, 9);
                    } else {
                        contex.subredditObjArr = [];
                    }
                }, err => {
                    console.log("err");
                })
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
        /*        background from http://www.heropatterns.com/*/
        background-color: #deeef4;
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='20' viewBox='0 0 16 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%237aaec1' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M8 0v20L0 10M16 0v10L8 0M16 10v10H8'/%3E%3C/g%3E%3C/svg%3E");
        /*        adding gutter to the site*/
        padding: 0 10px;
        /*        base font family*/
        font-family: 'Open Sans', sans-serif;
    }

    [flexWrap] {
        flex-wrap: wrap;
    }

</style>
