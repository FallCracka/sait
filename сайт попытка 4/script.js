document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // Отключает контекстное меню
});

document.addEventListener('copy', function(e) {
    e.preventDefault(); // Отключает событие копирования
});
document.addEventListener('selectstart', function(e) {
    e.preventDefault(); // Отключает выделение текста
});
document.addEventListener('mousedown', function(e) {
    e.preventDefault(); // Отключает выделение текста и курсор
});
document.addEventListener('keydown', function(event) {
    // Проверяем, нажата ли клавиша пробела
    if (event.code === 'Space') {
        event.preventDefault(); // Отключаем прокрутку
    }
});





document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

let gameActive = false;
let isJumping = false;
let score = 0;
let startTime;
let scoreInterval;

function startGame() {
  gameActive = true;
  score = 0;
  startTime = Date.now();
  document.getElementById('score').innerText = `Очки: ${score}`;
  document.getElementById('cactus').style.animation = 'moveCactus 2s infinite linear';
  checkCollision();
  startScore();
  document.getElementById('startBtn').style.display = 'none';
}

function startScore() {
  scoreInterval = setInterval(() => {
      if (gameActive) {
          const elapsedTime = Math.floor((Date.now() - startTime) / 100);
          score = elapsedTime;
          document.getElementById('score').innerText = `Очки: ${score}`;
      } else {
          clearInterval(scoreInterval);
      }
  }, 100);
}

function restartGame() {
    gameActive = false;
    clearInterval(scoreInterval);
    document.getElementById('cactus').style.animation = 'none';
    document.getElementById('cactus').style.left = '580px';
    resetDino();
    document.getElementById('startBtn').style.display = 'inline';
}

function resetDino() {
    const dino = document.getElementById('dino');
    dino.classList.remove('jump');
}

function checkCollision() {
    const cactus = document.getElementById('cactus');
    const dino = document.getElementById('dino');

    const cactusRect = cactus.getBoundingClientRect();
    const dinoRect = dino.getBoundingClientRect();

    if (
        cactusRect.left < dinoRect.right &&
        cactusRect.right > dinoRect.left &&
        cactusRect.top < dinoRect.bottom &&
        cactusRect.bottom > dinoRect.top
    ) {
        gameActive = false;
        cactus.style.animation = 'none';
        restartGame();
    } else if (gameActive) {
        setTimeout(checkCollision, 100);
    }
}

document.getElementById('startBtn').addEventListener('click', startGame);

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && gameActive && !isJumping) {
        jump();
    }
});

function jump() {
    const dino = document.getElementById('dino');
    isJumping = true;
    dino.classList.add('jump');

    setTimeout(() => {
        dino.classList.remove('jump');
        isJumping = false;
    }, 500);
}

window.onload = function() {
    document.getElementById('startBtn').style.display = 'inline';
    document.getElementById('cactus').style.animation = 'none';
}

const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    const world = engine.world;


    const render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: '#f0f034',
            wireframes: false
        }
    });


    Render.run(render);

    //пол
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 1, { isStatic: true });
    World.add(world, ground);

    //стены
    const leftWall = Bodies.rectangle(0, window.innerHeight / 2, 1, window.innerHeight, { isStatic: true });
    const rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 1, window.innerHeight, { isStatic: true });
    World.add(world, [leftWall, rightWall]);

    //шары
    function createBalls(count) {
        const balls = [];
        for (let i = 0; i < count; i++) {
            const ball = Bodies.circle(Math.random() * window.innerWidth, Math.random() * 100, 40, {
                restitution: 0.9,
                friction: 0.05,
                render: {
                    fillStyle: getRandomColor()
                }
            });
            balls.push(ball);
        }
        return balls;
    }

    //шары в мир
    const balls = createBalls(100);
    World.add(world, balls);

    //случ цвет
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    //мышь
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });
    World.add(world, mouseConstraint);

    Engine.run(engine);


const scrollToTopBtn = document.getElementById('scrollToTopBtn');


window.addEventListener('scroll', function() {

    if (window.scrollY > 100) {
        scrollToTopBtn.style.display = 'block';
    } else {

        scrollToTopBtn.style.display = 'none';
    }
});


scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
});


const canvas = document.querySelector('canvas');
canvas.addEventListener('wheel', function(event) {
    event.stopPropagation(); 
}, { passive: true });


//шары кнопка 
const amazingButton = document.getElementById('amazingButton');

amazingButton.addEventListener('click', function() {
    window.scrollTo({
        top: document.body.scrollHeight, // Прокрутка до конца
        behavior: 'smooth' 
    });
});

window.addEventListener('scroll', function() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        amazingButton.style.display = 'none'; 
    } else {
        amazingButton.style.display = 'block'; // Показываем если не снизу
    }
});
