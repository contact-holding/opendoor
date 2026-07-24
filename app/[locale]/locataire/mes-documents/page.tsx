import { creerClientServeur } from "@/lib/supabase/serveur";
import EtatVide from "@/components/partages/etat-vide";
import { FileText, Download } from "lucide-react";

export default async function PageMesDocuments() {
  const supabase = await creerClientServeur();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: etatsDesLieux } = await supabase
    .from("etats_des_lieux")
    .select("*, contrat:contrats!inner(locataire_id)")
    .eq("contrat.locataire_id", user?.id);

  return (
    <div>
      <h1 className="font-display text-2xl">Mes documents</h1>

      {!etatsDesLieux || etatsDesLieux.length === 0 ? (
        <div className="mt-6">
          <EtatVide
            titre="Aucun document disponible"
            message="Vos états des lieux et documents de bail apparaîtront ici."
          />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {etatsDesLieux.map((document) => (
            <div key={document.id} className="flex items-center justify-between rounded-xl border border-ligne p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-argile" />
                <span className="text-sm">État des lieux — {document.type}</span>
              </div>
              <Download className="h-4 w-4 text-encre/50" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}