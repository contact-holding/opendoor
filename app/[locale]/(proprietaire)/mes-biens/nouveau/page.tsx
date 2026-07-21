import FormulaireLogement from "@/components/logements/formulaire-logement";

export default function PageNouveauBien() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 font-display text-2xl">Publier un nouveau bien</h1>
      <FormulaireLogement />
    </div>
  );
}
