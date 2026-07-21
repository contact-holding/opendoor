"use client";

import { useRef, useState } from "react";
import Bouton from "@/components/ui/bouton";
import { RotateCcw, Check } from "lucide-react";

export default function ZoneSignature({
  onSigner,
}: {
  onSigner: (signatureDataUrl: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enTrainDeSigner, setEnTrainDeSigner] = useState(false);
  const [aSigne, setASigne] = useState(false);

  function demarrerTrait(e: React.MouseEvent<HTMLCanvasElement>) {
    setEnTrainDeSigner(true);
    const ctx = canvasRef.current?.getContext("2d");
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!ctx || !rect) return;
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }

  function tracer(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!enTrainDeSigner) return;
    const ctx = canvasRef.current?.getContext("2d");
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!ctx || !rect) return;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#22333B";
    ctx.lineWidth = 2;
    ctx.stroke();
    setASigne(true);
  }

  function effacer() {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setASigne(false);
  }

  function valider() {
    if (!canvasRef.current) return;
    onSigner(canvasRef.current.toDataURL());
  }

  return (
    <div>
      <p className="mb-2 text-sm font-medium">Signez ici</p>
      <canvas
        ref={canvasRef}
        width={400}
        height={150}
        onMouseDown={demarrerTrait}
        onMouseMove={tracer}
        onMouseUp={() => setEnTrainDeSigner(false)}
        onMouseLeave={() => setEnTrainDeSigner(false)}
        className="w-full cursor-crosshair rounded-xl border border-ligne bg-fond"
      />
      <div className="mt-3 flex gap-3">
        <Bouton variante="fantome" type="button" onClick={effacer}>
          <RotateCcw className="h-4 w-4" /> Effacer
        </Bouton>
        <Bouton variante="principal" type="button" onClick={valider} disabled={!aSigne}>
          <Check className="h-4 w-4" /> Valider la signature
        </Bouton>
      </div>
    </div>
  );
}