export function dateFormat (obj) {
    let format = new Date(obj);
    let year = format.getFullYear();
    let month = format.getMonth()+1;
    let date = format.getDate();
    let hour = format.getHours();
    let minute = format.getMinutes();
    let second = format.getSeconds();
    return year + '-' + month + '-' + date+' '+hour+':'+minute+':'+second;
}
  