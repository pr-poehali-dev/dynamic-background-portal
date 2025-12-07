import { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      shape: 'box' | 'barrel' | 'cross';
    }> = [];

    const rustColors = ['#CD412B', '#8B4513', '#D2691E', '#654321', '#A0522D'];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 15 + 5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        shape: ['box', 'barrel', 'cross'][Math.floor(Math.random() * 3)] as 'box' | 'barrel' | 'cross'
      });
    }

    const drawBox = (x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      ctx.fillStyle = `rgba(205, 65, 43, ${alpha})`;
      ctx.strokeStyle = `rgba(139, 69, 19, ${alpha})`;
      ctx.lineWidth = 2;
      
      ctx.fillRect(-size / 2, -size / 2, size, size);
      ctx.strokeRect(-size / 2, -size / 2, size, size);
      
      ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
      ctx.beginPath();
      ctx.moveTo(-size / 2, -size / 2);
      ctx.lineTo(size / 2, size / 2);
      ctx.moveTo(size / 2, -size / 2);
      ctx.lineTo(-size / 2, size / 2);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawBarrel = (x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      ctx.fillStyle = `rgba(139, 69, 19, ${alpha})`;
      ctx.strokeStyle = `rgba(101, 67, 33, ${alpha})`;
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.ellipse(0, 0, size / 2, size / 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.strokeStyle = `rgba(205, 65, 43, ${alpha * 0.5})`;
      ctx.beginPath();
      ctx.moveTo(-size / 2, -size / 4);
      ctx.lineTo(size / 2, -size / 4);
      ctx.moveTo(-size / 2, size / 4);
      ctx.lineTo(size / 2, size / 4);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawCross = (x: number, y: number, size: number, rotation: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      ctx.strokeStyle = `rgba(205, 65, 43, ${alpha})`;
      ctx.lineWidth = 4;
      
      ctx.beginPath();
      ctx.moveTo(-size / 2, 0);
      ctx.lineTo(size / 2, 0);
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(0, size / 2);
      ctx.stroke();
      
      ctx.strokeStyle = `rgba(160, 82, 45, ${alpha * 0.8})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 0, size / 4, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.restore();
    };

    const drawRustTexture = () => {
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 3 + 1;
        
        ctx.fillStyle = rustColors[Math.floor(Math.random() * rustColors.length)] + '15';
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#1a0f0a');
      gradient.addColorStop(0.5, '#2d1810');
      gradient.addColorStop(1, '#1a0f0a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawRustTexture();

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;

        if (particle.x < -50) particle.x = canvas.width + 50;
        if (particle.x > canvas.width + 50) particle.x = -50;
        if (particle.y < -50) particle.y = canvas.height + 50;
        if (particle.y > canvas.height + 50) particle.y = -50;

        const distanceFromCenter = Math.sqrt(
          Math.pow(particle.x - canvas.width / 2, 2) + 
          Math.pow(particle.y - canvas.height / 2, 2)
        );
        const maxDistance = Math.sqrt(
          Math.pow(canvas.width / 2, 2) + 
          Math.pow(canvas.height / 2, 2)
        );
        const alpha = 0.3 + (1 - distanceFromCenter / maxDistance) * 0.4;

        if (particle.shape === 'box') {
          drawBox(particle.x, particle.y, particle.size, particle.rotation, alpha);
        } else if (particle.shape === 'barrel') {
          drawBarrel(particle.x, particle.y, particle.size, particle.rotation, alpha);
        } else {
          drawCross(particle.x, particle.y, particle.size, particle.rotation, alpha);
        }
      });

      requestAnimationFrame(animate);
    };

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
      className="fixed inset-0 w-full h-full -z-10"
    />
  );
};

export default AnimatedBackground;
