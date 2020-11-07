let chars = [];
let charSize = 15;
let clumpCount;
let frame = 0;
let clumpSize = 10;

let allChars = "手田水口廿卜山戈人心日尸木火土竹十大中難金女月弓".split("");

addEventListener("resize", () => {
  reset();
});

addEventListener("dblclick", () => {
  reset();
  L.lockPointer();
  L.fullscreen();
});

function setup() {
  L.setCanvasSize(innerWidth, innerHeight);

  clumpCount = Math.floor(L.width / charSize);
  newLine();
}

function randomChar() {
  return allChars[Math.floor(L.random(allChars.length))];
}

function reset() {
  chars = [];
  L.setCanvasSize(innerWidth, innerHeight);
  clumpCount = Math.floor(L.width / charSize);
}

function newLine() {
  let y = -200;
  for (let i = 0; i < clumpCount / 10; i++) {
    let x = L.random(0, L.width);
    for (let j = 0; j < clumpSize; j++) {
      let letter = randomChar();
        let brightness = L.random(1) + 0.2;
        let velocity = L.random(3, 7);
      let size = Math.round(charSize + L.random(-charSize / 2, charSize / 2));
      let offset = Math.round(L.random(-clumpSize * charSize, clumpSize * charSize));
      chars.push(new Character(letter, x + offset, y, size, velocity, brightness));
    }
  }

  // for (let i = 0; i < clumpCount; i++) {
  //   // let x = L.random(0, L.width);
  //   let x = i * charSize + charSize / 2 ;
  //   let brightness = L.random(1) + 0.2;
  //   let velocity = L.random(3, 7);
  //   for (let j = 0; j < clumpSize; j++) {
  //     let letter = randomChar();
  //     let y = -(j * charSize);
  //     // let size = Math.round(averageSize + L.random(-averageSize / 2, averageSize / 2));
  //     // let offset = Math.round(L.random(-clumpSize * charSize, clumpSize * charSize));
  //     chars.push(new Character(letter, x, y, charSize, velocity, brightness));
  //   }
  // }
}

function draw() {
  L.background("black");

  if (frame % 5 == 0) newLine();
  chars = chars.filter((c) => {
    c.show();
    if (!c.isDiming) if (L.random(10) < 1 || c.y > L.heigth / 2) c.startDiming();
    c.update();
    return !c.shouldRemove();
  });

  frame += 1;
}
