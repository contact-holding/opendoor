"use client";

import { useState } from "react";
import Image from "next/image";

export default function GaleriePhotos({ photos, titre }: { photos: string[]; titre: string }) {
  const [photoActive, setPhotoActive] = useState(0);
  const images = photos.length > 0 ? photos : ["/images/placeholders/logement-defaut.jpg"];

  return (
    <div>
      <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-sable md:h-[420px]">
        <Image src={images[photoActive]} alt={titre} fill className="object-cover" />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((photo, index) => (
            <button
              key={photo + index}
              onClick={() => setPhotoActive(index)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
                photoActive === index ? "border-argile" : "border-transparent"
              }`}
            >
              <Image src={photo} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}