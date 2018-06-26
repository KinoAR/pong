const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 0}
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

const game  = new Phaser.Game(config);
const paddleSpeed = 250;
const ballSpeed = 700;
const score = {player1: 0, player2: 0};
const randomFlip = () => Math.round(Math.random()) === 0 ? -1 : 1;

function preload() {
  this.load.image('paddle1', 'assets/paddle.png');
  this.load.image('ball', 'assets/ball.png');
  this.load.image('paddle2', 'assets/paddle2.png');
}


function create() {
  const text = this.add.text(375, 40, "0   0");
  const paddle1 = this.physics.add.sprite(40, 250, 'paddle1');
  const paddle2 = this.physics.add.sprite(760, 250, 'paddle2');
  const ball = this.physics.add.sprite(400, 250, 'ball');
  
  //Setup
  paddle1.setCollideWorldBounds(true);
  paddle2.setCollideWorldBounds(true);
  ball.setCollideWorldBounds(true);
  this.physics.add.collider(paddle1, ball);
  this.physics.add.collider(paddle2, ball);

  this.paddle1 = paddle1;
  this.paddle2 = paddle2;
  this.ball = ball;
  this.scoreText = text;
  this.paddle1.body.checkCollision.right = true;
  this.paddle1.body.checkCollision.left = false;
  this.paddle2.body.checkCollision.left = true;
  this.paddle2.body.checkCollision.right = false;
  this.ball.body.setBounce(1, 1);
  this.ball.body.onCollide = true;
  this.ball.body.checkCollision.left = true;
  this.ball.body.velocity.x = randomFlip() * ballSpeed;
  this.ball.body.velocity.y = -150;
  this.physics.world.on('collide', (collision, initialObject) => {
    console.log("Collision", collision, initialObject);
    if(collision.body.checkCollision.right === true) {
      initialObject.body.velocity.x = ballSpeed * 1;
      initialObject.body.velocity.y = randomFlip() * 150;
    } else if(collision.body.checkCollision.left === true) {
      initialObject.body.velocity.x = ballSpeed * - 1;
      initialObject.body.velocity.y = randomFlip() * 150;
    }
  })
}

function update() {
  this.input.keyboard.on('keydown_DOWN', () => {
    this.paddle1.body.velocity.y =  paddleSpeed;
  });
  this.input.keyboard.on('keyup_DOWN', () => {
    this.paddle1.body.velocity.y = 0;
  })
  this.input.keyboard.on('keydown_UP', () => {
    this.paddle1.body.velocity.y  = -paddleSpeed;
  });
  this.input.keyboard.on('keyup_UP', () => {
    this.paddle1.body.velocity.y = 0;
  })


  //Paddle 2 AI
  if(this.ball.body.velocity.y > 0) {
    this.paddle2.body.velocity.y = paddleSpeed;
  } else if(this.ball.body.velocity.y < 0) {
    this.paddle2.body.velocity.y = -paddleSpeed;
  } else {
    this.paddle2.body.velocity.y = 0;
  }

  //Ball Reset

  if(this.ball.body.onWall()) {
    if(this.ball.body.position.x < 400) {
      score.player2 += 1;
    } else if(this.ball.body.position.x > 400) {
      score.player1 += 1;
    }
    this.scoreText.setText(`${score.player1} - ${score.player2}`)
    this.ball.body.reset(400, 250);
    this.ball.body.velocity.x = randomFlip() * ballSpeed;
    this.ball.body.velocity.y = -150;
  }
}