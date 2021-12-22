var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener("mousemove", e => {

    mouse_pos = {
        x: e.clientX - canvas.offsetLeft,
        y: e.clientY - canvas.offsetTop
    }
});

c.font = "20px monospace";
    c.fillStyle = "red";
    c.fillText("g = toggle gravity", 25, 35);
    c.fillText("r = restart", 25, 60);

function Button(x, y){
	this.x = x;
	this.y = y;
	this.dx = 0;
	this.dy = 0;
    this.acceleration = 1;
    this.radius = 125;
    this.width = 80;
    this.height = 30;
    this.move = true;

	this.update = function(){
		c.beginPath();
    	c.rect(this.x, this.y, this.width, this.height);
    	c.fillStyle = "white";
    	c.fill();
        c.stroke();
        c.font = "15px monospace";
        c.fillStyle = "black";
        c.fillText("Click Me", this.x + 3.5, this.y + (this.height / 1.6));

    	if(mouse_pos.y < this.y + this.height + this.radius && mouse_pos.y > this.y - this.radius && mouse_pos.x < this.x + this.width + this.radius && mouse_pos.x > this.x - this.radius && this.move == true){
    		if (this.dy < (this.y - mouse_pos.y) / 10 && this.y < window.innerHeight - this.height - 1){
    			this.dy += this.acceleration;
    		}

    		else if (this.dy > (this.y - mouse_pos.y) / 10 && this.y > 1){
    			this.dy -= this.acceleration;
    		}

            else{
                this.dy = 0;
            }
    	}
    	else{ 
    		if (this.dy > 0){
    			this.dy -= this.acceleration;
    		}

    		else if (this.dy < 0){
    			this.dy += this.acceleration;
    		}

            else{
                this.dy = 0;
            }
    	}

    	if(mouse_pos.y < this.y + this.height + this.radius && mouse_pos.y > this.y - this.radius && mouse_pos.x < this.x + this.width + this.radius && mouse_pos.x > this.x - this.radius && this.move == true){
    		if (this.dx < (this.x - mouse_pos.x) / 10 && this.x < window.innerWidth - this.width - 1){
    			this.dx += this.acceleration;
    		}

    		else if (this.dx > (this.x - mouse_pos.x) / 10 && this.x > 1){
    			this.dx -= this.acceleration;
    		}

            else{
                this.dx = 0;
            }
    	}
    	else{ 
    		if (this.dx > 0){
    			this.dx -= this.acceleration;
    		}

    		else if (this.dx < 0){
    			this.dx += this.acceleration;
    		}

            else{
                this.dx = 0;
            }
    	}

        if ((this.x < 1 || this.x > window.innerWidth - this.width - 1 || this.y < 1 || this.y > window.innerHeight - this.height - 1) || this.move == false){
           this.move = false;
           this.dx = ((window.innerWidth / 2) - this.x) / 25;
           this.dy = ((window.innerHeight / 2) - this.y) / 25;
        }

        if (this.move == false && (window.innerWidth / 2) - this.x < 250 && (window.innerHeight / 2) - this.y < 250){
            this.move = true;
            this.dx = 0;
            this.dy = 0;
        }

        this.y += this.dy;
        this.x += this.dx;

        console.log(this.move);
    }
}

var button1 = new Button(window.innerWidth / 2, window.innerHeight / 2);

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    button1.update();
}

animate();