

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const NODE_COUNT = 60;
const CONNECTION_DISTANCE = 110;
const MOUSE_RADIUS = 220;
const SPEED = 0.2;

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface StarfieldBackgroundProps {
  disableInteractive?: boolean;
}

export default function StarfieldBackground({ disableInteractive = false }: StarfieldBackgroundProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);
  const prefersReducedMotionRef = useRef<boolean>(false);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function handleMouseMove(e: MouseEvent) {
      if (disableInteractive) {
        mouseRef.current = { x: -1000, y: -1000 };
        return;
      }

      const target = e.target as HTMLElement;
      
      // If a hero section exists on this page, only react to mouse inside it
      const heroSection = document.getElementById('hero');
      if (heroSection && !target.closest('#hero')) {
        mouseRef.current = { x: -1000, y: -1000 };
        return;
      }

      // Disable mouse attraction when hovering over the form, inputs, or navbar
      if (target.closest('form, input, select, button, header, [role="region"]')) {
        mouseRef.current = { x: -1000, y: -1000 };
      } else {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
    }
    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    function initNodes() {
      nodesRef.current = Array.from({ length: NODE_COUNT }, () => {
        return {
          x: Math.random() * (canvas?.width ?? window.innerWidth),
          y: Math.random() * (canvas?.height ?? window.innerHeight),
          vx: (Math.random() - 0.5) * SPEED * 2,
          vy: (Math.random() - 0.5) * SPEED * 2,
          radius: 1 + Math.random() * 1.5,
          baseAlpha: 0.3 + Math.random() * 0.5,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
        };
      });
    }
    initNodes();

    function drawBackground() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;

      // Deep navy base
      ctx.fillStyle = "#000511";
      ctx.fillRect(0, 0, w, h);

      // Cyber/AI blue radial glow
      const radial = ctx.createRadialGradient(w * 0.5, h * 0.3, 0, w * 0.5, h * 0.3, w * 0.8);
      radial.addColorStop(0, "rgba(10, 35, 90, 0.3)");
      radial.addColorStop(0.5, "rgba(4, 15, 45, 0.1)");
      radial.addColorStop(1, "rgba(0, 5, 17, 0)");
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, w, h);
    }

    function drawNetwork() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const nodes = nodesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Update positions & pulse
      nodes.forEach((node) => {
        if (!prefersReducedMotionRef.current) {
          node.x += node.vx;
          node.y += node.vy;
          node.pulsePhase += node.pulseSpeed;

          // Gentle bounce off edges
          if (node.x < 0 || node.x > w) node.vx *= -1;
          if (node.y < 0 || node.y > h) node.vy *= -1;
        }
      });

      // Draw connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        // Connect to mouse
        const mdX = n1.x - mx;
        const mdY = n1.y - my;
        const mDist = Math.sqrt(mdX * mdX + mdY * mdY);

        if (mDist < MOUSE_RADIUS) {
          const mAlpha = (1 - mDist / MOUSE_RADIUS) * 0.6;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(mx, my);
          // Brighter cyan/blue for mouse connection
          ctx.strokeStyle = `rgba(100, 200, 255, ${mAlpha})`;
          ctx.stroke();

          // Pull node slightly toward mouse (AI reactivity)
          if (!prefersReducedMotionRef.current) {
            n1.x -= mdX * 0.005;
            n1.y -= mdY * 0.005;
          }
        }

        // Connect to other nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.4;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(70, 110, 255, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const pulseAlpha = node.baseAlpha + Math.sin(node.pulsePhase) * 0.2;

        // Node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(140, 200, 255, ${Math.max(0.1, pulseAlpha)})`;
        ctx.fill();

        // Node glow (only for some pulsing nodes to save performance)
        if (pulseAlpha > 0.6) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(70, 130, 255, ${(pulseAlpha - 0.6) * 0.5})`;
          ctx.fill();
        }
      });
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBackground();
      drawNetwork();

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
