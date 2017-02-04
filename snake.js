window.onload = function() {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    score = 0,
    level = 1,
    direction = 0,
    snake = new Array(3),
	active = true,
	speed = 350;
     
    var map = new Array(20);
    for (var i = 0; i < map.length; i++) {
		map[i] = new Array(20);
    }
     
    canvas.width = 204;
    canvas.height = 224;
     
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);
     
    map = generateSnake(map);
    map = generateFood(map);
    drawGame();
	
	window.addEventListener('keydown', function(e) {
		if (e.keyCode === 38 && (snake[0].y - 1) != snake[1].y) {
			direction = 2;
		}
		else if (e.keyCode === 40 && (snake[0].y + 1) != snake[1].y) {
			direction = 3;
		}
		else if (e.keyCode === 37 && (snake[0].x - 1) != snake[1].x) {
			direction = 1;
		}
		else if (e.keyCode === 39 && (snake[0].x + 1) != snake[1].x) {
			direction = 0;
		}
	});
     
    function drawGame() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		for (var i = snake.length - 1; i >= 0; i--) {
			if (i === 0) {
				switch(direction) {
					case 0:
						snake[0] = { x: snake[0].x + 1, y: snake[0].y }
						break;
					case 1:
						snake[0] = { x: snake[0].x - 1, y: snake[0].y }
						break;
					case 2:
						snake[0] = { x: snake[0].x, y: snake[0].y - 1 }
						break;
					case 3:
						snake[0] = { x: snake[0].x, y: snake[0].y + 1 }
						break;
				}
				
				if (snake[0].x < 0 || snake[0].x >= 20 ||
					snake[0].y < 0 || snake[0].y >= 20) {
					showGameOver();
					return;
				}
				
				if (map[snake[0].x][snake[0].y] === 1) {
					score += 10;
					map = generateFood(map);
					
					snake.push({ x: snake[snake.length -1].x, y: snake[snake.length - 1].y });
					map[snake[snake.length - 1].x][snake[snake.length - 1].y] = 2;
				
					if ((score % 50) == 0 && level < 5) {
						level += 1;
					}
				}
				else if (map[snake[0].x][snake[0].y] === 2) {
					showGameOver();
					return;
				}
				
				map[snake[0].x][snake[0].y] = 2;
			}
			else {
				if (i === (snake.length - 1)) {
					map[snake[i].x][snake[i].y] = null;
				}
				
				snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
				map[snake[i].x][snake[i].y] = 2;
			}
		}
		
		drawMain();
		 
		for (var x = 0; x < map.length; x++) {
			for (var y = 0; y < map[0].length; y++) {
				if (map[x][y] === 1) {
					ctx.fillStyle = 'black';
					ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
				} else if (map[x][y] === 2) {
					ctx.fillStyle = 'green';
					ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
				}
			}
		}
		
		if (active) {
			setTimeout(drawGame, speed - (level * 50));
		}
    }
     
    function drawMain() {
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'black';
		 
		ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);
		 
		ctx.fillStyle = 'black';
		ctx.font = '12px arial';
		ctx.fillText('Score: ' + score + ' -- Level: ' + level, 2, 12);
    }
     
    function generateFood(map){
		var randX = Math.round(Math.random() * 19),
		randY = Math.round(Math.random() * 19);

		while (map[randX][randY] === 2) {
			randX = Math.round(Math.random() * 19);
			randY = Math.round(Math.random() * 19);
		}
		map[randX][randY] = 1;
		 
		return map;
    }
     
    function generateSnake(map) {
		var randX = Math.round(Math.random() * 19),
		randY = Math.round(Math.random() * 19);

		while ((randX - snake.length) < 0) {
			randX = Math.round(Math.random() * 19);
		}
		for (var i = 0; i < snake.length; i++) {
			snake[i] = { x: randX - i, y: randY };
			map[randX - i][randY] = 2;
		}
		 
		return map;
    }
	
	function showGameOver() {
		active = false;
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		ctx.fillStyle = 'red';
		ctx.font = '20px arial';
		
		ctx.fillText('Game Over', ((canvas.width / 2) - (ctx.measureText('Game Over').width / 2)), 50);
		
		ctx.fillStyle = 'black';
		ctx. font = '16px arial';
		
		ctx.fillText('Your Score Was: ' + score, ((canvas.width / 2) - (ctx.measureText('Your Score Was: ' + score).width / 2)), 70);
	
		restart();
	}
	
	function restart() {
		if(active == false) {
			var a = document.createElement('a');
			var linkText = document.createTextNode("Restart");
			a.appendChild(linkText);
			a.title = "Restart";
			a.href = "index.html";
			document.body.appendChild(a);
		}
	}
};