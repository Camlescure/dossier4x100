"use client";

import { useEffect, useState } from "react";
import { finalPhotoSource, fragmentPhotoPositions, photoBackgroundPosition } from "@/lib/finalFragments.mjs";
import { assetPath } from "@/lib/assetPath";

export function PhotoFragment({ fragmentId, variant = "card", className = "" }: { fragmentId: number; variant?: "card" | "reveal" | "assembly"; className?: string }) {
  const [available, setAvailable] = useState<boolean | null>(null), [photoRatio, setPhotoRatio] = useState(4 / 3);
  const position = fragmentPhotoPositions[fragmentId as keyof typeof fragmentPhotoPositions];
  const resolvedPhotoSource = assetPath(finalPhotoSource);
  useEffect(() => { const image = new window.Image(); image.onload = () => { setPhotoRatio(image.naturalWidth / image.naturalHeight); setAvailable(true); }; image.onerror = () => setAvailable(false); image.src = resolvedPhotoSource; }, [resolvedPhotoSource]);
  const photoStyle = available === false ? undefined : { backgroundImage: `url(${resolvedPhotoSource})`, backgroundSize: "300% 200%", backgroundPosition: photoBackgroundPosition(fragmentId), ...(variant === "assembly" ? {} : { aspectRatio: `${photoRatio * 2} / 3` }) };
  return <div className={`photo-fragment ${position.shape} ${variant} ${className} ${available === false ? "photo-unavailable" : ""}`} role="img" aria-label={`Fragment ${String(fragmentId).padStart(2, "0")} de la photo finale`} style={photoStyle}>{available === false && <span>PHOTO FINALE</span>}</div>;
}
