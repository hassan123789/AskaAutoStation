"use client";

import { useEffect, useRef, ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: 100 | 200 | 300;
}

export function AnimateOnScroll({ children, className = "", delay }: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (delay) {
              entry.target.classList.add(`delay-${delay}`);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`animate-on-scroll ${className}`}>
      {children}
    </div>
  );
}
