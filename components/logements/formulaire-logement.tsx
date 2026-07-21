"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ChampTexte from "@/components/ui/champ-texte";
import Select from "@/components/ui/select";
import Bouton from "@/components/ui/bouton";
import { creerClientNavigateur } from "@/lib/supabase/client";
import type { TypeLogement } from "@/types";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";

const typesLogement = [
  { valeur: "appartement", label: "Appartement" },
  { valeur: "studio", label: "Studio" },
  { valeur: "maison", label: "Maison" },
  { valeur: "chambre", label: "Chambre" },
];

export default function FormulaireLogement({ logementId }: { logementId?: string }) {
  const router = useRouter();
  const [enregistrement, setEnregistrement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [photosSelectionnees, setPhotosSelectionnees] = useState<File[]>([]);

  const [champs, setChamps] = useState({
    titre: "",
    description: "",
    type: "appartement" as TypeLogement,
    ville: "",
    quartier: "",
    prix_mensuel: "",
    nombre_pieces: "",
    surface: "",
  });

  function gererChangement(nom: string, valeur: string) {
    setChamps((precedent) => ({ ...precedent, [nom]: valeur }));
  }

  function gererAjoutPhotos(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setPhotosSelectionnees((precedent) => [...precedent, ...Array.from(e.target.files!)]);
  }

  function retirerPhoto(index: number) {
    setPhotosSelectionnees((precedent) => precedent.filter((_, i) => i !== index));
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

    // 1. création du logement
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
      })
      .select()
      .single();

    if (erreurLogement || !logement) {
      setErreur(erreurLogement?.message ?? "Une erreur est survenue.");
      setEnregistrement(false);
      return;
    }

    // 2. envoi des photos dans Supabase Storage
    for (let i = 0; i < photosSelectionnees.length; i++) {
      const fichier = photosSelectionnees[i];
      const cheminFichier = `${logement.id}/photo-${i + 1}-${Date.now()}.${fichier.name.split(".").pop()}`;

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
        });
      }
    }

    setEnregistrement(false);
    router.push(`/proprietaire/mes-biens/${logement.id}`);
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
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">Photos</label>
        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-ligne py-8 text-sm text-encre/50 hover:border-argile">
          <UploadCloud className="h-6 w-6" />
          Cliquez pour ajouter des photos
          <input type="file" accept="image/*" multiple hidden onChange={gererAjoutPhotos} />
        </label>

        {photosSelectionnees.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {photosSelectionnees.map((fichier, index) => (
              <div key={index} className="relative h-20 w-20 overflow-hidden rounded-lg">
                <Image
                  src={URL.createObjectURL(fichier)}
                  alt=""
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => retirerPhoto(index)}
                  className="absolute right-1 top-1 rounded-full bg-encre/70 p-0.5"
                >
                  <X className="h-3 w-3 text-fond" />
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