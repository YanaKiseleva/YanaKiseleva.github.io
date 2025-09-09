const canvas = document.querySelector(".animated_cursor");
const ctx = canvas.getContext("2d");

// Adjust the canvas size to the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 10 + 40; // large radius
    this.alpha = 0.9 + Math.random() * 0.11; // transparency
    this.fade = 0.01 + Math.random() * 0.08; // fade
  }

  update() {
    this.alpha -= this.fade;
  }

  draw() {
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );
    gradient.addColorStop(0, `rgb(250, 250, 133, ${this.alpha})`);
    gradient.addColorStop(1, `rgb(133, 221, 250,0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 8);
    ctx.fill();
  }
}

window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 3; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();