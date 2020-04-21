function drawText(text, startW, startH, color) {
    var cS = document.getElementById("cScore"),
        ctxS = cS.getContext("2d"),
        write = text.split(""),
        fontSize = cS.width / 49,
        scaleW = 2, //2.38
        scaleH = 1.1;
    ctxS.font = String(fontSize) + 'px "Press Start 2P"';
    ctxS.textBaseline = 'top';
    ctxS.save();
    ctxS.scale(scaleW, scaleH);
    ctxS.textAlign="start";
    ctxS.fillStyle = color;
    for (var i in write) {
        ctxS.fillText(
            write[i],
            cS.width*(startW + 16*i)/(320*scaleW),
            cS.height*startH/(210*scaleH)
        )
        ctxS.fillText(
            write[i],
            cS.width*(startW + 0.3 + 16*i)/(320*scaleW),
            cS.height*startH/(210*scaleH)
        )
    }
    ctxS.restore();
}
function updateScore(mode){
    var cS=document.getElementById("cScore"),
        ctxS=cS.getContext("2d"),
        write,
        startW,
        startH,
        number,
        fontSize = cS.width/49,
        scaleW = 2, //2.38
        scaleH = 1.1
    ctxS.font = String(fontSize) + 'px "Press Start 2P"';
    ctxS.textBaseline = 'top';
    ctxS.textAlign="start";
    ctxS.save();
    ctxS.scale(scaleW, scaleH);
    ctxS.fillStyle = "#782a66";
    switch(mode){
        case "eggs":
            ctxS.clearRect(
                192*cS.width/(320*scaleW), 
                6*cS.height/(210*scaleH), 
                45*cS.width/(320*scaleW), 
                9*cS.height/(210*scaleH)
            )
            startW = 193
            startH = 7
            number = 3
            write = String(eggsCaught).split("")
            break;
        case "level":
            ctxS.clearRect(
                289*cS.width/(320*scaleW), 
                6*cS.height/(210*scaleH), 
                29*cS.width/(320*scaleW), 
                9*cS.height/(210*scaleH)
            )
            startW = 289
            startH = 7
            number = 2
            write = String(level).split("")
            break;
        case "score":
            ctxS.clearRect(
                96*cS.width/(320*scaleW), 
                14*cS.height/(210*scaleH), 
                94*cS.width/(320*scaleW), 
                9*cS.height/(210*scaleH)
            )
            startW = 97
            startH = 15
            number = 6
            write = String(score).split("")
            break;
        case "live":
            ctxS.restore();
            for(var i = 0; i < lives; i++){
                ctxS.drawImage(
                    liveImage,
                    (208 + 32*i)*cS.width/320,
                    15*cS.height/210,
                    liveImage.naturalWidth/9*cS.width/320,
                    liveImage.naturalHeight/9*cS.height/210
                ) 
            }
            number = 0
            break;
    }
    for (var i = number; i > 0; i--) {
        if(i > write.length){
            ctxS.fillText(
                "0",
                cS.width*(startW + 16*(number-i))/(320*scaleW),
                cS.height*startH/(210*scaleH)
            )
            ctxS.fillText(
                "0",
                cS.width*(startW + 0.3 + 16*(number-i))/(320*scaleW),
                cS.height*startH/(210*scaleH)
            )
        }else{
            ctxS.fillText(
                write[write.length-i],
                cS.width*(startW + 16*(number-i))/(320*scaleW),
                cS.height*startH/(210*scaleH)
            )
            ctxS.fillText(
                write[write.length-i],
                cS.width*(startW + 0.3 + 16*(number-i))/(320*scaleW),
                cS.height*startH/(210*scaleH)
            )
        }
    }
    ctxS.restore();
}