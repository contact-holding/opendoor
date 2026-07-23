"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChampTexte from "@/components/ui/champ-texte";
import Select from "@/components/ui/select";
import Bouton from "@/components/ui/bouton";
import { creerClientNavigateur } from "@/lib/supabase/client";
import { geocoderAdresse } from "@/lib/geocodage";
import type { TypeLogement } from "@/types";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";

const typesLogement = [
  { valeur: "appartement", label: "Appartement" },
  { valeur: "studio", label: "Studio" },
  { valeur: "maison", label: "Maison" },
  { valeur: "chambre", label: "Chambre" },
];

const optionsPieces = [
  { valeur: "general", label: "Générale" },
  { valeur: "salon", label: "Salon" },
  { valeur: "chambre", label: "Chambre" },
  { valeur: "cuisine", label: "Cuisine" },
  { valeur: "salle_de_bain", label: "Salle de bain" },
  { valeur: "exterieur", label: "Extérieur" },
];

interface PhotoAvecPiece {
  fichier: File;
  piece: string;
}

export default function FormulaireLogement() {
  const router = useRouter();
  const [enregistrement, setEnregistrement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [photos, setPhotos] = useState<PhotoAvecPiece[]>([]);

  const [champs, setChamps] = useState({
    titre: "",
    description: "",
    type: "appartement" as TypeLogement,
    ville: "",
    quartier: "",
    prix_mensuel: "",
    nombre_pieces: "",
    surface: "",
    whatsapp: "",
    video_url: "",
  });

  function gererChangement(nom: string, valeur: string) {
    setChamps((precedent) => ({ ...precedent, [nom]: valeur }));
  }

  function gererAjoutPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const nouvelles = Array.from(e.target.files).map((fichier) => ({
      fichier,
      piece: "general",
    }));
    setPhotos((precedent) => [...precedent, ...nouvelles]);
  }

  function changerPiece(index: number, piece: string) {
    setPhotos((precedent) =>
      precedent.map((p, i) => (i === index ? { ...p, piece } : p))
    );
  }

  function retirerPhoto(index: number) {
    setPhotos((precedent) => precedent.filter((_, i) => i !== index));
  }

  async function gererEnvoi(e: React.FormEvent) {
    e.preventDefault();
    setErreur(null);
    setEnregistrement(true);

    const supabase = creerClientNavigateur();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setErreur("Vous devez être connecté pour publier un bien.");
      setEnregistrement(false);
      return;
    }

    const coordonnees = await geocoderAdresse(champs.quartier, champs.ville);

    const { data: logement, error: erreurLogement } = await supabase
      .from("logements")
      .insert({
        proprietaire_id: user.id,
        titre: champs.titre,
        description: champs.description,
        type: champs.type,
        ville: champs.ville,
        quartier: champs.quartier,
        prix_mensuel: Number(champs.prix_mensuel),
        nombre_pieces: Number(champs.nombre_pieces),
        surface: Number(champs.surface),
        latitude: coordonnees?.latitude ?? null,
        longitude: coordonnees?.longitude ?? null,
        whatsapp: champs.whatsapp || null,
        video_url: champs.video_url || null,
      })
      .select()
      .single();

    if (erreurLogement || !logement) {
      setErreur(erreurLogement?.message ?? "Une erreur est survenue.");
      setEnregistrement(false);
      return;
    }

    for (let i = 0; i < photos.length; i++) {
      const { fichier, piece } = photos[i];
      const cheminFichier =
        logement.id + "/photo-" + (i + 1) + "-" + Date.now() + "." + fichier.name.split(".").pop();

      const { error: erreurUpload } = await supabase.storage
        .from("photos-logements")
        .upload(cheminFichier, fichier);

      if (!erreurUpload) {
        const { data: urlPublique } = supabase.storage
          .from("photos-logements")
          .getPublicUrl(cheminFichier);

        await supabase.from("photos_logements").insert({
          logement_id: logement.id,
          url: urlPublique.publicUrl,
          ordre: i,
          piece,
        });
      }
    }

    setEnregistrement(false);
    router.push("/proprietaire/mes-biens/" + logement.id);
  }

  return (
    <form onSubmit={gererEnvoi} className="space-y-6">
      <ChampTexte
        label="Titre de l'annonce"
        value={champs.titre}
        onChange={(e) => gererChangement("titre", e.target.value)}
        placeholder="Ex : Appartement lumineux, proche centre-ville"
        required
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium">Description</label>
        <textarea
          value={champs.description}
          onChange={(e) => gererChangement("description", e.target.value)}
          rows={4}
          required
          className="w-full rounded-lg border border-ligne px-4 py-2.5 text-sm outline-none focus:border-argile"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Type de bien"
          value={champs.type}
          onChange={(e) => gererChangement("type", e.target.value)}
          options={typesLogement}
        />
        <ChampTexte
          label="Ville"
          value={champs.ville}
          onChange={(e) => gererChangement("ville", e.target.value)}
          placeholder="Douala, Kribi, Edéa…"
          required
        />
        <ChampTexte
          label="Quartier"
          value={champs.quartier}
          onChange={(e) => gererChangement("quartier", e.target.value)}
          required
        />
        <ChampTexte
          label="Prix mensuel (FCFA)"
          type="number"
          value={champs.prix_mensuel}
          onChange={(e) => gererChangement("prix_mensuel", e.target.value)}
          required
        />
        <ChampTexte
          label="Nombre de pièces"
          type="number"
          value={champs.nombre_pieces}
          onChange={(e) => gererChangement("nombre_pieces", e.target.value)}
          required
        />
        <ChampTexte
          label="Surface (m²)"
          type="number"
          value={champs.surface}
          onChange={(e) => gererChangement("surface", e.target.value)}
          required
        />
        <ChampTexte
          label="Numéro WhatsApp (avec indicatif, ex: 237600000000)"
          value={champs.whatsapp}
          onChange={(e) => gererChangement("whatsapp", e.target.value)}
        />
        <ChampTexte
          label="Lien vidéo / visite 360° (optionnel)"
          value={champs.video_url}
          onChange={(e) => gererChangement("video_url", e.target.value)}
          placeholder="Lien YouTube ou autre plateforme d'hébergement"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Photos</label>
        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-ligne py-8 text-sm text-encre/50 hover:border-argile">
          <UploadCloud className="h-6 w-6" />
          Cliquez pour ajouter des photos
          <input type="file" accept="image/*" multiple hidden onChange={gererAjoutPhotos} />
        </label>

        {photos.length > 0 && (
          <div className="mt-4 space-y-3">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg border border-ligne p-2"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={URL.createObjectURL(photo.fichier)}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <select
                  value={photo.piece}
                  onChange={(e) => changerPiece(index, e.target.value)}
                  className="flex-1 rounded-lg border border-ligne px-3 py-2 text-sm outline-none focus:border-argile"
                >
                  {optionsPieces.map((option) => (
                    <option key={option.valeur} value={option.valeur}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => retirerPhoto(index)}
                  className="shrink-0 rounded-full bg-encre/10 p-1.5 hover:bg-encre/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {erreur && <p className="text-sm text-red-500">{erreur}</p>}

      <Bouton variante="principal" type="submit" disabled={enregistrement} className="w-full">
        {enregistrement ? "Publication en cours…" : "Publier le logement"}
      </Bouton>
    </form>
  );
}