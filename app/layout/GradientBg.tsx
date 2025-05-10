'use client';

import React, { useEffect, useRef, useState } from 'react';

import styles from './styles/gradient-bg.module.css';

const GradientBg = () => {
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isFirstMove = true;

    const animateCursor = () => {
      const deltaX = targetX - currentX;
      const deltaY = targetY - currentY;

      currentX += deltaX * 0.1;
      currentY += deltaY * 0.1;

      if (bubbleRef.current) {
        bubbleRef.current.style.transform = `translate(${Math.round(currentX)}px, ${Math.round(currentY)}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animateCursor);
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (isFirstMove) {
        currentX = targetX;
        currentY = targetY;
        isFirstMove = false;
        if (bubbleRef.current) {
          bubbleRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameRef.current = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      setSvgSize({ width, height });
    });

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.gradient_bg}>
      <svg
        viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
        xmlns="http://www.w3.org/2000/svg"
        className={styles.noiseBg}
      >
        <filter id="noiseFilterBg">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.6"
            stitchTiles="stitch"
          />
        </filter>

        <rect
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          filter="url(#noiseFilterBg)"
        />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" className={styles.svgBlur}>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={styles.gradients_container}>
        <div className={styles.g1}></div>
        <div className={styles.g2}></div>
        <div className={styles.g3}></div>
        <div className={styles.g4}></div>
        <div className={styles.g5}></div>
        <div className={styles.interactive} ref={bubbleRef}></div>
      </div>
    </div>
  );
};

export default GradientBg;
