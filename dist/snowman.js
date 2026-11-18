/* Settings */
const flakeSize = 8;                   // Size of a single snowflake
const flakeVelocity = 30;              // Falling speed in pixels per second
const flakeCount = 100;                // Number of snowflakes
const titleString = "SNOW";            // Title text

/* Variables */
let ctx;
let snowflakes = [];
let lastFrameTime = 0;

window.addEventListener("DOMContentLoaded", function()
{
   let canvas = document.querySelector("canvas");
   ctx = canvas.getContext("2d");

   // Generate initial snowflake positions
   for (let i = 0; i < flakeCount; i++) 
   {
      snowflakes.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height });
   }

   // Start animation
   requestAnimationFrame(function(time) 
   {
      animate(canvas, time);
   });
});

/* Continuously animates falling snowflakes and redraws the scene*/
function animate(canvas, currentTime) 
{
   // Calculate elapsed time in seconds
   let deltaTime = lastFrameTime === 0 ? 0 : (currentTime - lastFrameTime) / 1000;
   lastFrameTime = currentTime;

   // Clear and redraw the scene to prevent trailing
   drawGround(canvas);
   drawSnowText(canvas);
   drawSnowman(canvas);

   // Update and draw snowflakes
   drawSnowflakes(canvas, deltaTime);

   // Request the next frame
   requestAnimationFrame(function(time) { animate(canvas, time); });
}

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

/* Draws snow flakes */
function drawSnowflakes(canvas, deltaTime) 
{
   for (let flake of snowflakes) {

      // Move snowflake downward
      flake.y += flakeVelocity * deltaTime;

      // Reset snowflake above the canvas when it reaches bottom
      if (flake.y > canvas.height) 
      {
         flake.y = -Math.random() * canvas.height;
      }

      // Draw snowflake at its updated position
      drawSingleFlake(canvas, flake.x, flake.y);
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