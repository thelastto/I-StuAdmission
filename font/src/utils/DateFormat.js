export function dateFormat (obj) {
    let format = new Date(obj);
    let year = format.getFullYear();
    let month = (format.getMonth()+1<10)?('0'+(format.getMonth()+1).toString()):format.getMonth()+1;
    let date = (format.getDate()+1<10)?('0'+(format.getDate()+1).toString()):format.getDate()+1;
    let hour = (format.getHours()+1<10)?('0'+(format.getHours()+1).toString()):format.getHours()+1;
    let minute = (format.getMinutes()+1<10)?('0'+(format.getMinutes()+1).toString()):format.getMinutes()+1
    let second = (format.getSeconds()+1<10)?('0'+(format.getSeconds()+1).toString()):format.getSeconds()+1
    return year + '-' + month + '-' + date+' '+hour+':'+minute+':'+second;
}
  