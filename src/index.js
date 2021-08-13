import Bubbles from "./bubbles";
import Player from "./player";
import checkCollision from "./collision"

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('canvas');
    const c = canvas.getContext('2d');
    canvas.height = 600;
    canvas.width = 1250;
    
    const background = new Image();
    const border = new Image();
    background.src = "./src/images/wall.jpg"

    const player = new Player();
    const bubble = new Bubbles(650, 100, 30, 3, 3);
  
    function animate() {
        c.clearRect(0 , 0, canvas.width, canvas.height)
        c.drawImage(background, 0, 0, canvas.width, canvas.height);
        
        player.draw(c);
        player.move();
        player.handleSpriteFrame();
        bubble.draw(c);
        bubble.move();
        player.fire(c);
        if (checkCollision(bubble, player)){
            c.drawImage(background, 0, 0, canvas.width, canvas.height);
            player.draw(c);
            bubble.draw(c);
            
        }else { 
    
        requestAnimationFrame(animate);
        }
    }
    
    const checkCollision = function(bubble, player){
        let diffX = (player.x) - bubble.x;

        let diffY = (player.y ) - (bubble.y);

        let dist = Math.sqrt((diffX ** 2) + (diffY ** 2))
        
        if (dist < bubble.radius) return true;
        else return false;
    }
    animate();


    
})


