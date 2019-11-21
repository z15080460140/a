// 创建画布
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//载入背景图像
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// 载入英雄图像
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/1.jpg";

var heroImage1 = new Image();
heroImage1.src = "images/1.jpg";
var heroImage2 = new Image();
heroImage2.src = "images/2.jpg";
var heroImage3 = new Image();
heroImage3.src = "images/3.jpg";
var heroImage4 = new Image();
heroImage4.src = "images/4.jpg";

// 载入怪兽图像
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// 设置参数
var hero = {
	speed: 256 // 设置英雄每秒256像素
};
var monster = {};
var monstersCaught = 0;

// 处理键盘按钮事件
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// 当英雄抓到怪兽时候，重置位置
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// 把怪兽放到画布的任意位置
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//刷新页面，移动对象
var update = function (modifier) {
	if (38 in keysDown) { // 按向上键，英雄往上移动
		hero.y -= hero.speed * modifier;
		if(hero.y<0){hero.y=0;}
		heroImage=heroImage3;
	}
	if (40 in keysDown) { // 按向下键，英雄往下移动
		hero.y += hero.speed * modifier;
		if(hero.y>480-32){hero.y=480-32;}
		heroImage=heroImage1;
	}
	if (37 in keysDown) { // 按向左键，英雄往左移动
		hero.x -= hero.speed * modifier;
		if(hero.x<0){hero.x=0;}
		heroImage=heroImage4;
	}
	if (39 in keysDown) { // 按向右键，英雄往右移动
		hero.x += hero.speed * modifier;
		if(hero.x>512-32){hero.x=512-32;}
		heroImage=heroImage2;
	}

	// 判断是否碰撞
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// 绘制所有内容
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// 画布绘制
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("得分: " + monstersCaught*10, 32, 32);
};

// 主游戏循环
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// 动画定时刷新，间隔时间由系统根据硬件判断
	requestAnimationFrame(main);
};

// 各种浏览器支持requestAnimationFrame// 开始游戏
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// 开始游戏
var then = Date.now();
reset();
main();
