import Bubbles from "./bubbles";
import Player from "./player";
import * as Collisions from "./collision";
import Ammo from "./ammo";

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('canvas');
    const c = canvas.getContext('2d');
    canvas.height = 600;
    canvas.width = 1250;
    
    
    //bcakground
    const background = new Image();
    const border = new Image();
    background.src = "./src/images/wall2.jpg"

    let endOfGame = false;
    let timeOver = false;

    //player, bubbles, and ammo
    let player = new Player();
    let score = 0;
    let lives = [1,2,3]
    // let lives = []
    let reanimate = false;
    
    
   
    
    
    let timerX = 300;
    let timerWidth = 700;
    
    
    let bubbles = [new Bubbles(750, 100, 30, 1.5, 1.5)]
    console.log(bubbles);
    //   , new Bubbles(550, 100, 50, -1.5, -1.5)
    let magazine = [];
    // let b1 = new Bubbles(450, 100, , 1.5, 1.5)


    window.addEventListener('keydown', (e) => {
        if (e.key === " "){
            magazine.push(new Ammo(player.x + 50, player.y))
        }
    });
    
    gameStart();
  
    function animate() {
        reanimate =  false;
        c.clearRect(0 , 0, canvas.width, canvas.height)
        // c.fillStyle = 'rgba(255, 255, 0, 0.1)';
        c.drawImage(background, 0, 0, canvas.width, canvas.height);
     
        //timer for the game
        if ( timerX < 1000){
            c.fillStyle = 'red'
            c.fillRect(timerX, 30, timerWidth, 30)
            timerX += .3;
            timerWidth -= .3;
        }

       
        
        
        // making score appear
        c.font = '30px OCR A Std, monospace';
        c.fillStyle = 'black'
        c.fillText(`Score: ${score}`, 1030, 50);

        c.fillStyle = 'white'
        c.fillText(`Score: ${score}`, 1035, 50);


            c.font =  '30px OCR A Std, monospace';
            c.fillStyle = 'hsl(45, 95%, 58%)'
            c.fillText('Lives: ' + lives.length, 150 ,50)


        //player movement
        player.draw(c);
        player.move();

        //animates player
        player.handleSpriteFrame();
        // b1.draw(c);
        // b1.move();

        //bubble movement loop
        bubbles.forEach( (bubble, bubbleIndex) => {
            bubble.draw(c);
            bubble.move();
            
            //loop through array to get each ammo thats shot
            magazine.forEach( (ammo, ammoIndex) => {
                //draw the ammo
                ammo.draw(c);
                ammo.update();

                //check if its reached the top of the canvas and remove it if it has
                if (ammo.y < 0){
                    magazine.splice(ammoIndex, 1)
                }

                //check to see if the ammo hit a bubble 
                if (Collisions.ammoCollision(ammo, bubble)){
                    score += 100;
                    if(bubble.radius > 19){

                        magazine.splice(ammoIndex, 1);
                        bubbles.splice(bubbleIndex, 1);
                        bubbles.push(new Bubbles(bubble.x +50 , bubble.y, (bubble.radius - 10), 1, 1));
                        
                        //works when i have this buttom code commented out
                        bubbles.push(new Bubbles(bubble.x - 50, bubble.y , bubble.radius- 10, -1,-1));
                        // debugger

                        // remove the bubble and ammo from arrays
                        
                    }else {
                        bubbles.splice(bubbleIndex, 1);
                        
                        // levelTwo();
                        reanimate = true;
                        // requestAnimationFrame(animate);
                        
                    }
                }
            })
        })  // end bubble loop
        
        //collison detection
        bubbles.forEach(bubble => {    
            if (Collisions.checkPlayerCollision(bubble, player)){
                c.drawImage(background, 0, 0, canvas.width, canvas.height);
                lives.splice(lives.length-1 ,1)

                if (lives.length === 0){
                    endOfGame = true;
                    gameOver();
                } else {
                    resetGame();
                    reanimate = true;
                    // requestAnimationFrame(animate);
                } 
            }  else {
                reanimate = true;
                // have an if statement where if level1 is true, you go to a different fucntion
                // requestAnimationFrame(animate);
            }
            
        })
        
        if (bubbles.length === 0){
            //change to level to game
            levelTwo();
        }
        if(timerX > 1000){
            timeOver = true;
            gameOver();
        }

        if (reanimate){
            console.log(reanimate);
            requestAnimationFrame(animate);
        }
            
    }
    
    

    function gameStart(){

        c.drawImage(background, 0, 0, canvas.width, canvas.height);
        let start = document.getElementById('start');

        start.style.display = 'block'
        endOfGame = false;
        
        
        start.addEventListener('click', handleClick)
        
        
    }
    
    function handleClick(e) {
        
        //hide the start button
        start.style.display = 'none'
        
        start.removeEventListener('click', handleClick)
        resetGame();
        animate();
        
    }
    

    function resetGame(){

        let over = document.getElementById('game-over')
        //check to see if it is end of game, where player has no more lives
        if(endOfGame){;
            over.style.display = 'none';                        //hide the restart button after click
            over.removeEventListener('click', resetGame)
            lives.push(1,2,3) 
            endOfGame = false
            resetGame()                                  //add new lives to game since it will be empty
            gameStart();

        } else if (timeOver) {
            over.style.display = 'none'; 
            timeOver = false;                       //hide the restart button after click

            lives = [1,2,3]
            resetGame();

        }  else{     //else player lost one life, reset to original state
     
            player = new Player();
            bubbles = [new Bubbles(650, 100, 30, 1.5, 1.5)]
            magazine = [];
            
            timerX = 300;
            timerWidth = 700;
            
        }
       

        
    }
    
    function levelTwo(){
        // bubbles = [new Bubbles(750, 100, 50, 1.5, 1.5), new Bubbles(550, 100, 50, -1.5, -1.5)]
        console.log(bubbles)
        magazine = [];
        player = new Player();
        // 
    }

    function gameOver(){
        // set endOfGame variable to true;

        c.drawImage(background, 0, 0, canvas.width, canvas.height);
        c.font = '100px impact';
        c.fillStyle = 'white';
        
        c.fillText('Game Over!', 395, canvas.height / 2)
        c.fillStyle = 'red';
        c.fillText('Game Over!', 400, canvas.height / 2)
        
        c.font = '50px impact'
        c.fillStyle = 'white'
        c.fillText('Score: ' + score, 540, 350 )

        //find restart button and add a listener to it
        let over = document.getElementById('game-over')
        over.style.display = 'block'
        over.addEventListener('click', resetGame)
    }
   


    
})


