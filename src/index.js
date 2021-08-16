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


    //player, bubbles, and ammo
    let player = new Player();
    let score = 0;
    const lives = [1,2,3]
    // let lives = []
    
   
    gameStart();
    
    
    let timerX = 300;
    let timerWidth = 700;

    
    let bubbles = [new Bubbles(750, 100, 50, 1.5, 1.5)]
//   , new Bubbles(550, 100, 50, -1.5, -1.5)
    let magazine = [];
    window.addEventListener('keydown', (e) => {
        if (e.key === " "){
            magazine.push(new Ammo(player.x + 50, player.y))
        }
    }   
    );
   
  
    function animate() {

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


        // for (let i = 0; i < lives.length; i++) {
            c.font =  '30px OCR A Std, monospace';
            c.fillStyle = 'hsl(45, 95%, 58%)'
            c.fillText('Lives: ' + lives.length, 150 ,50)
            // spacing += 20
        // }


        //player movement
        player.draw(c);
        player.move();

        //animates player
        player.handleSpriteFrame();

        //bubble movement loop
        bubbles.forEach( (bubble, bubbleIndex) => {
            
            bubble.draw(c);
            bubble.move();
            
            //loop through array to get each amoo thats shot
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

                        bubbles.push(new Bubbles(bubble.x , bubble.y - 60, (bubble.radius - 10), 1, 1));
                        // bubbles.push(new Bubbles(num, 100, 30, 1, 1));

                        // remove the bubble and ammo from arrays
                        magazine.splice(ammoIndex, 1);
                        bubbles.splice(bubbleIndex, 1);
                        
                    }else {
                        bubbles.splice(bubbleIndex, 1);
                        
                        levelTwo();
                        requestAnimationFrame(animate);
                        
                    }
                }
            })
        })  // end bubble loop
        
        //collison detection
        bubbles.forEach(bubble => {    
            if (Collisions.checkPlayerCollision(bubble, player)){
                c.drawImage(background, 0, 0, canvas.width, canvas.height);
                // player.draw(c);
                // bubble.draw(c);
                lives.splice(lives.length-1 ,1)


                if (lives.length === 0){

                    gameOver();

                } else if (bubbles.length === 0){
                    //change to level to game
                    levelTwo();
                } else {
                    resetGame();
                    requestAnimationFrame(animate);
                } 
            }  else {
                // have an if statement where if level1 is true, you go to a different fucntion
                requestAnimationFrame(animate);
            }
            
        })

        if(timerX > 1000){
            gameOver();
        }
            
    }
    
    

    function gameStart(){

    
        c.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        // c.fillRect(600, 300, 150, 80)

        c.font = '50px impact';
        c.fillStyle = 'White';
        c.fillText('Start Game', 610, 350)

        canvas.addEventListener('click', handleClick)
    
    }

    function handleClick(e) {
        
            const rect = e.getBoundingClientRect;
            const x = e.clientX;
            const y = e.clientY;
            let distX = x - 600;
            let distY = y - 300;
            
            const distance = Math.sqrt(distX + distY);

            if (distance < 80){
                animate();
            }
        
        canvas.removeEventListener('click', handleClick)
    }
    

    function resetGame(){
        player = new Player();
        bubbles = [new Bubbles(650, 100, 50, 1.5, 1.5)]
        magazine = [];
        
        timerX = 300;
        timerWidth = 700;
        
    }
    
    function levelTwo(){
        // bubbles = [new Bubbles(750, 100, 50, 1.5, 1.5), new Bubbles(550, 100, 50, -1.5, -1.5)]
        console.log(bubbles)
        magazine = [];
        player = new Player();
        // 
    }

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
    }
   


    
})


