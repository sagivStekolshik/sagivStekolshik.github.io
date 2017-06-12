import fixImgurURL from "./fixImgurURL";

//filtering and reducing recived function from reddit to a more manageble format
export default function (redditObj) {
        let regexURLVerificationOfImage = /(.jpg|.gif|.png)$/;
        return redditObj
            //map the recived obj to a manageble redditObj with correct urls
            .map(obj => {
                if (obj.data.url.includes("imgur")) {
                    obj.data.url = fixImgurURL(obj.data.url);
                }
                // map the array to a menageble object
                return {
                    id: obj.data.id,
                    title: obj.data.title,
                    imgURL: obj.data.url
                }
            })
            //weed out stray urls that dosn't show pictures
            .filter(obj => {
                if (regexURLVerificationOfImage.test(obj.imgURL))
                    return true;
                return false;
            })

}
