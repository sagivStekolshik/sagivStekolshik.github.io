<template>
  <div id="app">
    <div layout="row center-left">
        <reddit-input :subreddit="subreddit" @subredditChange="debouncedSubredditGetter($event)"></reddit-input>
    </div>
    <div v-cloak layout="row center-center">
        <no-subreddit-messege v-show="noSubreddit"></no-subreddit-messege>
    </div>
    <div flexWrap layout="row center-spread">
        <reddit-image v-for="item in subredditObjArr" :reddit-object="item"></reddit-image>
    </div>
  </div>
</template>

<script>
    import redditInput from "./components/redditInput.vue";
    import redditimg from "./components/redditImg.vue";
    import noSubreddit from "./components/noSubreddit.vue";

    import debounce from "./js/debounce";
    import fixImgurURL from "./js/fixImgurURL";

    export default {
        name: 'app',
        data() {
            return {
                subreddit: undefined,
                subredditObjArr: [],
                paging: {
                    before: null,
                    after: null,
                    currentPage: 1
                }
            }
        },
        computed: {
            noSubreddit: function() {
                if(typeof this.paging.before === "object" && typeof this.paging.after === "object")
                    return false;
                return !this.subredditObjArr.length
            }
        },
        // components
        components: {
            "reddit-input": redditInput,
            "reddit-image": redditimg,
            "no-subreddit-messege": noSubreddit
        },
        methods: {
            // a get function using redditjs api to get 9 new images from the selected subreddit
            getSubredditImg() {
                //regex to find if the url ends with an image file extention
                let regexURLVerificationOfImage = /(.jpg|.gif|.png)$/,
                    searchQuery = this.subreddit === "" ? undefined : this.subreddit,
                    contex = this;
                reddit.hot(searchQuery).limit(9 * 7).fetch(res => {
                    // if the subreddit dosn't exists it will return response with 404 field
                    if (res.error != 404) {
                        //get paging after and before
                        [this.paging.before,this.paging.after] = [res.data.before,res.data.after];
                        // res contains JSON parsed response from Reddit
                        contex.subredditObjArr = res.data.children
                            //map the recived obj to a manageble redditObj with correct urls
                            .map((obj) => {
                                    // sort image url from imgur and try to fix them
                                    if (obj.data.url.includes("imgur")) {
                                        obj.data.url = fixImgurURL(obj.data.url);
                                    }
                                    // map the array to a menageble object
                                    return {
                                        id: obj.data.id,
                                        title: obj.data.title,
                                        imgURL: obj.data.url
                                    }
                                }

                            )
                            //weed out stray urls that dosn't show pictures
                            .filter((redditObj) => {
                                if (regexURLVerificationOfImage.test(redditObj.imgURL))
                                    return true;
                                return false;
                            })
                            // return only the 9 first items
                            .slice(0, 9);
                    } else {
                        contex.subredditObjArr = [];
                    }
                }, err => {
                    //incase of error print it and do nothing
                    console.error("err", err);
                });
            },
            // debounce the subredditgetter to not flood the api and annoy the client
            debouncedSubredditGetter(subreddit) {
                this.subreddit = subreddit;
                // when input changed get the next reddit obj
                debounce(this.getSubredditImg(), 500, false);
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

    [v-cloak] {
        display: none;
    }

</style>
