import Cookies from 'js-cookie';

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
};

const isValidUrl = (url) => {
    let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(url);
};

const strToSlug = (str) => {
    return str
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'');
};

const setUserInfoCookie = (userObj) => {
    let userSlug = strToSlug(userObj.username);
    Cookies.set('logged_in_user', userSlug);
    saveUserPreference(userObj)
};

const saveUserPreference = (userObj) => {
    if(userObj){
        let userSlug = strToSlug(userObj.username);
        Cookies.set(userSlug, userObj);
    }
};

const getUserCookieInfo = () => {
    let loggedinUser, userData = '';
    loggedinUser = Cookies.get('logged_in_user');
    if(loggedinUser){
        userData = JSON.parse(Cookies.get(loggedinUser));
    }
    return userData;
};

const isEmptyObject = (obj) => {
    return  Object.entries(obj).length === 0 && obj.constructor === Object;
};

const uniqueArrObject = (obj, field) => {
    let resArr = [];
    obj.filter(function(item){
        var i = resArr.findIndex(x => (x[field] == item[field]));
        if(i <= -1) resArr.push(item);
    });
    return resArr;
};

const getUniqueKey = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

export { getRandomInt, isValidUrl, strToSlug, setUserInfoCookie, getUniqueKey,
    getUserCookieInfo, saveUserPreference, isEmptyObject, uniqueArrObject};
