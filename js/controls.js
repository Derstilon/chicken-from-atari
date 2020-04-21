function _Controls() {
    this.keycodes = [];
    this.pressed = [];
    for(var i in arguments){
        this.keycodes.push(arguments[i]);
        this.pressed[i] = false
    }
}
function makeControls() {
    controls = new _Controls(37, 38, 39, 13)
    window.onkeydown = function(event){
        for(var i in controls.keycodes){
            if(event.keyCode == controls.keycodes[i]){
                if(player.skok == 0 && controls.pressed[i] == false && i%4 == 1 && gameStatus > 2)
                    player.skok = 480
                controls.pressed[i] = true
            }
        }
        //console.log(controls.pressed)
    }
    window.onkeyup = function(event){
    //alert(event.keyCode)
        for(var i in controls.keycodes){
            if(event.keyCode == controls.keycodes[i])
                controls.pressed[i] = false
        }
        //console.log(controls.pressed)
    }
}
function movePlayer(tick) {
    for(var i in controls.pressed){
        //console.log(controls.pressed[i])
        if(controls.pressed[i]){
            switch(i%4) {
                case 0:
                    if(player.pozycja > 0 && gameStatus > 2 && gameStatus < 4){
                        player.pozycja -= 1.5*tick
                        if(player.pozycja < 0)
                            player.pozycja = 0
                    }
                    break;
                case 1:
                    break;
                case 2:
                    if(player.pozycja < (320 - player.dlugosc)*8 && gameStatus > 2 && gameStatus < 4){
                        player.pozycja += 1.5*tick
                        if(player.pozycja > (320 - player.dlugosc)*8)
                            player.pozycja = (320 - player.dlugosc)*8
                    }
                    break;
                case 3:
                    if(gameStatus == 1){
                        gameStatus ++
                        lastEggsCaught = 0;     eggsCaught = 0;
                        lastScore = 0;          score = 0;
                        lastLevel = 0;          level = 0;
                        lastLives = 3;          lives = 3;
                        setTimeout(function(){
                            console.log(gameStatus)
                            gameStatus ++
                        }, 2000)
                    }
                    break;
            }
        }
    }
}