<template>
  <div id="app">
    <div layout="row center-left">
        <reddit-input :subreddit="subreddit" @subredditChange="debouncedSubredditGetter($event)"></reddit-input>
        <reddit-paging :page="currentPage"
                        :maximum-objects="subredditObjArr.length"
                        @pageChange="currentPage = $event"
                        @getMorePages="addSubredditPages($event)"></reddit-paging>
    </div>
    <div layout="row center-center">
        <no-subreddit-messege v-show="noSubreddit"></no-subreddit-messege>
    </div>
    <div flexWrap layout="row center-spread">
        <reddit-image v-for="item in minifiedSubredditObjArray" :reddit-object="item"></reddit-image>
    </div>
  </div>
</template>

<script>
    import redditInput from "./components/redditInput.vue";
    import redditImg from "./components/redditImg.vue";
    import pager from "./components/redditPager.vue";
    import noSubreddit from "./components/noSubreddit.vue";

    import debounce from "./js/debounce";
    import convertRedditObj from "./js/sortRedditObj";

    export default {
        name: 'app',
        data() {
            return {
                subreddit: undefined,
                subredditObjArr: [],
                paging: {
                    before: undefined,
                    after: undefined,
                },
                currentPage: 1
            }
        },
        // components
        components: {
            "reddit-input": redditInput,
            "reddit-image": redditImg,
            "no-subreddit-messege": noSubreddit,
            "reddit-paging": pager
        },
        computed: {
            // show no subreddit only when no subreddit are selected
            noSubreddit() {
                if (typeof this.paging.before === "undefined" && typeof this.paging.after === "undefined")
                    return false;
                return !this.subredditObjArr.length
            },
            minifiedSubredditObjArray() {
                // show only 9 reddit objects and not all
                //if not enough enterys do nothing
                if (this.subredditObjArr.length === 0 || this.subredditObjArr.length < 9)
                    return this.subredditObjArr
                return this.subredditObjArr.slice(this.currentPage * 9 - 9, this.currentPage * 9)
            }

        },
        methods: {
            // a get function using redditjs api to get 9 new images from the selected subreddit
            getSubreddit() {
                //regex to find if the url ends with an image file extention
                let searchQuery = this.subreddit === "" ? undefined : this.subreddit,
                    context = this;
                reddit.hot(searchQuery).limit(9 * 7).fetch(res => {
                    // if the subreddit dosn't exists it will return response with 404 field
                    //and we will reset the search and terminate function
                    if (res.error === 404) {
                        context.subredditObjArr = [];
                        return
                    }
                    //get paging after and before
                    [context.paging.before, context.paging.after] = [res.data.before, res.data.after];
                    // res contains JSON parsed response from Reddit
                    context.subredditObjArr = convertRedditObj(res.data.children);
                }, err => {
                    //incase of error print it and do nothing
                    console.error("err", err);
                });
            },
            // debounce the subredditgetter to not flood the api and annoy the client
            debouncedSubredditGetter(subreddit) {
                this.subreddit = subreddit;
                // when input changed get the next reddit obj
                debounce(this.getSubreddit(), 500, false);
            },
            addSubredditPages(amount) {
                //adding to the reddit object array
                let searchQuery = this.subreddit === "" ? undefined : this.subreddit,
                    context = this;
                reddit.hot(searchQuery).after(this.paging.after).limit(9 *2+3).fetch(res => {
                    if (res.error === 404) {
                        console.error("adding reddit object faild, invalid sqerch query");
                        return
                    }
                    context.subredditObjArr = context.subredditObjArr.concat(convertRedditObj(res.data.children));
                });
            }
        },
        watch: {
            subreddit() {
                this.currentPage = 1;
            }
        },
        created() {
            return this.getSubreddit();
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
