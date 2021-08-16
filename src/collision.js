export const checkPlayerCollision = function(bubble, player){
        
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

export const ammoCollision = function (ammo, bubble){
    
    let diffX =ammo.x - bubble.x;
    
    let diffY = bubble.y - ammo.y;
    
    let dist = Math.sqrt((diffX ** 2) + (diffY ** 2))
    
    if (dist < bubble.radius ) return true;
    else return false;
    
}










