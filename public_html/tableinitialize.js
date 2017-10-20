$(document).ready(function (){ 
    var xhttp = new XMLHttpRequest();
    var data = new Array();
    var version = document.getElementById("getVersion").content;
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200){
            var ajax = JSON.parse(xhttp.responseText);
            var i = 0;
            for (var key in ajax){
                if (ajax.hasOwnProperty(key)) {
                    data[i] = ['<span class="unixt">'+key.toString()+"</span>", '<span class="statistics">'+ajax[key].v.toString()+'</span>', getTime(key.toString()), key.toString(),ajax[key].v];
                    i++;
                }
            }
            $("#page_table").DataTable({
                paging: true,
                ordering:false,
                data: data,
                lengthMenu: [5],
                "columns":[{title: "Unix timestamp"},{title:"Value"},{title:"Time"}]
            });
            for(var add = 0;(data.length+add)%5 !== 0;add++) $("#page_table").DataTable().row.add(['     ', '    ', '     ']).draw();
            graphing(data);
        }
    };
    xhttp.open("GET",version+".json",true);
    xhttp.send();
    
   
});
function getTime(unixt){
    var date = new Date(1000*parseInt(unixt));
    var seconds = date.getSeconds().toString();
    var minutes = date.getMinutes().toString();
    var hours = date.getHours().toString();
    var day = date.getDate().toString();
    var year = date.getFullYear().toString();
    var month = (date.getMonth()+1).toString();
    if (day.length < 2) day = "0"+day;
    if (month.length < 2) month = "0"+month;
    if (seconds.length < 2) seconds = "0"+seconds;
    if (minutes.length < 2) minutes = "0"+minutes;
    if (hours.length < 2) hours = "0"+hours;
    return year+"-"+day+"-"+month+" "+hours+":"+minutes+":"+seconds;
}