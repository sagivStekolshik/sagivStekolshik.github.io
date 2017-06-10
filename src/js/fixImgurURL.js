export default function fixImgurURL(imgurURL) {
    //regex to identify imgur urls that dosnt end with an img file extention
    let URLRegexForPictureWithFileExtention = new RegExp('((http(s?):\/\/)?imgur\.com\/[a-zA-Z0-9]{6,8})(?!\.jpg|\.gif|\.gifv|\.png)(?:[^a-zA-Z0-9]|$)');
    if (URLRegexForPictureWithFileExtention.test(imgurURL)) {
        return imgurURL.concat(".gif");
    }
    //if the url end with a .gifv file extention
    if (imgurURL.endsWith(".gifv")) {
        //remove the v from gifv so the img tag can display the gif
        return imgurURL.slice(0, -1);
    }
    return imgurURL;
}
