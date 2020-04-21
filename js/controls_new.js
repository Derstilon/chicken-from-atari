function _Controls() {
    this.keycodes = [];
    this.pressed = [];
    for(var i = 0; i < Math.ceil(arguments.length/4); i ++){
        var j = 0
        this.pressed[i] = []
        this.keycodes[i] = []
        while(
            (j < 4) &&
            !(
                i == Math.ceil(arguments.length/4) -1 &&
                4*i + j + 1 > arguments.length 
            )
        ){
            this.keycodes[i].push(arguments[4*i + j]);
            this.pressed[i].push(false)
            j++
        }
    }
    console.log(this.keycodes)
}
function makeControls() {
    controls = new _Controls(37, 38, 39, 13, 65, 87, 68)
    window.onkeydown = function(event){
        for(var i in controls.keycodes){
            for(var j in controls.keycodes[i]){
                if(event.keyCode == controls.keycodes[i][j]){
                    if(player.skok == 0 && controls.pressed[i][j] == false && j == 1 && gameStatus == 2)
                        player.skok = 60
                    controls.pressed[i][j] = true
                    break;
                }
            }
        }
        movePlayer()
        //console.log(controls.pressed)
    }
    window.onkeyup = function(event){
    //alert(event.keyCode)
        for(var i in controls.keycodes){
            for(var j in controls.keycodes[i]){
                if(event.keyCode == controls.keycodes[i][j])
                    controls.pressed[i][j] = false
            }
        }
        //console.log(controls.pressed)
    }
}
function movePlayer() {
    for(var i in controls.pressed){
        for(var j in controls.pressed[i]){
            if(controls.pressed[i][j]){
                switch(j) {
                    case 0:
                        if(player.pozycja > 0 && gameStatus == 2)
                            player.pozycja = player.pozycja - 2
                        break;
                    case 1:
                        break;
                    case 2:
                        if(player.pozycja < 320 - player.dlugosc && gameStatus == 2){
                            player.pozycja = player.pozycja + 2
                        }
                        break;
                    case 3:
                        if(gameStatus < 2){
                            gameStatus ++
                            prepareMenu(gameStatus)
                        }
                        console.log(gameStatus)
                        break;
                }
            }
        }
    }
}