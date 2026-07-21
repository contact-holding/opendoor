export function formaterPrix(montant: number): string {
  return new Intl.NumberFormat("fr-FR").format(montant) + " FCFA";
}

export function formaterDate(date: string | Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function tronquerTexte(texte: string, longueur: number): string {
  return texte.length > longueur ? texte.slice(0, longueur) + "…" : texte;
}