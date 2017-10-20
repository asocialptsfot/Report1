function graphing(datan) {
    var x_axis = new Array();
    var y_axis = new Array();
    var z_axis = new Array();
    for (var i = 0; i < datan.length; i++) {
        x_axis[i] = (datan[i][2]);
        y_axis[i] = Number.parseFloat(datan[i][4]);
        z_axis[i] = Number.parseInt(datan[i][3]);
    }
    var mean = arithmetic_mean(y_axis,x_axis);
    var geomean = geometric_method(y_axis,x_axis);
    var ex = extrema_method(y_axis,x_axis,3);
    var original_data = {
        x: x_axis,
        y: y_axis,
        name: "Original data"
    };
    var mean_plot = {
        x: mean[1],
        y: mean[0],
        name: "Arithmetic mean"
    };
    var extrema_plot = {
        x: ex[1],
        y: ex[0],
        name: "Extrema method"
    };
    var geometric_method_plot = {
        x: geomean[1],
        y: geomean[0],
        name: "Geometric method"
    };
    Plotly.newPlot('graph', [original_data,mean_plot,extrema_plot,geometric_method_plot]);
}
function extrema_method(array,array1,rec){
    var radius = 4;
    var recursion = rec;
    var newa = new Array();
    var times = new Array();
    var pointer = 1;
    newa[0] = array[0];
    newa[array.length-1] = array[array.length-1];
    times[0] = array1[0];
    times[array1.length-1] =array1[array1.length-1];
    for (var i = radius;i < array.length-radius;i++){
        for (var i2 = 1;i2 <= radius;i2++){
            if ((array[i+i2]<array[i]&&array[i-i2]<array[i]) && i2!==radius) continue;
            if ((array[i+i2]<array[i]&&array[i-i2]<array[i]) && i2===radius){
                newa[pointer] = array[i];
                times[pointer] = array1[i];
                pointer++;
            }
            else break;
        }
        for (var i2 = 1;i2 <= radius;i2++){
            if ((array[i+i2]>array[i]&&array[i-i2]>array[i]) && i2!==radius) continue;
            if ((array[i+i2]>array[i]&&array[i+i2]>array[i]) && i2===radius){
                newa[pointer] = array[i];
                times[pointer] = array1[i];
                pointer++;
            }
            else break;
        }
    }
    if (recursion !==0) return extrema_method(newa,times,recursion-1);
    console.log(newa.length);
    console.log(times.length);
    return [newa, times];
}
function arithmetic_mean(array, array1){
    var newa = new Array();
    var times = new Array();
    var splitter = 2;
    var pointer = 0;
    for (var i = 0;i < array.length;i+=splitter){
        var arr_sum = array[i];
        var arr_length = 1;
        for (var i2 = 1;i2<splitter;i2++){
            if (i+i2<array.length){
                arr_length++;arr_sum += array[i+i2];
            }
        }
        if (array1.length > (i+1)*splitter-Math.round(splitter/2)) times[pointer] = array1[(i+1)*splitter-Math.round(splitter/2)];
        else times[pointer] = array1[array1.length-1];
        newa[pointer] = arr_sum/arr_length;
        pointer++;
    }
    console.log(newa.length);
    console.log(times.length);
    return [newa, times];
}
function geometric_mean(array,array1){
    var newa = new Array();
    var times = new Array();
    var splitter = 2;
    var pointer = 0;
    for (var i = 0;i < array.length;i+=splitter){
        var arr_product = array[i];
        var arr_length = 1;
        for (var i2 = 1;i2<splitter;i2++){
            if (i+i2<array.length){
                arr_length++;arr_product *= array[i+i2];
            }
        }
        if (array1.length > (i+1)*splitter-1) times[pointer] = array1[(i+1)*splitter-1];
        else times[pointer] = array1[array1.length-1];
        newa[pointer] = Math.pow(arr_product,1/arr_length);
        pointer++;
    }
    console.log(newa.length);
    console.log(times.length);
    return [newa, times];
}
function optimalized_mean(array,array1){

}
function geometric_method(array,array1){
    var newa = new Array();
    var times = new Array();
    var n = 5;
    newa[0] = array[0];times[0] = array1[0];var pointer = 1;
    for (var i = 1;i < array.length;){
        for (var i2 = 1;i2 < n+1;i2++){
            var descending = array[i]-array[i+1];
            if ((descending > 0 && array[i+i2] <= array[i]) || (descending < 0 && array[i+i2] >= array[i])){
                newa[pointer] = array[i+i2-1];
                times[pointer] = array1[i+i2-1];
                pointer++;i+=i2;break;
            }
            else {
                if (i2 === n){
                    newa[pointer] = array[i+i2];
                    times[pointer] = array1[i+i2];
                    pointer++;i+=i2;break;
                }
            }
        }
    }
    return [newa, times];
}
function max(array){
    var returned = 0;
    for (var a in array) if (a > returned) returned = a;
    return returned;
}
function min(array){
    var returned = Number.MAX_SAFE_INTEGER;
    for (var a in array) if (a < returned) returned = a;
    return returned;
}