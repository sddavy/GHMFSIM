// fountainRenderer.js

class FountainRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      throw new Error("Canvas element not found");
    }
    this.ctx = this.canvas.getContext("2d");
    this.isPlaying = false;
    this.animationFrameId = null;
    
    // Set initial size and bind resize events.
    this.resizeCanvas();
    window.addEventListener("resize", () => this.resizeCanvas());
  }
  
  resizeCanvas() {
    // Use the canvas's bounding rect to set its width and height.
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    // Re-render the scene on resize.
    this.render();
  }
  
  render() {
    // Basic static fountain rendering.
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    ctx.clearRect(0, 0, width, height);
    
    // Draw a simple fountain shape (a semi-circular arc at the bottom center)
    const gradient = ctx.createRadialGradient(width / 2, height, 10, width / 2, height, 50);
    gradient.addColorStop(0, "rgba(0, 150, 255, 0.8)");
    gradient.addColorStop(1, "rgba(0, 150, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(width / 2, height, 50, Math.PI, 2 * Math.PI);
    ctx.fill();
  }
  
  update(data) {
    // Optionally update fountain parameters based on CTL data.
    console.log("Updating fountain with data:", data);
    // For now, simply re-render.
    this.render();
  }
  
  play() {
    this.isPlaying = true;
    this.animate();
    console.log("Fountain animation started");
  }
  
  pause() {
    this.isPlaying = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    console.log("Fountain animation paused");
  }
  
  animate() {
    if (!this.isPlaying) return;
    this.renderAnimation();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
  
  renderAnimation() {
    // Example animation: a simple moving water ripple effect.
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    ctx.clearRect(0, 0, width, height);
    
    const time = Date.now() * 0.002;
    // Create a ripple effect by modulating the fountain radius.
    const ripple = Math.sin(time) * 10;
    const baseRadius = 50;
    
    const gradient = ctx.createRadialGradient(
      width / 2, height, 10 + ripple, 
      width / 2, height, baseRadius + ripple
    );
    gradient.addColorStop(0, "rgba(0, 150, 255, 0.8)");
    gradient.addColorStop(1, "rgba(0, 150, 255, 0)");
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(width / 2, height, baseRadius + ripple, Math.PI, 2 * Math.PI);
    ctx.fill();
  }
}

export default FountainRenderer;
