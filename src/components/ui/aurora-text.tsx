"use client";

import React, { memo } from "react";
import { TypingAnimation } from "./typing-animation";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
  variant: string;
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
    speed = 1,
    variant,
  }: AuroraTextProps) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
        colors[0]
      })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    };

    return (
      <>
        {variant === "text" ? (
          <span className={`relative inline-block ${className} h-min`}>
            <span className="sr-only">{children}</span>
            <TypingAnimation
              delay={50}
              className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
              style={gradientStyle}
              aria-hidden="true"
            >
              {String(children)}
            </TypingAnimation>
          </span>
        ) : (
          <span className={`relative inline-block ${className}`}>
            <span className="sr-only">{children}</span>
            <span
              className="relative animate-aurora-number bg-[length:200%_auto] bg-clip-text text-transparent"
              style={gradientStyle}
              aria-hidden="true"
            >
              {children}
            </span>
          </span>
        )}
      </>
    );
  }
);

AuroraText.displayName = "AuroraText";
