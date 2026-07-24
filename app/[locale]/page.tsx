import SectionHero from "@/components/accueil/section-hero";
import ParcourirParVille from "@/components/accueil/parcourir-par-ville";
import LogementsEnVedette from "@/components/accueil/logements-en-vedette";
import AvisClients from "@/components/accueil/avis-clients";
import SectionAvantages from "@/components/accueil/section-avantages";
import SectionAppMobile from "@/components/accueil/section-app-mobile";

export default function PageAccueil() {
  return (
    <>
      <SectionHero />
      <ParcourirParVille />
      <LogementsEnVedette />
      <AvisClients />
      <SectionAvantages />
      <SectionAppMobile />
    </>
  );
}