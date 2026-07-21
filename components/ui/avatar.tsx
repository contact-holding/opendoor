import Image from "next/image";

export default function Avatar({
  url,
  nom,
  taille = 40,
}: {
  url?: string | null;
  nom: string;
  taille?: number;
}) {
  const initiale = nom.charAt(0).toUpperCase();

  if (!url) {
    return (
      <div
        style={{ width: taille, height: taille }}
        className="flex items-center justify-center rounded-full bg-argile font-display text-fond"
      >
        {initiale}
      </div>
    );
  }

  return (
    <div
      style={{ width: taille, height: taille }}
      className="relative overflow-hidden rounded-full"
    >
      <Image src={url} alt={nom} fill className="object-cover" />
    </div>
  );
}