"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ShaderProps {
  flowSpeed?: number;
  colorIntensity?: number;
  noiseLayers?: number;
  mouseInfluence?: number;
  className?: string;
}

export default function InteractiveShader({
  flowSpeed = 0.14,
  colorIntensity = 0.58,
  noiseLayers = 5.0,
  mouseInfluence = 0.05,
  className,
}: ShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
    });

    if (!gl) {
      console.error("WebGL is not supported in this browser.");
      return;
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform float uFlowSpeed;
      uniform float uColorIntensity;
      uniform float uNoiseLayers;
      uniform float uMouseInfluence;

      #define MARCH_STEPS 42

      float hash(vec3 p) {
        p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }

      float noise(vec3 x) {
        vec3 i = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);

        return mix(
          mix(
            mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), f.x),
            mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), f.x),
            f.y
          ),
          mix(
            mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), f.x),
            mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), f.x),
            f.y
          ),
          f.z
        );
      }

      float fbm(vec3 p) {
        float value = 0.0;
        float amplitude = 0.55;
        for (int i = 0; i < 8; i++) {
          if (float(i) >= uNoiseLayers) break;
          value += amplitude * noise(p);
          p *= 1.92;
          amplitude *= 0.52;
        }
        return value;
      }

      vec2 swirl(vec2 p, float amount) {
        float angle = amount * (0.85 + 0.15 * sin(iTime * 0.45));
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c) * p;
      }

      float map(vec3 p) {
        vec2 mouse = (iMouse.xy / iResolution.xy - 0.5) * 2.0;

        vec3 q = p;
        q.z += iTime * uFlowSpeed;
        q.xy += mouse * uMouseInfluence;

        q.xy = swirl(q.xy, 0.55 * sin(q.z * 0.7 + iTime * 0.22));
        q.x += 0.12 * sin(q.y * 2.6 + iTime * 0.42);
        q.y += 0.10 * cos(q.x * 2.0 - iTime * 0.36);

        float ribbon = sin((p.y + 0.12 * sin(p.x * 2.2)) * 2.0 + iTime * 0.48) * 0.5 + 0.5;
        float field = fbm(q * vec3(1.0, 1.55, 0.95));
        field += 0.18 * fbm(q * vec3(1.9, 1.15, 1.45) + 9.0);
        field = smoothstep(0.28, 0.82, field);

        float edgeFade = smoothstep(-0.95, 0.3, p.y) * (1.0 - smoothstep(0.42, 0.96, abs(p.x)));
        float pocket = smoothstep(0.08, 0.88, ribbon);
        return clamp(field * pocket * edgeFade, 0.0, 1.0);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;

        vec3 ro = vec3(0.0, -0.34, -0.78);
        vec3 rd = normalize(vec3(uv * vec2(0.88, 1.02), 1.0));

        vec3 col = vec3(0.0);
        float alpha = 0.0;
        float t = 0.0;

        for (int i = 0; i < MARCH_STEPS; i++) {
          vec3 p = ro + rd * t;
          float density = map(p);

          if (density > 0.001) {
            float hueShift = sin(iTime * 0.32 + p.y * 2.4 + p.x * 1.2);
            vec3 deepPlum = vec3(0.05, 0.01, 0.06);
            vec3 wine = vec3(0.34, 0.05, 0.26);
            vec3 magenta = vec3(0.86, 0.18, 0.66);
            vec3 lilac = vec3(0.62, 0.28, 0.84);
            vec3 auroraColor = mix(deepPlum, wine, 0.52 + 0.18 * hueShift);
            auroraColor = mix(auroraColor, magenta, 0.14 + 0.18 * density);
            auroraColor = mix(auroraColor, lilac, 0.06 + 0.10 * density);

            float contribution = density * 0.075 * uColorIntensity;
            col += auroraColor * contribution;
            alpha += contribution * 1.22;
          }

          t += 0.08;
        }

        alpha = clamp(alpha, 0.0, 0.52);
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(`Shader compile error: ${gl.getShaderInfoLog(shader)}`);
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(`Program linking error: ${gl.getProgramInfoLog(program)}`);
      return;
    }

    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const iMouseLocation = gl.getUniformLocation(program, "iMouse");
    const uFlowSpeedLocation = gl.getUniformLocation(program, "uFlowSpeed");
    const uColorIntensityLocation = gl.getUniformLocation(program, "uColorIntensity");
    const uNoiseLayersLocation = gl.getUniformLocation(program, "uNoiseLayers");
    const uMouseInfluenceLocation = gl.getUniformLocation(program, "uMouseInfluence");

    const startTime = performance.now();
    let animationFrameId = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const renderLoop = () => {
      if (gl.isContextLost()) return;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const currentTime = performance.now();
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
      gl.uniform2f(
        iMouseLocation,
        mousePos.current.x * canvas.width,
        (1.0 - mousePos.current.y) * canvas.height,
      );
      gl.uniform1f(uFlowSpeedLocation, flowSpeed);
      gl.uniform1f(uColorIntensityLocation, colorIntensity);
      gl.uniform1f(uNoiseLayersLocation, noiseLayers);
      gl.uniform1f(uMouseInfluenceLocation, mouseInfluence);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);

      if (!gl.isContextLost()) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(vertexBuffer);
      }
    };
  }, [flowSpeed, colorIntensity, noiseLayers, mouseInfluence]);

  return <canvas ref={canvasRef} className={cn("absolute left-0 top-0 h-full w-full", className)} />;
}
