import { Wifi, Zap, Car, ShieldCheck, Droplet, Flame, Package, Coffee } from "lucide-react";

const equipementsBase = [
  { icone: Zap, label: "Électricité stabilisée" },
  { icone: Droplet, label: "Eau courante" },
  { icone: Wifi, label: "Connexion Wi-Fi disponible" },
  { icone: Car, label: "Parking sécurisé" },
  { icone: ShieldCheck, label: "Gardiennage 24h/24" },
];

const servicesMarketing = [
  { icone: Flame, titre: "Livraison de gaz", texte: "Commandez une bouteille de gaz, livrée directement chez vous." },
  { icone: Package, titre: "Réception de colis", texte: "Un service de réception et garde de vos colis en votre absence." },
  { icone: Coffee, titre: "Petit-déjeuner sur demande", texte: "Faites-vous livrer un petit-déjeuner local dès le matin." },
];

export default function SectionEquipements() {
  return (
    <div>
      <h2 className="mb-3 font-display text-lg">Équipements</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {equipementsBase.map(({ icone: Icone, label }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-ligne p-3 text-sm">
            <Icone className="h-4 w-4 text-argile" /> {label}
          </div>
        ))}
      </div>

      <h3 className="mb-3 mt-8 font-display text-lg">Services additionnels</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {servicesMarketing.map(({ icone: Icone, titre, texte }) => (
          <div key={titre} className="rounded-xl border border-ligne p-4">
            <Icone className="h-5 w-5 text-argile" />
            <p className="mt-2 text-sm font-medium">{titre}</p>
            <p className="mt-1 text-xs text-encre/60">{texte}</p>
          </div>
        ))}
      </div>
    </div>
  );
}