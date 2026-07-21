type ToneBadge = "succes" | "attente" | "erreur" | "neutre";

const stylesParTone: Record<ToneBadge, string> = {
  succes: "bg-mousse/15 text-mousse",
  attente: "bg-amber-100 text-amber-700",
  erreur: "bg-red-100 text-red-600",
  neutre: "bg-sable text-encre/70",
};

const correspondanceStatuts: Record<string, ToneBadge> = {
  actif: "succes",
  recu: "succes",
  resolu: "succes",
  disponible: "succes",
  en_attente: "attente",
  signale: "attente",
  ouvert: "attente",
  pris_en_charge: "attente",
  resilie: "erreur",
  en_cours: "attente",
};

const libellesStatuts: Record<string, string> = {
  actif: "Actif",
  en_attente: "En attente",
  resilie: "Résilié",
  recu: "Reçu",
  signale: "Signalé",
  pris_en_charge: "Pris en charge",
  resolu: "Résolu",
  ouvert: "Ouvert",
  en_cours: "En cours",
  disponible: "Disponible",
};

export default function BadgeStatut({ statut }: { statut: string }) {
  const tone = correspondanceStatuts[statut] ?? "neutre";
  const libelle = libellesStatuts[statut] ?? statut;

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${stylesParTone[tone]}`}
    >
      {libelle}
    </span>
  );
}