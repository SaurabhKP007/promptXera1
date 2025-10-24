import { useEffect, useRef } from 'react';

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 80;

    class Particle {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      color: string;
      size: number;

      constructor() {
        this.x = Math.random() * canvas.width - canvas.width / 2;
        this.y = Math.random() * canvas.height - canvas.height / 2;
        this.z = Math.random() * 1000;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.vz = Math.random() * 2 + 1;

        const colors = ['#00FFFF', '#FF0080', '#FFD700'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.z -= this.vz;

        if (this.z < 1) {
          this.z = 1000;
          this.x = Math.random() * canvas.width - canvas.width / 2;
          this.y = Math.random() * canvas.height - canvas.height / 2;
        }
      }

      draw() {
        if (!ctx || !canvas) return;

        const scale = 500 / this.z;
        const x2d = this.x * scale + canvas.width / 2;
        const y2d = this.y * scale + canvas.height / 2;

        if (x2d < 0 || x2d > canvas.width || y2d < 0 || y2d > canvas.height) {
          return;
        }

        const size = this.size * scale;
        const opacity = Math.max(0, 1 - this.z / 1000);

        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function drawConnections() {
      if (!ctx || !canvas) return;

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const scale1 = 500 / p1.z;
          const scale2 = 500 / p2.z;

          const x1 = p1.x * scale1 + canvas.width / 2;
          const y1 = p1.y * scale1 + canvas.height / 2;
          const x2 = p2.x * scale2 + canvas.width / 2;
          const y2 = p2.y * scale2 + canvas.height / 2;

          const dx = x2 - x1;
          const dy = y2 - y1;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = (1 - distance / 150) * 0.3;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
    }

    function drawCodeStream() {
      if (!ctx || !canvas) return;

      const codeSnippets = ['{', '}', '[', ']', '0', '1', '<', '>', '/', '*'];
      const streamCount = 5;

      for (let i = 0; i < streamCount; i++) {
        const x = Math.random() * canvas.width;
        const y = (Date.now() * 0.05 + i * 200) % canvas.height;
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

        ctx.font = '14px monospace';
        ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
        ctx.fillText(snippet, x, y);
      }
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(11, 12, 16, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      drawConnections();
      drawCodeStream();

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: '#0B0C10' }}
    />
  );
}
