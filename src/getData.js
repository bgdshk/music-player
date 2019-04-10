/*** 
 * /config
 * /tracks 
***/

const getData = (url) => {
    return fetch(`/${url}`);
}

export default getData;