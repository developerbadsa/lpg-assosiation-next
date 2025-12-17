import React from 'react';

type MeshCornersProps = {
  className?: string;
  color?: string; // e.g. "#2D8A2D"
  opacity?: number; // 0..1
  left?: boolean;
  right?: boolean;
  width?: number;
  height?: number;
  strokeWidth?: number;
};

export default function MeshCorners({
  className,
  color = '#2D8A2D',
  opacity = 0.22,
  left = true,
  right = true,
  width = 340,
  height = 240,
  strokeWidth = 1,
}: MeshCornersProps) {
  const style = {
    // CSS var so SVG can consume it
    ['--mesh-color' as any]: color,
  } as React.CSSProperties;

  return (
    <div className={`pointer-events-none absolute inset-0 ${className ?? ''}`} style={style}>
      {left && (
        <svg
          className="absolute left-0 top-0"
          style={{ width, height, opacity }}
          viewBox="0 0 340 240"
          fill="none"
          aria-hidden="true"
        >
          <path d="M18 18L120 70L56 138L180 170L280 110L322 40" stroke="var(--mesh-color)" strokeWidth={strokeWidth} />
          <path d="M18 18L56 138L110 210L180 170L222 220L322 180" stroke="var(--mesh-color)" strokeWidth={strokeWidth} />
          <path d="M120 70L180 170L280 110" stroke="var(--mesh-color)" strokeWidth={strokeWidth} />
          {[
            [18, 18],
            [120, 70],
            [56, 138],
            [180, 170],
            [280, 110],
            [322, 40],
            [110, 210],
            [222, 220],
            [322, 180],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="var(--mesh-color)" opacity="0.5" />
          ))}
        </svg>
      )}

      {right && (
        <svg
          className="absolute right-0 top-0"
          style={{ width, height, opacity }}
          viewBox="0 0 340 240"
          fill="none"
          aria-hidden="true"
        >
          <path d="M322 18L220 70L284 138L160 170L60 110L18 40" stroke="var(--mesh-color)" strokeWidth={strokeWidth} />
          <path d="M322 18L284 138L230 210L160 170L118 220L18 180" stroke="var(--mesh-color)" strokeWidth={strokeWidth} />
          <path d="M220 70L160 170L60 110" stroke="var(--mesh-color)" strokeWidth={strokeWidth} />
          {[
            [322, 18],
            [220, 70],
            [284, 138],
            [160, 170],
            [60, 110],
            [18, 40],
            [230, 210],
            [118, 220],
            [18, 180],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="var(--mesh-color)" opacity="0.5" />
          ))}
        </svg>
      )}
    </div>
  );
}
