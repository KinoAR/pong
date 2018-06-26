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
function preload() {
  this.load.image('paddle1', 'assets/paddle.png');
  this.load.image('ball', 'assets/ball.png');
  this.load.image('paddle2', 'assets/paddle2.png');
}


function create() {
  const paddle1 = this.physics.add.sprite(40, 250, 'paddle1');
  const paddle2 = this.physics.add.sprite(760, 250, 'paddle2');
  const ball = this.physics.add.sprite(400, 250, 'ball');
  
  //Setup
  paddle1.setCollideWorldBounds(true);
  paddle2.setCollideWorldBounds(true);
  ball.setCollideWorldBounds(true);

  this.paddle1 = paddle1;
  this.paddle2 = paddle2;
  this.ball = ball;
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
}