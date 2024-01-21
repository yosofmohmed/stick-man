alert("press f11 and f5 for better display and if f11 got pressed again it could glitch so press f5. press H to remove cursor, and press j to put cursor. controles: A to move left, D to move right, space to jumb, T to hold weapon, F to put weapon in invontory, P to shoot")


let board;
let board_width = window.innerWidth;
let board_height = window.innerHeight;
let context;

console.log(window.innerHeight);


    




let player_height = 128;
let player_width = 64;
let player_Y = board_height - player_height;
let player_X = board_height / 4;

let bullet_width = 16;
let bullet_height = 4;

let player =
{
    img: null,
    y: player_Y,
    x: player_X,
    width: player_width,
    height: player_height
}


let velocity_Y = 0;
let velocity_x = 0;
let gravity = 0.4;
let if_holding_pistol_right = false;
let if_holding_pistol_left = false;

let bullet_left_loction = player.x;
let bullet_right_loction = player.x + 50;
let bullet_start_loction = 1;

let bulletarray = [];
let bullet_left_velocityx = -40;
let bullet_right_velocityx = 40;
let bulletvelocityx = 0;

window.onload = function () {

    board = document.getElementById("board");
    board.width = board_width;
    board.height = board_height;
    context = board.getContext("2d");
    context.translate(200, 0);

    window.scrollBy(0, 100);
    document.body.style.overflow = "hidden";

    player_right_img = new Image();
    player_right_img.src = "./img/right.png";
    player.img = player_right_img;
    player_right_img.onload = function () {
        context.drawImage(player.img, player.x, player.y, player.width, player.height);
    }


    player_left_img = new Image();
    player_left_img.src = "./img/left.png"

    player_right_gun_img = new Image();
    player_right_gun_img.src = "./img/holding_wepon_right.png"

    player_left_gun_img = new Image();
    player_left_gun_img.src = "./img/holding_wepon_left.png"




    requestAnimationFrame(update);
    addEventListener("keydown", moveplayer)
    addEventListener("keydown", moveplayer1)
    addEventListener("keyup", clearallvelictoy)
    addEventListener("keyup", hold_gun)
    addEventListener("keyup", shoot)
    addEventListener("resize", resizefunc)
    addEventListener("mousemove", give_x_y)
    addEventListener("keydown", remove_cursor)
}

function value(number) {
    const value = number;
    return value;
}
function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board_width, board_height);
    velocity_Y += gravity;
    player.x += velocity_x;
    if (player.x > board_width) {
        player.x = -50;
    }
    else if (player.x + player.width < 0) {
        player.x = board_width;
    }
    player.y = Math.min(player.y + velocity_Y, player_Y);
    context.drawImage(player.img, player.x, player.y, player.width, player.height);

    for (let i = 0; i < bulletarray.length; i++) {

        let bullet = bulletarray[i];
        if (Math.sign(bullet.velocityx) == 0) {
            bullet.velocityx = bulletvelocityx;
            bullet.x += bullet.velocityx;
        }
        else if (Math.sign(bullet.velocityx) == 1) {
            bullet.x += bullet.velocityx;
        }
        else if (Math.sign(bullet.velocityx) == -1) {
            bullet.x += bullet.velocityx;
        }
        context.fillStyle = "white";
        context.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }

    while (bulletarray.length > 0 && (bulletarray[0].used || bulletarray[0].x > window.innerWidth || bulletarray[0].x < 0)) {
        bulletarray.shift();
    }

    bullet_left_loction = player.x;
    bullet_right_loction = player.x + 50;

    
    

}

function moveplayer(e) {
    if (e.code == "Space" && player.y == player_Y) {
        velocity_Y = -12;
    }
}
function moveplayer1(e) {
    if (e.code == "KeyD") {
        velocity_x = 0;
        velocity_x += 3;
        if (player.img == player_right_gun_img) {
            player.img = player_right_gun_img;
        }
        else if (player.img == player_left_gun_img) {
            player.img = player_right_gun_img;
        }
        else {
            player.img = player_right_img;
        }

    } 1
    if (e.code == "KeyA") {
        velocity_x = 0;
        velocity_x += -4;
        if (player.img == player_right_gun_img) {
            player.img = player_left_gun_img;
        }
        else if (player.img == player_left_gun_img) {
            player.img = player_left_gun_img;
        }
        else {
            player.img = player_left_img;
        }

    }


}


function clearallvelictoy(e) {
    if (e.code == "KeyD") {
        velocity_x += -0.1;
        if (velocity_x = 0) {
            return;
        }
    }
    if (e.code == "KeyA") {
        velocity_x += 0.1;
        if (velocity_x = 0) {
            return;
        }
    }
}
function hold_gun(e) {
    if (e.code == "KeyT") {

        if (player.img == player_right_img) {
            player.img = player_right_gun_img;
            if_holding_pistol_right = true;
        }
        if (player.img == player_left_img) {
            player.img = player_left_gun_img;
            if_holding_pistol_left = true;
        }

    }
    if (e.code == "KeyF") {
        if (player.img == player_right_gun_img) {
            player.img = player_right_img;
            if_holding_pistol_right = false;
        }
        if (player.img == player_left_gun_img) {
            player.img = player_left_img;
            if_holding_pistol_left = false;
        }
    }
}

function shoot(e) {
    if (e.code == "KeyP") {
        if (player.img == player_right_gun_img) {
            bullet_start_loction = bullet_right_loction;
            bulletvelocityx = bullet_right_velocityx;
        }
        if (player.img == player_left_gun_img) {
            bullet_start_loction = bullet_left_loction;
            bulletvelocityx = bullet_left_velocityx;
        }
        if (if_holding_pistol_left || if_holding_pistol_right) {
            

            let bullet = {
                x: bullet_start_loction,
                y: player.y + player_height * 15 / 32 - 15,
                width: 15,
                height: bullet_height,
                used: false,
                velocityx: 0
            }
            bulletarray.push(bullet);
        }
    }
}
function resizefunc() {
    board_height = window.innerHeight;
    board_width = window.innerWidth;
    board.height = board_height;
    board.width = board_width;
    velocity_Y = -10;
}

function give_x_y(e)
{
        console.log(e.clientY);
}
function remove_cursor(e)
{
    if (e.code == "KeyH")
    {
    
        document.body.style.cursor = "none";
    }
    if (e.code == "KeyJ")
    {
        document.body.style.cursor = "auto";
    }
}