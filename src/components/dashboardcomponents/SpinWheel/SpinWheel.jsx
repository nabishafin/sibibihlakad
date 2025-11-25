import React, { useEffect, useState, useRef } from "react";

export const SpinWheel = ({ isSpinning }) => {
  const canvasRef = useRef(null);
  const rotationRef = useRef(0);
  const animationRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);
  const targetRotationRef = useRef(0);
  const startRotationRef = useRef(0);
  const startTimeRef = useRef(0);

  const segments = [
    { text: "1x", color: "#4db6ac" },
    { text: "2x", color: "#ffcc80" },
    { text: "1x", color: "#64b5f6" },
    { text: "3x", color: "#ce93d8" },
    { text: "1x", color: "#4db6ac" },
    { text: "10x", color: "#ff8a65" },
    { text: "2x", color: "#81c784" },
    { text: "1x", color: "#4db6ac" },
  ];

  // Easing function for smooth deceleration (cubic-bezier equivalent)
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const drawWheel = (rotation) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw segments
    const segmentAngle = (2 * Math.PI) / segments.length;
    segments.forEach((segment, index) => {
      const startAngle = rotation + index * segmentAngle;
      const endAngle = startAngle + segmentAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = segment.color;
      ctx.fill();

      ctx.strokeStyle = "#0e1624";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw segment text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + segmentAngle / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 24px Inter, sans-serif";
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
      ctx.shadowBlur = 4;
      ctx.fillText(segment.text, radius - 30, 8);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = "#0e1624";
    ctx.fill();
    ctx.strokeStyle = "#ffae2c";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw center pointer (Dark Needle)
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;

    // Pointer Shape (Needle + Circle Base)
    ctx.beginPath();
    // Start at the tip
    ctx.moveTo(0, -80);
    // Curve down to the right side of the base
    ctx.quadraticCurveTo(5, -40, 12, -5);
    // Arc around the bottom
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    // Curve back up to the tip from the left side
    ctx.moveTo(-12, -5);
    ctx.quadraticCurveTo(-5, -40, 0, -80);
    ctx.closePath();

    ctx.fillStyle = "#0e1624";
    ctx.fill();

    ctx.restore();
  };

  const animate = () => {
    if (isAnimatingRef.current) {
      const currentTime = Date.now();
      const elapsed = currentTime - startTimeRef.current;
      const duration = 10000; // 10 seconds duration

      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easedProgress = easeOutCubic(progress);
        const rotationDiff =
          targetRotationRef.current - startRotationRef.current;
        rotationRef.current =
          startRotationRef.current + rotationDiff * easedProgress;
      } else {
        rotationRef.current = targetRotationRef.current;
        setIsAnimating(false);
        isAnimatingRef.current = false;
      }
    }

    drawWheel(rotationRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isSpinning && !isAnimatingRef.current) {
      setIsAnimating(true);
      isAnimatingRef.current = true;
      startTimeRef.current = Date.now();
      startRotationRef.current = rotationRef.current;

      // Start fast (more rotations) and slow down
      const fullSpins = 20 + Math.random() * 5; // Increased spins for higher initial speed
      const randomSegment = Math.random() * 2 * Math.PI;
      targetRotationRef.current =
        rotationRef.current + fullSpins * 2 * Math.PI + randomSegment;
    }
  }, [isSpinning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 400;
    drawWheel(rotationRef.current);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="flex justify-center my-6">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className={`max-w-full h-auto transition-all duration-300 ${isAnimating ? "filter-none" : ""
            }`}
        />
      </div>
    </div>
  );
};
export default SpinWheel;
