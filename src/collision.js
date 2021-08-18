export const checkPlayerCollision = function(bubble, player){

    // let testX = bubble.x + 10;
    // let testY = bubble.y + ;

    // if (bubble.x < player.x) {
    //     testX = player.x;
    // } else if(bubble.x > player.x + player.width) {
    //     testX =  player.x + player.width;
    // }
    // if (bubble.y < player.y ){
    //     testY = player.y;
    // } else if (bubble.y > player.y + player.height) {
    //     testY = player.y + player.height;
    // }
    
    // let distX = bubble.x - testX;

    // let distY = bubble.y - testY;

    // let distance = Math.sqrt((distX * distX) + (distY * distY))

    // if (distance <= bubble.radius){
    //     return true
    // }
    
    // return false
    
        
    let endX = player.x + 15 + player.width + 30;
    let endY = player.y + player.height + 40;
    
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










