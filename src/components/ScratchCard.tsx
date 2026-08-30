import { useEffect, useRef, useState } from "react";

type Props = {
  amount: number;
  onRevealed: (amount: number) => void;
};

export function ScratchCard({ amount, onRevealed }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);
  const notified = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#c8b6f5");
    grad.addColorStop(0.5, "#a5e3d3");
    grad.addColorStop(1, "#b8cdf7");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "600 14px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH ME", rect.width / 2, rect.height / 2 + 5);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 22, 0, Math.PI * 2);
    ctx.fill();

    const dpr = window.devicePixelRatio || 1;
    const data = ctx.getImageData(0, 0, rect.width * dpr, rect.height * dpr).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 40) {
      if (data[i] === 0) clear++;
    }
    if (clear / (data.length / 40) > 0.45 && !notified.current) {
      notified.current = true;
      setRevealed(true);
      onRevealed(amount);
    }
  };

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl clay">
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 clay-mint">
        <span className="font-display text-xs font-semibold uppercase tracking-widest text-white/80">You won</span>
        <span className="font-display text-3xl font-extrabold text-white drop-shadow-sm">
          ₹{amount.toFixed(2)}
        </span>
      </div>
      {!revealed && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full cursor-grab touch-none"
          onPointerDown={(e) => {
            drawing.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
          onPointerUp={() => (drawing.current = false)}
        />
      )}
      {revealed && (
        <div className="pointer-events-none absolute inset-0 animate-pop rounded-3xl ring-4 ring-white/60" />
      )}
    </div>
  );
}
