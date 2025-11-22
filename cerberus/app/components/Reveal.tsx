"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-right" | "fade-left" | "fade-scale";
  delay?: number;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function Reveal<T extends ElementType = "div">({
  as,
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  ...rest
}: RevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.style.setProperty("--reveal-delay", `${delay}ms`);

    if (prefersReducedMotion) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.28 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay]);

  const classes = ["reveal", variant, className].filter(Boolean).join(" ");

  return (
    <Component ref={ref as any} className={classes} {...rest}>
      {children}
    </Component>
  );
}
