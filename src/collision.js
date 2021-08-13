export const checkCollision = function(bubble, player){
        let diffX = player.x - bubble.x
        let diffY = player.y - bubble.y

        let dist = Math.sqrt((diffX ** 2) + (diffY ** 2))
        
        if (dist < bubble.radius) return true;
        else return false;
    }


