function moveFox(tick){
    //console.log("tick",tick)
    if(gameStatus > 1 && gameStatus < 5){
        if(fox.czas >= fox.czekaj + 1){
            fox.czas = 0
            fox.step = (fox.step%2)+1
            if(
                (fox.pozycja <= fox.meta  && fox.progress != 0)
                ||
                (fox.pozycja >= fox.meta  && fox.progress == 0)
            ){
                fox.progress = (fox.progress+1)%2
                if(fox.progress == 0 ){
                    fox.meta = Math.floor((Math.random() * 120) + 100) *2; //120+160
                    if(fox.jajko == true){
                        eggs.push(
                            new _Egg(48, 30, 1, eggs[0].grafiki)
                        )
                        fox.jajko = false
                    }
                }else{
                    fox.meta = 24 *2
                }
            }
            if(fox.meta >= fox.pozycja + fox.reszta + 3*tick ){
                fox.pozycja+= 3*tick + fox.reszta
                fox.reszta = 0
            }else if(fox.meta <= fox.pozycja - fox.reszta - 3*tick){
                fox.pozycja-= 3*tick - fox.reszta
                fox.reszta = 0
            } else{
                if(fox.meta > fox.pozycja){
                    fox.reszta = fox.pozycja + 3*tick - fox.meta 
                }else if(fox.meta  < fox.pozycja){
                    fox.reszta = fox.meta - fox.pozycja + 3*tick
                }
                fox.pozycja = fox.meta 
            }
        }else{
            fox.czas += tick    
        }
    }else{
        fox.step = 0
    }
}
function checkEggs(kierunek, p, ust){
    var cP=document.getElementById("cPlayer"),
        ctxP=cP.getContext("2d")
    for(var i in eggs){
        //console.log(eggs[i])
        if(eggs[i].status == (Number(p) + 1) && eggs[i].ruch == false){
            var speedR = 0,
                speedL = 0
            if(eggs[i].status>1){
                if(trails[p-1].kierunek == 0){
                    speedL = -2
                }else{
                    speedL = 2
                }          
            }
            //console.log("JESTEM")
            switch(kierunek){
                case 0:
                    for(var j = 0; j < (320/(trails[0].grafika.naturalWidth/9 + 8)); j++){
                            //console.log(eggs[i].pozycja, Math.round(trails[p].ustawienie/8) + trails[p].roznica + trails[p].dlugosc*j, Math.round(ust/8) + trails[p].roznica + trails[p].dlugosc*j)
                            //console.log(((Math.round(ust/8) + trails[p].roznica + trails[p].dlugosc*j)*cP.width/320),eggs[i].pozycja*cP.width/320, ((Math.round(trails[p].ustawienie/8) + trails[p].roznica + trails[p].dlugosc*j)*cP.width/320))
                        
                        if(
                            eggs[i].pozycja*cP.width/320 + speedR <= ((Math.round(trails[p].ustawienie/8) + trails[p].roznica + trails[p].dlugosc*j)*cP.width/320)
                            &&
                            eggs[i].pozycja*cP.width/320  + speedL> ((Math.round(ust/8) + trails[p].roznica + trails[p].dlugosc*j)*cP.width/320)
                        ){
                            eggs[i].status ++
                            eggs[i].ruch = true
                            eggs[i].tasma = trails[p].overflow + j
                            fox.jajko = true
                            //alert("hura") 
                        }
                        
                    }  
                    break;
                case 1:
                    for(var j = 0; j < (320/(trails[0].grafika.naturalWidth/9 + 8)); j++){
                            //console.log(eggs[i].pozycja, Math.round(trails[p].ustawienie/8) + trails[p].roznica + trails[p].dlugosc*j, Math.round(ust/8) + trails[p].roznica + trails[p].dlugosc*j)
                            //console.log(((Math.round(trails[p].ustawienie/8) + trails[p].roznica + trails[p].dlugosc*j)*cP.width/320), eggs[i].pozycja*cP.width/320, ((Math.round(ust/8) + trails[p].roznica + trails[p].dlugosc*j)*cP.width/320))
                        if(
                            eggs[i].pozycja*cP.width/320 + speedR >= ((Math.round(trails[p].ustawienie/8) + trails[p].roznica + trails[p].dlugosc*j)*cP.width/320)
                            &&
                            eggs[i].pozycja*cP.width/320 + speedL < ((Math.round(ust/8) + trails[p].roznica + trails[p].dlugosc*j)*cP.width/320)
                        ){
                            eggs[i].status ++
                            eggs[i].ruch = true
                            eggs[i].tasma = trails[p].overflow + j
                            fox.jajko = true
                            //alert("hura") 
                        }
                            
                    }  
                    break;
            }
        }
    }
}
function moveTrails(tick){
    if(trailUpdate >= trailCzekaj){
        trailUpdate = 0
        for(var i in trails){
            var temp
            if(Math.round(trails[i].zmiana/8) > trails[i].dystans){
                trails[i].kierunek = (trails[i].kierunek+1)%2
                if(trails[i].kierunek == 0){
                    //trails[i].ustawienie = 0;
                }else{
                    //trails[i].overflow = 0;
                }
                trails[i].zmiana = 0;
            }
            if(trails[i].kierunek == 0){
                temp = trails[i].ustawienie
                if(!((trails[i].ustawienie+tick) == (trails[i].ustawienie+tick)%((trails[i].grafika.naturalWidth/9 + 8)*8)))
                    trails[i].overflow --
                trails[i].ustawienie = (trails[i].ustawienie+tick)%((trails[i].grafika.naturalWidth/9 + 8)*8)
                //320/(trails[1].grafika.naturalWidth/9 + 8)
                checkEggs(0, i, temp)
                
            }else{
                temp = trails[i].ustawienie
                if(trails[i].ustawienie < tick){
                    trails[i].overflow ++
                    trails[i].ustawienie = ((trails[i].grafika.naturalWidth/9 + 8)*8 + trails[i].ustawienie - tick)%((trails[i].grafika.naturalWidth/9 + 8)*8)
                }else{
                    trails[i].ustawienie = (trails[i].ustawienie - tick)%((trails[i].grafika.naturalWidth/9 + 8)*8)
                }
                
                checkEggs(1, i, temp)
            }
            trails[i].zmiana += tick;
        }
    }else{
        trailUpdate += tick
    }
}
function animateEggs(tick){
    var cP=document.getElementById("cPlayer"),
        ctxP=cP.getContext("2d")
    for(var i in eggs){
        var s = eggs[i].status
        switch(true){
            case s == 0:
                grafika = 0
                break;
            case s == 1:
                grafika = 0
                if(eggs[i].pozycja < Math.round(fox.pozycja/2) + 1 + fox.dlugosc){
                    eggs[i].ruch = true;
                    eggs[i].pozycja = Math.round(fox.pozycja/2) + 1 + fox.dlugosc
                }else if(eggs[i].pozycja > Math.round(fox.pozycja/2) + 1 + fox.dlugosc) {
                    eggs[i].ruch = false;
                }
                break;
            case s < trails.length+2:
                grafika = 0
                if(eggs[i].ruch == true){
                    if(eggs[i].wysokosc == 30){
                        eggs[i].wysokosc +=8
                    }else{
                        eggs[i].wysokosc +=11
                    }
                    eggs[i].ruch = false;
                }
                if(s == trails.length+1){
                    eggs[i].wysokosc +=8
                    eggs[i].status ++
                }
                eggs[i].pozycja = (Math.round(trails[s-2].ustawienie/4)/2 + trails[s-2].roznica + trails[s-2].dlugosc*(eggs[i].tasma - trails[s-2].overflow))
                break;
            case s == trails.length+2:
                grafika = 0
                if(eggs[i].update >= eggs[i].czekaj){
                    eggs[i].update = 0
                    eggs[i].wysokosc +=1.5
                }else{
                    eggs[i].update += tick 
                }
                if(eggs[i].wysokosc > 182 && eggs[i].wysokosc < 188 && eggs[i].pozycja +5 >= Math.round(player.pozycja/8) && eggs[i].pozycja <= Math.round(player.pozycja/8) + player.grafiki[0].naturalWidth/9 - 2){
                    eggs.splice(i, 1);
                    i--
                    eggsCaught ++
                    score +=100
                    updateScore("eggs")
                    updateScore("score")
                    if(eggsCaught<8){
                        trailCzekaj -= trailCzekaj/(8-eggsCaught)
                        fox.czekaj -= fox.czekaj/(8-eggsCaught)
                    }else if(eggsCaught > 9 && gameStatus < 5){
                        var jajka = 10,
                            cT=document.getElementById("cTrails"),
                            ctxT=cT.getContext("2d")
                        ctxT.clearRect(0, 0, cP.width, cP.height)
                        gameStatus ++
                        setTimeout(function(){
                            do {
                                setTimeout(function(){
                                   ctxT.drawImage(
                                       bonusImage,
                                       147*cP.width/320 - (bonusImage.naturalWidth/9 + 4)*(eggsCaught)*cP.width/320,
                                       30*cP.height/210,
                                       bonusImage.naturalWidth/9*cP.width/320,
                                       bonusImage.naturalHeight/9*cP.height/210
                                   )
                                   score += 10
                                   eggsCaught --
                                }, (10-jajka)*150)
                               jajka--
                            }
                            while(jajka > 0)
                            setTimeout(function(){
                                trailCzekaj = 32
                                fox.czekaj = 32
                                fox.jajko = true;
                                player.pozycja = 132;
                                eggs = [new _Egg(1, 30, 0, eggs[0].grafiki),new _Egg(9, 30, 0, eggs[0].grafiki),new _Egg(17, 30, 0, eggs[0].grafiki)]
                                lastEggsCaught = 0;     eggsCaught = 0;
                                lastLevel ++;          level ++;
                                console.log(gameStatus)
                                gameStatus -= 1
                            }, 5000)
                        }, 1000)
                    }
                }else if(eggs[i].wysokosc > 196){
                    eggs[i].status ++
                    eggs[i].czekaj = 1200
                    eggs[i].nest = eggs[i].pozycja 
                }
                break;
            case s == trails.length+3:
                function rand(minmax) {
                    return Math.floor(Math.random() * (minmax*2 + 1)) + minmax;
                }
                grafika = 1
                if(eggs[i].update >= eggs[i].czekaj){
                    eggs[i].update = 0
                    var random = rand(Math.floor(Math.random() * 2)+1)
                    eggs[i].pozycja = eggs[i].nest + random*random
                }else{
                    eggs[i].update += tick
                    if(eggs[i].update >= (eggs[i].czekaj*9/20) && eggs[i].update <= (eggs[i].czekaj*11/20)){
                        var random = rand(Math.floor(Math.random() * 2))
                        eggs[i].pozycja = eggs[i].nest + random
                    }
                }
                if(eggs[i].pozycja > (Math.round(player.pozycja/8) + 37) && eggs[i].pozycja < (Math.round(player.pozycja/8) + 42) && player.skok == 0 && gameStatus < 4){
                    gameStatus += 2
                    lastScore -= 10;        score -= 10;
                    lives --;
                    var ruch =0,
                        image = 0;
                    do {
                                setTimeout(function(){
                                    ctxP.clearRect(0,0,cP.width,cP.height)
                                    ctxT.drawImage(
                                       guardImages[image],
                                       cP.width - (guardImages[image].naturalWidth/9)*(ruch)*cP.width/320,
                                       30*cP.height/210,
                                       guardImages[image].naturalWidth/9*cP.width/320,
                                       guardImages[image].naturalHeight/9*cP.height/210
                                   )
                                }, ruch*150)
                                image = (image+1)%2
                                ruch++
                                if(cP.width - (guardImages[image].naturalWidth/9)*(ruch) < (player.pozycja/8)+8){
                                    player.pozycja = (cP.width - (guardImages[image].naturalWidth/9)*(ruch)-8)*8 
                                }
                            }
                    while(player.pozycja > -20*8)
                    if(lives == 0 || score < 0){
                        setTimeout(function(){
                            trailCzekaj = 32
                            fox.czekaj = 32
                            fox.jajko = true;
                            player.pozycja = 132;
                            eggs = [new _Egg(1, 30, 0, eggs[0].grafiki),new _Egg(9, 30, 0, eggs[0].grafiki),new _Egg(17, 30, 0, eggs[0].grafiki)]        
                            lastEggsCaught = 0;     eggsCaught = 0;
                            console.log(gameStatus)
                            gameStatus = 1
                        }, 5000)
                    }else{
                        setTimeout(function(){
                            trailCzekaj = 32
                            fox.czekaj = 32
                            fox.jajko = true;
                            player.pozycja = 132;
                            eggs = [new _Egg(1, 30, 0, eggs[0].grafiki),new _Egg(9, 30, 0, eggs[0].grafiki),new _Egg(17, 30, 0, eggs[0].grafiki)]        
                            lastEggsCaught = 0;     eggsCaught = 0;
                            console.log(gameStatus)
                            gameStatus -= 2
                        }, 5000)
                    }
                }
                break;
        }
        ctxP.drawImage(
            eggs[i].grafiki[grafika],
            eggs[i].pozycja*cP.width/320,
            eggs[i].wysokosc*cP.height/210,
            eggs[i].grafiki[grafika].naturalWidth/9*cP.width/320,
            eggs[i].grafiki[grafika].naturalHeight/9*cP.height/210
        )
    }
    /*for(var i = 0; i < (320/(trails[0].grafika.naturalWidth/9 + 8)); i++){
        ctxP.drawImage(
            eggs[0].grafiki[grafika],
            ((Math.round(trails[1].ustawienie/4)/2 + trails[1].roznica + trails[1].dlugosc*9)*cP.width/320),
            (trails[1].pozycja)*cP.height/210,
            eggs[0].grafiki[grafika].naturalWidth/9*cP.width/320,
            eggs[0].grafiki[grafika].naturalHeight/9*cP.height/210
        )
        ctxP.drawImage(
            eggs[0].grafiki[grafika],
            ((Math.round(trails[0].ustawienie/4)/2 + trails[0].roznica + trails[0].dlugosc*9)*cP.width/320),
            (trails[0].pozycja)*cP.height/210,
            eggs[0].grafiki[grafika].naturalWidth/9*cP.width/320,
            eggs[0].grafiki[grafika].naturalHeight/9*cP.height/210
        )
        ctxP.drawImage(
            eggs[0].grafiki[grafika],
            ((Math.round(trails[2].ustawienie/4)/2 + trails[2].roznica + trails[2].dlugosc*9)*cP.width/320),
            (trails[2].pozycja)*cP.height/210,
            eggs[0].grafiki[grafika].naturalWidth/9*cP.width/320,
            eggs[0].grafiki[grafika].naturalHeight/9*cP.height/210
        )
    }*/
}
        function animate(tick){
            var cT=document.getElementById("cTrails"),
                ctxT=cT.getContext("2d"),
                cS=document.getElementById("cScore"),
                ctxS=cS.getContext("2d"),
                cP=document.getElementById("cPlayer"),
                ctxP=cP.getContext("2d")
            ctxT.clearRect(
                0, 
                30*cT.height/210, //trails[0].pozycja
                cT.width, 
                (11*trails.length+8)*cT.height/210
            )
            /*ctxT.rect(
                0, 
                trails[0].pozycja*cT.height/210, 
                cT.width, 
                11*trails.length*cT.height/210
            )
            ctxT.fill()*/
            //ctxS.clearRect(0, 0, cS.width, cS.height/10)
            ctxP.clearRect(0, 0, cP.width, cP.height)
            /*for(var i = 0; i < 3; i++){
                ctxS.rect(0, 0, cS.width ,cS.height*(38+(11*i))/210);
                ctxS.lineWidth = 1;//cT.width/320;
                ctxS.strokeStyle = "red"
                ctxS.stroke();
            }*/
            if(gameStatus != 4)
                animateEggs(tick)
            
            if(gameStatus > 1 && gameStatus < 5){
                ctxP.drawImage(
                    player.grafiki[0],
                    Math.round(player.pozycja/8)*cP.width/320,
                    player.wysokosc*cP.height/210,
                    player.grafiki[0].naturalWidth/9*cP.width/320,
                    player.grafiki[0].naturalHeight/9*cP.height/210
                )
                if(player.skok == 0){
                    ctxP.drawImage(
                        player.grafiki[Math.ceil(player.step/3)],
                        (Math.round(player.pozycja/8) + player.grafiki[0].naturalWidth/9 - 2)*cP.width/320,
                        player.wysokosc*cP.height/210,
                        player.grafiki[1].naturalWidth/9*cP.width/320,
                        player.grafiki[1].naturalHeight/9*cP.height/210
                    )
                    if(controls.pressed[0] || controls.pressed[2]){
                        player.step = (player.step)%6 + 1
                    }else{
                        player.step = 4
                    }
                }else{
                    //console.log(player.skok,(player.skok%12)+1,Math.ceil(((player.skok%12) + 1)/6 + 1))
                    ctxP.drawImage(
                        player.grafiki[Math.ceil(((player.skok%12) + 1)/6 + 1)],
                        (Math.round(player.pozycja/8) + player.grafiki[0].naturalWidth/9 - 2)*cP.width/320,
                        (player.wysokosc-player.grafiki[0].naturalHeight/9)*cP.height/210,
                        player.grafiki[1].naturalWidth/9*cP.width/320,
                        player.grafiki[1].naturalHeight/9*cP.height/210
                    )
                    if(player.skok > tick-1){
                        player.skok -= tick
                    }else{
                        player.skok = 0
                    }
                }
                
                if(fox.meta < fox.pozycja){
                    ctxP.drawImage(
                        fox.grafiki[fox.step+2],
                        Math.round(fox.pozycja/2)*cP.width/320,
                        fox.wysokosc*cP.height/210,
                        fox.grafiki[0].naturalWidth/9*cP.width/320,
                        fox.grafiki[0].naturalHeight/9*cP.height/210
                    )
                }else{
                    ctxP.drawImage(
                        fox.grafiki[fox.step],
                        Math.round(fox.pozycja/2)*cP.width/320,
                        fox.wysokosc*cP.height/210,
                        fox.grafiki[0].naturalWidth/9*cP.width/320,
                        fox.grafiki[0].naturalHeight/9*cP.height/210
                    )
                }
            }else{
                if(gameStatus == 5){
                    ctxP.drawImage(
                        player.grafiki[0],
                        Math.round(player.pozycja/8)*cP.width/320,
                        player.wysokosc*cP.height/210,
                        player.grafiki[0].naturalWidth/9*cP.width/320,
                        player.grafiki[0].naturalHeight/9*cP.height/210
                    )
                }
                /*ctxP.drawImage(
                        player.grafiki[Math.ceil(player.step/3)],
                        (Math.round(player.pozycja/8) + player.grafiki[0].naturalWidth/9 - 2)*cP.width/320,
                        player.wysokosc*cP.height/210,
                        player.grafiki[1].naturalWidth/9*cP.width/320,
                        player.grafiki[1].naturalHeight/9*cP.height/210
                    )*/
                ctxP.drawImage(
                    fox.grafiki[fox.step],
                    Math.round(fox.pozycja/2)*cP.width/320,
                    fox.wysokosc*cP.height/210,
                    fox.grafiki[0].naturalWidth/9*cP.width/320,
                    fox.grafiki[0].naturalHeight/9*cP.height/210
                )
            }
            if(gameStatus != 4)
                for(var i in trails){
                    var next = (-trails[i].grafika.naturalWidth/9 - 8)*2
                    do {
                        ctxT.drawImage(
                            trails[i].grafika,
                            (Math.round(trails[i].ustawienie/4)/2 - trails[i].dlugosc - 24 + next)*cP.width/320,
                            (trails[i].pozycja - 0)*cT.height/210,
                            trails[i].grafika.naturalWidth/9*cT.width/320,
                            trails[i].grafika.naturalHeight/9*cT.height/210
                        )
                        next += (trails[i].grafika.naturalWidth/9 + 8)
                    }
                    while(next < 320 + 32 + trails[i].grafika.naturalWidth/9 - Math.round(trails[i].ustawienie/4)/2)
                }
            
            /*for(var i in trails) {
                var img = new Image();
                img.onload = (function (nr) {
                    ctx.drawImage(
                        trails[nr].grafika,
                        (trails[nr].ustawienie + 5)*cT.width/320,
                        (trails[nr].pozycja + 10)*cT.height/210,
                        (trails[nr].dlugosc - 8)*cT.width/320,
                        trails[nr].wysokosc*cT.height/210
                    )
                }(i))
            }*/
        }