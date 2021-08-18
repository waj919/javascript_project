import Bubbles from "./bubbles";
import Player from "./player";
import * as Utils from "./utils";
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
    
    //level counter to see what level you are on
    let levelCounter = 0;
   
    
    //timer details
    let timerX = 300;
    let timerWidth = 700;
    let timerXVel = .3;
    let timerWidthVel = .3;
    
    
    let bubbles = [new Bubbles(750, 100, 30, 1.5, 1.5)]
    let magazine = [];

    // how-to button
    const howToButton = document.getElementById('how-to-button')
    const popup = document.getElementsByClassName('popup')
    const close = document.getElementById('close-button')
    const resetButton = document.getElementById('reset-button')
    
    resetButton.addEventListener('click', () => {
        lives = [1,2,3]
        levelCounter = 0;
        resetGame();
    })
    
    howToButton.addEventListener('click', () => {
        popup[0].classList.add('active')
    })

    close.addEventListener( 'click', () => {
        popup[0].classList.remove('active'); 
    })


    window.addEventListener('keydown', (e) => {
        if (e.key === " "){
            magazine.push(new Ammo(player.x + 50, player.y))
        }
    });
    
    gameStart();
  

    //animate function
    function animate() {
        reanimate =  false;
        c.clearRect(0 , 0, canvas.width, canvas.height)
        c.drawImage(background, 0, 0, canvas.width, canvas.height);
     
        //timer for the game
        if ( timerX < 1000){
            c.fillStyle = 'red'
            c.fillRect(timerX, 30, timerWidth, 30)
            timerX += timerXVel;
            timerWidth -= timerWidthVel;
        }

       
        
        
        // making score appear
        Utils.drawInfo(score, lives, c);


        //player movement
        player.draw(c);
        player.move();

        //animates player
        player.handleSpriteFrame();

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
                if (Utils.ammoCollision(ammo, bubble)){
                    score += 100;
                    if(bubble.radius > 19){
                        
                        bubbles.push(new Bubbles((bubble.x - 50), (bubble.y - 40 ),( bubble.radius- 10), 1, -.8));
                        bubbles.push(new Bubbles((bubble.x + 50) , (bubble.y - 40), (bubble.radius - 10), 1, .8));
                        
                        // remove the bubble and ammo from arrays
                        bubbles.splice(bubbleIndex, 1);
                        magazine.splice(ammoIndex, 1);
                        
                    }else {
                        bubbles.splice(bubbleIndex, 1);
                        reanimate = true;
                        
                    }
                    
                }
            })
        })  // end bubble loop
        
        //collison detection
        bubbles.forEach(bubble => {    
            if (Utils.checkPlayerCollision(bubble, player)){
                c.drawImage(background, 0, 0, canvas.width, canvas.height);
                lives.splice(lives.length-1 ,1)

                if (lives.length === 0){
                    endOfGame = true;
                } else {
                    resetGame();
                    reanimate = true;
                } 
            }  else {
                reanimate = true;
            }
            
        })
        
        if (bubbles.length === 0){
            //change to level to game
            ///reset timer
            timerX = 300;
            timerWidth = 700;
            timerWidthVel = .2;
            timerXVel = .2;

            levelCounter++;
            if (levelCounter === 1) {
            //add new bubbles and reset game state
                reanimate = levelTwo();;
                requestAnimationFrame(animate)
                
            } else if(levelCounter === 2) {
                
                reanimate = levelThree();
                requestAnimationFrame(animate)
                
            }

        } else if(timerX > 1000){
            //checks to see if time is over
            timeOver = true;
            gameOver();
        }else if (endOfGame){
            //calls game over if endOfGame is true
            gameOver();
        } else if (reanimate){
           requestAnimationFrame(animate);
        }
            
    } //end of animate loop
    
    

    function gameStart(){

        c.drawImage(background, 0, 0, canvas.width, canvas.height);
        let start = document.getElementById('start');

        start.style.display = 'block'
        endOfGame = false;
        
        
        start.addEventListener('click', handleClick)
        
        
    } //end of gamestart fucntion
    
    function handleClick(e) {
        
        //hide the start button
        start.style.display = 'none'
        
        start.removeEventListener('click', handleClick)
        animate();
        
    }//end of handelclick fucntion
    

    //reset game state depending on whether player lost a life or lost all lives
    function resetGame(){

        let over = document.getElementById('game-over')


        //check to see if it is end of game, where player has no more lives

        if(endOfGame){;

            //hide the restart button after click
            over.style.display = 'none';                        
            over.removeEventListener('click', resetGame)
            score = 0;

            //add new lives to game since it will be empty
            lives.push(1,2,3) 
            endOfGame = false
            resetGame()                                  
            gameStart();

        } else if (timeOver) {
            over.style.display = 'none'; 
            timeOver = false;                       
            score = 0;
            lives = []
            endOfGame = true;
            resetGame();

        }  else{     //else player lost one life, reset to original state
            if (levelCounter === 0){
                score = 0
                player = new Player();
                bubbles = [new Bubbles(650, 100, 30, 1.5, 1.5)]
                magazine = [];
            } else if (levelCounter === 1){
                levelTwo(); 
            } else if(levelCounter === 2){
                levelThree();
            }
                
            timerX = 300;
            timerWidth = 700;
            
        }
    
    } //end of resetGame fucntion
    
    //draws gameover screen as well as the restart button for the game
    function gameOver(){
           
        c.drawImage(background, 0, 0, canvas.width, canvas.height);
        c.font = '100px impact';
        c.fillStyle = 'white';
        
        c.fillText('Game Over!', 395, canvas.height / 2)
        c.fillStyle = 'red';
        c.fillText('Game Over!', 400, canvas.height / 2)
        
        c.font = '50px impact'
        c.fillStyle = 'white'
        c.fillText('Score: ' + score, 530, 350 )
        
        levelCounter = 0;
        
        //find restart button and add a listener to it
        let over = document.getElementById('game-over')
        over.style.display = 'block'
        over.addEventListener('click', resetGame)
    
    }//end of gameOver fucntion
    

    //initiate gamestate for level 2
    function levelTwo(){
        c.drawImage(background, 0, 0, canvas.width, canvas.height);
        Utils.drawInfo(score, lives, c);
        bubbles = [new Bubbles(750, 100, 30, 1.5, 1.5), new Bubbles(500, 100, 30, 1.5, -1.5)]
        // console.log(bubbles)
        magazine = [];
        player = new Player();
        player.draw(c);
        bubbles.forEach(bubble => {
            bubble.draw(c)
        })
        return true;
    
    } //end of levelTwo fucntion 
    
    function levelThree(){
        c.drawImage(background, 0, 0, canvas.width, canvas.height);
        Utils.drawInfo(score, lives, c);
        bubbles = [new Bubbles(200, 100, 40, 1.5, 1.5), new Bubbles(600, 100, 50, 1.5, -1.5), new Bubbles(1000, 100, 40, 1.5, -1.5)]
        // console.log(bubbles)
        magazine = [];
        player = new Player();
        player.draw(c);
        bubbles.forEach(bubble => {
            bubble.draw(c)
        })
        return true;
    
    }
    
})


