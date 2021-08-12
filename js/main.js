let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 500;
let score = 0;
let timer = 50;
let FPS = 70;
let keyState = [];
keyState.length = 256;

let arahKiri = 37;
let arahKanan = 39;
let tembak = 32;
let start = false;

let peluru = [];

let player = new Player();
let coin = [];

let coinbiru = [];
let bomb = [];
let star = [];

let hit_delay = 0;
let w_delay = 0;


canvas.addEventListener("keydown", keyDown);
canvas.addEventListener("keyup", keyUp);

function keyDown(event) {
  keyState[event.keyCode] = true;
}

function keyUp(event) {
  keyState[event.keyCode] = false;
}


function init() {
  setTimeout(function () {
    requestAnimationFrame(init);
    canvas.focus();
    if (start) {
      if (score == 500) {
        stage2();
      }
      if (score == 1500) {
        stage3();
      }

      if (score == 2000) {
        NewAbility();
      }

      if (score == 2500) {
        stage4();
      }

      if (score == 3500) {
        finalstage();
      }

      if (timer == 0 || timer <= 0) {
        timer = 0;
        habis();
      }

      if (score >= 5000) {
        menang();
      }

      if (score == 3000) {
        rainingBomb();
      }

      if (score == 4800) {
        rainingBomb();
      }

      if (score >= 500 && score < 1500) {
        FPS += 30;
      } else if (score >= 1500 && score < 2500) {
        FPS += 30;
      } else if (score >= 2500 && score < 3500) {
        FPS += 30;
      } else if (score >= 3500) {
        FPS += 30;
      }

      update();
      draw();
    }
  }, 1000 / FPS);
}

init();

function NewAbility() {
  let newability = document.getElementsByClassName('newability');
  newability[0].style.display = 'block';
  setTimeout(() => {
    newability[0].style.display = 'none';
  }, 3000);
}

function rainingBomb() {
  let rainbomb = document.getElementsByClassName('rainbomb');
  rainbomb[0].style.display = 'block';
  setTimeout(() => {
    rainbomb[0].style.display = 'none';
  }, 3000);
}

function finalstage() {
  let finalstage = document.getElementsByClassName('finalstage');
  finalstage[0].style.display = 'block';
  setTimeout(() => {
    finalstage[0].style.display = 'none';
  }, 3000);
}

function stage4() {
  let stage4 = document.getElementsByClassName("stage4");
  stage4[0].style.display = "block";
  setTimeout(() => {
    stage4[0].style.display = "none";
  }, 3000);
}

function stage2() {
  let stage2 = document.getElementsByClassName("stage2");
  stage2[0].style.display = "block";
  setTimeout(() => {
    stage2[0].style.display = "none";
  }, 3000);
}

function stage3() {
  let stage3 = document.getElementsByClassName("stage3");
  stage3[0].style.display = "block";
  setTimeout(() => {
    stage3[0].style.display = "none";
  }, 3000);
}

function startGame() {
  const start = document.getElementById("start");
  start.parentNode.removeChild(start);

  let audio = document.createElement("AUDIO");
  document.body.appendChild(audio);
  audio.src = "sound/nock.mp3";
  audio.loop = true;
  audio.play();





  countdown();
}

function countdown() {
  const ready = document.getElementsByClassName("ready");
  const Ptimer = document.getElementById("timer");
  let timer = 5;
  ready[0].style.display = "block";

  const interval = setInterval(() => {
    timer--;
    Ptimer.innerHTML = timer;
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    Ptimer.innerHTML = "<b><i>Start !!!</i></b>";

    setTimeout(() => {
      ready[0].style.display = "none";
      start = true;
      habiswaktu();
    }, 1000);
  }, 5000);
}

function Player() {
  let cd_factor = 10;
  this.getCD = function () {
    return cd_factor;
  };
  this.active = true;
  this.width = 35;
  this.height = 35;
  this.x = canvas.width / 2 - this.width / 2;
  this.y = canvas.height - this.height;
  this.drawPlayer = function () {
    const player = new Image();
    player.src = "img/cart2.png";
    ctx.drawImage(player, this.x, this.y, this.width, this.height);
  };

  this.getHit = function () {
    score += 10;
  };

  this.HitCoinBiru = function () {
    timer += 5;
  };

  this.HitBomb = function () {
    timer -= 10;
    score -= 10;
  };

  this.Hitstar = function () {
    score += 50;
  }
}

Player.prototype.draw = function () {

  this.drawPlayer();

};

Player.prototype.shoot = function () {
  if (w_delay === 0) {
    peluru.push(new Peluru({
      vel: 7,
      x: this.x + this.width / 2,
      y: this.y

    }));
    w_delay = 100;
  }


}

function Peluru(peluru) {
  this.active = true;
  this.color = "yellow";
  this.width = 2;
  this.height = 4;
  this.yVel = -peluru.vel;
  this.x = peluru.x;
  this.y = peluru.y;
}

Peluru.prototype.die = function () {
  this.active = false;
}

Peluru.prototype.draw = function () {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.width, this.height);

  if(Math.abs(player.y - this.y) < 5)
  {
    this.active = false;
  }
}

Peluru.prototype.update = function () {
  this.y += this.yVel;
  this.active = this.active;
}

function Coin() {
  this.active = true;
  this.width = 35;
  this.height = 35;
  this.x = canvas.width * Math.random();
  this.y = 0;
  this.xVel = 0;
  this.yVel = 4;
  this.drawCoin = function () {
    const coin = new Image();
    coin.src = "img/coin.png";
    ctx.drawImage(coin, this.x, this.y, this.width, this.height);
  };
}

Coin.prototype.draw = function () {
  this.drawCoin();

  if (Math.abs(player.y - this.y) < 5) {
    this.active = false;
  }
};

Coin.prototype.die = function () {
  this.active = false;
};

Coin.prototype.update = function () {
  this.x += this.xVel;
  this.y += this.yVel;
  this.active = this.active;
};

function CoinBiru() {
  this.active = true;
  this.width = 35;
  this.height = 35;
  this.x = canvas.width * Math.random();
  this.y = 0;
  this.xVel = 0;
  this.yVel = 4;
  this.drawCoin = function () {
    const coin = new Image();
    coin.src = "img/coinbiru.png";
    ctx.drawImage(coin, this.x, this.y, this.width, this.height);
  };
}

CoinBiru.prototype.draw = function () {
  this.drawCoin();
  if (Math.abs(player.y - this.y) < 5) {
    this.active = false;
  }
};

CoinBiru.prototype.die = function () {
  this.active = false;
};

CoinBiru.prototype.update = function () {
  this.x += this.xVel;
  this.y += this.yVel;
  this.active = this.active;
};

function Bomb() {
  this.active = true;
  this.width = 35;
  this.height = 35;
  this.x = canvas.width * Math.random();
  this.y = 0;
  this.xVel = 0;
  this.yVel = 4;
  this.drawBomb = function () {
    const bomb = new Image();
    bomb.src = "img/bomb2.png";
    ctx.drawImage(bomb, this.x, this.y, this.width, this.height);
  };
}

Bomb.prototype.draw = function () {
  this.drawBomb();
  if (Math.abs(player.y - this.y) < 5) {
    this.active = false;
  }
};

Bomb.prototype.die = function () {
  this.active = false;
};

Bomb.prototype.update = function () {
  this.x += this.xVel;
  this.y += this.yVel;
  this.active = this.active;
};

function Star() {
  this.active = true;
  this.width = 35;
  this.height = 35;
  this.x = canvas.width * Math.random();
  this.y = 0;
  this.xVel = 0;
  this.yVel = 4;
  this.drawStar = function () {
    const star = new Image();
    star.src = "img/star.png";
    ctx.drawImage(star, this.x, this.y, this.width, this.height);
  };
}

Star.prototype.draw = function () {
  this.drawStar();
  if (Math.abs(player.y - this.y) < 5) {
    this.active = false;
  }
};

Star.prototype.die = function () {
  this.active = false;
};

Star.prototype.update = function () {
  this.x += this.xVel;
  this.y += this.yVel;
  this.active = this.active;
};


function update() {

  if (w_delay > 0)
    w_delay -= player.getCD();

  if (score > 2000) {
    if (keyState[tembak]) {
      player.shoot();
    }
  }



  if (keyState[arahKiri] && player.x > 0) {
    player.x -= 4;
  }

  if (keyState[arahKanan] && player.x < canvas.width - player.width) {
    player.x += 4;
  }

  if (score > 3500) {
    if (Math.random() < 0.02) {
      coin.push(new Coin());
    }
  } else if (score >= 2500 && score < 3500) {
    if (Math.random() < 0.05) {
      coin.push(new Coin());
    }
  } else {

    if (Math.random() < 0.1) {
      coin.push(new Coin());
    }
  }


  coin.forEach(function (coinnya) {
    coinnya.update();
  });

  coin = coin.filter(function (coinnya) {
    return coinnya.active;
  });
  if (score >= 500) {
    if (Math.random() < 0.01) {
      coinbiru.push(new CoinBiru());
    }
    coinbiru.forEach(function (coinnya) {
      coinnya.update();
    });
    coinbiru = coinbiru.filter(function (coinnya) {
      return coinnya.active;
    });
  }
  if (score > 3500) {
    if (Math.random() < 0.1) {
      bomb.push(new Bomb());
    }
  }

  if (score >= 1500 && score < 2500) {
    if (Math.random() < 0.02) {
      bomb.push(new Bomb());
    }
  }

  if (score >= 3000 && score < 3200) {
    if (Math.random() < 0.2) {
      bomb.push(new Bomb());
    }
  }

  if (score >= 4800 && score < 5000) {
    if (Math.random() < 0.2) {
      bomb.push(new Bomb());
    }
  }

  if (score >= 2500 && score < 3500) {
    if (Math.random() < 0.01) {
      bomb.push(new Bomb());
    }
  }

  bomb.forEach(function (bombnya) {
    bombnya.update();
  });

  bomb = bomb.filter(function (bombnya) {
    return bombnya.active;
  });
  if (score > 3500) {
    if (Math.random() < 0.02) {
      star.push(new Star());
    }
  }
  if (score >= 2500 && score < 3500) {
    if (Math.random() < 0.01) {
      star.push(new Star());
    }
  }
  star.forEach(function (starnya) {
    starnya.update();
  });

  star = star.filter(function (starnya) {
    return starnya.active;
  });

  if (score > 2000) {

    peluru.forEach(function (pelurunya) {

      pelurunya.update();

    })

    peluru = peluru.filter(function (pelurunya) {
      return pelurunya.active;
    })
  }


  LoopingObject();


}

function LoopingCheck(a, b) {
  return (
    a.x < b.x + b.width &&
    a.y < b.y + b.height &&
    b.x < a.x + a.width &&
    b.y < a.y + a.height
  );
}

function LoopingObject() {
  peluru.forEach(function (pelurunya) {
    bomb.forEach(function (bombnya) {
      if (LoopingCheck(pelurunya, bombnya)) {
        pelurunya.die();
        bombnya.die();

        const audio = document.createElement("AUDIO");
        document.body.appendChild(audio);
        audio.src = "sound/bomb.mp3";
        audio.play();
      }
    });
  });
  coin.forEach(function (coinnya) {
    if (LoopingCheck(coinnya, player)) {
      coinnya.die();
      player.getHit();
      const audio = document.createElement("AUDIO");
      document.body.appendChild(audio);
      audio.src = "sound/point.wav";
      audio.play();
    }
  });

  coinbiru.forEach(function (coinnya) {
    if (LoopingCheck(coinnya, player)) {
      coinnya.die();
      player.HitCoinBiru();
      const audio = document.createElement("AUDIO");
      document.body.appendChild(audio);
      audio.src = "sound/point.wav";
      audio.play();
    }
  });

  bomb.forEach(function (bombnya) {
    if (LoopingCheck(bombnya, player)) {
      bombnya.die();
      player.HitBomb();
      const audio = document.createElement("AUDIO");
      document.body.appendChild(audio);
      audio.src = "sound/bomb.mp3";
      audio.play();
    }
  });

  star.forEach(function (starnya) {
    if (LoopingCheck(starnya, player)) {
      starnya.die();
      player.Hitstar();
      const audio = document.createElement("AUDIO");
      document.body.appendChild(audio);
      audio.src = "sound/point.wav";
      audio.play();
    }
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw();

  coin.forEach(function (coinnya) {
    coinnya.draw();
  });

  if (score >= 500) {
    coinbiru.forEach(function (coinnya) {
      coinnya.draw();
    });
  }

  if (score >= 1500) {
    bomb.forEach(function (bombnya) {
      bombnya.draw();
    })
  }

  if (score >= 2500) {
    star.forEach(function (starnya) {
      starnya.draw();
    })
  }

  if (score > 2000) {
    peluru.forEach(function (pelurunya) {
      pelurunya.draw();
    })
  }



  ctx.font = "8pt Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 5, 15);

  ctx.font = "8pt Calibri";
  ctx.fillStyle = "white";
  ctx.fillText("Time: " + timer, 5, 25);
}

function habiswaktu() {


  setInterval(() => {
    timer--;
  }, 1000);
}

function menang() {
  const congrat = document.getElementsByClassName("congratulations");
  const menang = document.getElementById('menang');
  const finish = document.getElementById("finish");
  start = false;
  const audio = document.getElementsByTagName("AUDIO")[0];
  audio.pause();
  congrat[0].style.display = "block";
  menang.innerHTML = "<b><i>Congratulations</i></b>"
  finish.innerHTML = "<b><i>You Win The Game!</i></b>";
  const lagu = document.createElement("AUDIO");
  document.body.appendChild(lagu);
  lagu.src = "sound/bell.mp3";
  lagu.play();
}

function habis() {
  const congrat = document.getElementsByClassName("congratulations");
  const finish = document.getElementById("finish");
  start = false;
  const audio = document.getElementsByTagName("AUDIO")[0];
  audio.pause();
  congrat[0].style.display = "block";
  finish.innerHTML = "<b><i>Your Final Score is " + score + "</i></b>";
  const lagu = document.createElement("AUDIO");
  document.body.appendChild(lagu);
  lagu.src = "sound/bell.mp3";
  lagu.play();
}