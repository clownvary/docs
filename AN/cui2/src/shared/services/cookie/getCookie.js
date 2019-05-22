const getCookie = (name) => {
    const reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    const arr = document.cookie.match(reg);
    /* istanbul ignore next */
    if(arr) {
        return unescape(arr[2]);
    }

    return '';
};

export default getCookie;
