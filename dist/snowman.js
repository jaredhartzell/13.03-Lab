/* Settings */
const flakeSize = 8;                   // Size of a single snowflake
const titleString = "SNOW";            // Title text

/* Variables */
let ctx;


window.addEventListener("DOMContentLoaded", function() 
{
   let canvas = document.querySelector("canvas");
   ctx = canvas.getContext("2d");
   drawGround(canvas);
   drawSnowText(canvas);
   drawSnowman(canvas);
   drawSnowflakes(canvas);
});

/* Displays a brown ground under light gray sky */
function drawGround(canvas) 
{
   // Background
   ctx.fillStyle = "#bbb";
   ctx.fillRect(0, 0, canvas.width, canvas.height);

   // Ground
   ctx.fillStyle = "brown";
   ctx.fillRect(0, canvas.height - 80, canvas.width, canvas.height);
}

/* Displays 100 snow flakes in randomly chosen positions */
function drawSnowflakes(canvas) 
{
   for (let c = 0; c < 100; c++) {
      let x = Math.floor(Math.random() * canvas.width);
      let y = Math.floor(Math.random() * canvas.height);
      drawSingleFlake(canvas, x, y);
   }
}

/* Displays the title text */
function drawSnowText(canvas) 
{
   // Text Settings
   ctx.font = "80px Verdana";
   ctx.textAlign = "center";
   ctx.textBaseline = "top";
   ctx.fillStyle = "blue";

   // Draw
   ctx.fillText(titleString, canvas.width / 2, 10);
}

/* Displays the snowman */
function drawSnowman(canvas) 
{
   drawCircle(150, 200, 50, "white"); // Bottom
   drawCircle(150, 120, 40, "white"); // Middle
   drawCircle(150, 60, 25, "white");  // Top

}

/* Draws a single snow flake */
function drawSingleFlake(canvas, x, y) 
{
   ctx.beginPath();
   ctx.moveTo(x, y);
   ctx.lineTo(x + flakeSize / 2, y + flakeSize / 2);
   ctx.lineTo(x, y + flakeSize);
   ctx.lineTo(x - flakeSize / 2, y + flakeSize / 2);
   ctx.fillStyle = "#eee";
   ctx.fill();

}

/* Draws a single circle */
function drawCircle(x, y, radius, color) 
{
   ctx.beginPath();
   ctx.arc(x, y, radius, 0, Math.PI * 2)
   ctx.fillStyle = color;
   ctx.fill();
}