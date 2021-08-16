import Bubbles from "./bubbles";
import Player from "./player";
import checkCollision from "./collision"
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
    const player = new Player();
    let score = 0;
    const lives = [1,2,3,4,5]

    // const bubble = new Bubbles(650, 100, 30, 3, 3);
    const bubbles = [new Bubbles(650, 100, 50, 1.5, 1.5)]
  
    const magazine = [];
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

        
        c.font = '50px serif';
        c.fillText(`${score}`, 1000, 550);
        
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
                if (ammoCollision(ammo, bubble)){
                    score += 100;
                    let num = Math.random() * canvas.width;

                    bubbles.push(new Bubbles(num , 100, (bubble.radius - 15), 1, 1));
                    // bubbles.push(new Bubbles(Math.random() * canvas.width, 100, 30, 1, 1));

                    // remove the bubble and ammo from arrays
                    magazine.splice(ammoIndex, 1);
                    bubbles.splice(bubbleIndex, 1);

                }
                
            })
        })  // end bubble loop

        
        //collison detection
        bubbles.forEach(bubble => {    
            if (checkPlayerCollision(bubble, player)){
                c.drawImage(background, 0, 0, canvas.width, canvas.height);
                player.draw(c);
                bubble.draw(c);
                
            } else { 

                // have an if statement where if level1 is true, you go to a different fucntion
                requestAnimationFrame(animate);
            }
        })
    }
    


    const checkPlayerCollision = function(bubble, player){
    
        let endX = player.x + player.width;
        let endY = player.y + player.height;
        
        let centerX = (player.x + endX) / 2;
        let centerY = (player.y +endY) / 2;
        
        let diffX =centerX - bubble.x
        let diffY = centerY - bubble.y
    
        let dist = Math.sqrt((diffX ** 2) + (diffY ** 2))
        
        if (dist < bubble.radius+40) return true;
        else return false;
    }

    const ammoCollision = function (ammo, bubble){
    
        let diffX =ammo.x - bubble.x;
    
        let diffY = bubble.y - ammo.y;
    
        let dist = Math.sqrt((diffX ** 2) + (diffY ** 2))
        
        if (dist < bubble.radius ) return true;
        else return false;
    
    }
    

    animate();


    
})


