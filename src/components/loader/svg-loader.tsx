"use client";

import React from "react";

interface SVGLoaderProps {
  size?: number;
}

export function SVGLoader({ size = 120 }: SVGLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <style>{`
  :root {
    --prime-loader-duration: 2.6s;
    --prime-loader-ease: cubic-bezier(0.45, 0, 0.55, 1);
  }

  @keyframes primeStroke {
    0% {
      stroke-dashoffset: var(--prime-dash, 1080);
      opacity: 0.2;
    }
    40% {
      opacity: 0.95;
    }
    100% {
      stroke-dashoffset: 0;
      opacity: 0.7;
    }
  }

  .stroke-path {
    stroke-dasharray: var(--prime-dash, 1080);
    animation: primeStroke var(--prime-loader-duration)
      var(--prime-loader-ease) infinite alternate;
    filter: url(#prime-glow);
    transform-origin: center;
    will-change: stroke-dashoffset, opacity;
  }

  .stroke-path-1 { animation-delay: 0s; }
  .stroke-path-2 { animation-delay: 0.18s; }
  .stroke-path-3 { animation-delay: 0.36s; }
  .stroke-path-4 { animation-delay: 0.54s; }
`}</style>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.0"
        viewBox="0 0 375 374.999991"
        width={size}
        height={size}
        className="svg-loader-container"
      >
        <defs>
          <filter id="prime-glow">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="3"
              floodColor="#ed1c24"
              floodOpacity="0.45"
            />
          </filter>
          <linearGradient
            id="prime-neutral"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6d6d6d" />
            <stop offset="100%" stopColor="#a1a1a1" />
          </linearGradient>
          <linearGradient
            id="prime-neutral-dark"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#2d2d2d" />
            <stop offset="100%" stopColor="#4f4f4f" />
          </linearGradient>
          <linearGradient id="prime-brand" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff4d5a" />
            <stop offset="100%" stopColor="#c1121f" />
          </linearGradient>
          <linearGradient
            id="prime-brand-dark"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#8c0b1c" />
            <stop offset="100%" stopColor="#41040c" />
          </linearGradient>
        </defs>

        {/* Path 1 - Subtle Gray */}
        <path
          d="M 283.332031 92.003906 L 236.230469 139.109375 L 236.21875 319.175781 L 126.542969 319.1875 L 56.140625 319.199219 L 9.035156 366.300781 L 283.320312 366.285156 L 283.320312 297.21875 L 283.332031 92.003906"
          stroke="url(#prime-neutral)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-path stroke-path-1"
          style={
            { "--prime-dash": "1180" } as React.CSSProperties & {
              "--prime-dash"?: string;
            }
          }
        />

        {/* Path 2 - Dark Gray */}
        <path
          d="M 56.140625 248.785156 L 56.152344 139.117188 L 79.28125 139.113281 L 79.28125 92.019531 L 78.125 92.015625 L 78.121094 92.019531 L 9.054688 92.019531 L 9.035156 366.300781 L 56.140625 319.199219 L 56.140625 248.785156"
          stroke="url(#prime-neutral-dark)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-path stroke-path-2"
          style={
            { "--prime-dash": "900" } as React.CSSProperties & {
              "--prime-dash"?: string;
            }
          }
        />

        {/* Path 3 - Brand Red Primary */}
        <path
          d="M 319.894531 125.808594 L 319.886719 235.507812 L 296.769531 235.511719 L 296.765625 282.609375 L 297.925781 282.613281 L 366.996094 282.609375 L 367.011719 8.324219 L 319.898438 55.441406 L 319.894531 125.808594"
          stroke="url(#prime-brand)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-path stroke-path-3"
          style={
            { "--prime-dash": "1040" } as React.CSSProperties & {
              "--prime-dash"?: string;
            }
          }
        />

        {/* Path 4 - Brand Red Dark */}
        <path
          d="M 139.828125 55.441406 L 319.894531 55.429688 L 319.898438 55.441406 L 367.011719 8.324219 L 92.730469 8.34375 L 92.726562 77.414062 L 92.714844 282.621094 L 139.820312 235.519531 L 139.828125 55.441406"
          stroke="url(#prime-brand-dark)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-path stroke-path-4"
          style={
            { "--prime-dash": "1200" } as React.CSSProperties & {
              "--prime-dash"?: string;
            }
          }
        />
      </svg>
    </div>
  );
}
