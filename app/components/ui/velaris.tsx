"use client";

import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

const vertexShaderGLSL = `
attribute vec2 position;
varying vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShaderGLSL = `
precision highp float;

varying vec2 vUv;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec3 u_colors[4];
uniform vec3 u_bg;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
    -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);

  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod(i, 289.0);

  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)),
    0.0
  );

  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

  vec3 g;

  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;

  float ratio = u_resolution.x / u_resolution.y;

  vec2 p = uv - 0.5;
  p.x *= ratio;

  // Slow directional drift: each layer slides a different way through
  // noise space, so the whole field flows rather than orbiting the centre.
  float t = u_time * 0.12;

  vec2 flow1 = vec2(t * 0.50, -t * 0.30);
  vec2 flow2 = vec2(-t * 0.35, t * 0.45);
  vec2 flow3 = vec2(t * 0.25, -t * 0.40);

  // Low-frequency layers, each warped by the one before it.
  float n1 = snoise(p * 0.75 + flow1);

  vec2 warpedP = p + vec2(n1 * 0.12, n1 * 0.08);
  float n2 = snoise(warpedP * 0.95 + flow2);

  vec2 warpedP2 = warpedP + vec2(n2 * 0.08, n2 * 0.06);
  float n3 = snoise(warpedP2 * 1.15 + flow3);

  vec3 col = u_bg;

  // Wide smoothsteps → big continuous colour fields, no isolated blobs.
  col = mix(col, u_colors[0], smoothstep(-0.65, 0.65, n1) * 0.75);
  col = mix(col, u_colors[1], smoothstep(-0.55, 0.65, n2) * 0.65);
  col = mix(col, u_colors[2], smoothstep(-0.65, 0.55, n3) * 0.55);
  col = mix(col, u_colors[3], smoothstep(-0.4, 0.7, n1 * n2) * 0.35);

  float grain = fract(
    sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time
  );

  col += (grain - 0.5) * u_grain * 0.1;

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface VelarisProps {
  bg?: string;
  colors?: string[];
  speed?: number;
  grain?: number;
  height?: string;
  className?: string;
  children?: React.ReactNode;
}

const DEFAULT_COLORS = ["#86efac", "#4ade80", "#059669", "#000000"];

const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");

  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
};

const Velaris = ({
  bg = "#000000",
  colors = DEFAULT_COLORS,
  speed = 2.0,
  grain = 0.3,
  height = "100vh",
  className,
  children,
}: VelarisProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keyed by value so an inline `colors` array doesn't tear down WebGL
  // on every parent render.
  const colorsKey = colors.join(",");

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    // No WebGL → canvas stays empty, children render over the page bg.
    const gl = canvas.getContext("webgl");

    if (!gl) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);

      if (!shader) return null;

      gl.shaderSource(shader, src);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const program = gl.createProgram();
    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderGLSL);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderGLSL);

    if (!program || !vertexShader || !fragmentShader) {
      if (program) gl.deleteProgram(program);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const position = gl.getAttribLocation(program, "position");

    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const locations = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      grain: gl.getUniformLocation(program, "u_grain"),
      colors: gl.getUniformLocation(program, "u_colors"),
      background: gl.getUniformLocation(program, "u_bg"),
    };

    // Static uniforms: set once per effect run.
    gl.uniform1f(locations.grain, grain);
    gl.uniform3f(locations.background, ...hexToRgb(bg));
    gl.uniform3fv(
      locations.colors,
      new Float32Array(colorsKey.split(",").slice(0, 4).flatMap(hexToRgb))
    );

    const draw = (time: number) => {
      gl.uniform2f(locations.resolution, canvas.width, canvas.height);
      gl.uniform1f(locations.time, time * 0.001 * speed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let animationFrame = 0;
    let visible = true;

    const resize = () => {
      // Smaller screens are usually the weakest GPUs: render at 1x there.
      const maxDpr = window.innerWidth < 768 ? 1 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;

      gl.viewport(0, 0, canvas.width, canvas.height);

      // Reduced motion: no loop, so repaint the still frame on resize.
      if (reducedMotion) draw(0);
    };

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(container);

    resize();

    const render = (time: number) => {
      draw(time);
      animationFrame = requestAnimationFrame(render);
    };

    // Don't burn GPU while the hero is scrolled out of view.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;

      cancelAnimationFrame(animationFrame);

      if (visible && !reducedMotion) {
        animationFrame = requestAnimationFrame(render);
      }
    });

    visibilityObserver.observe(container);

    if (!reducedMotion) {
      animationFrame = requestAnimationFrame(render);
    }

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();

      cancelAnimationFrame(animationFrame);

      gl.deleteBuffer(buffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
    };
  }, [bg, colorsKey, speed, grain]);

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className={cn("relative w-full overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
};

export default Velaris;
