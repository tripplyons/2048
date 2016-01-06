var canvas = cq(480, 360).appendTo(document.getElementById("canvas-area"));

canvas.clear("#202020").strokeStyle("#FFFFFF").lineWidth(4);

function graph(data) {
    canvas.clear("#202020");
    var pointDistance = canvas.width / (data.length);
    
    var bestScore = 0;
    for(var i=0; i<data.length; i++) {
        if(data[i] > bestScore) {
            bestScore = data[i];
        }
    }
    
    for(var i=0; i<data.length-1; i++) {
        canvas.strokeLine(i*pointDistance, canvas.height-data[i]*(canvas.height/bestScore), // Start
        (i+1)*pointDistance, canvas.height-data[i+1]*(canvas.height/bestScore)); // End
    }
}