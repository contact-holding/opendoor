import SectionHero from "@/components/accueil/section-hero";
import ParcourirParVille from "@/components/accueil/parcourir-par-ville";
import LogementsEnVedette from "@/components/accueil/logements-en-vedette";
import SectionAvantages from "@/components/accueil/section-avantages";

export default function PageAccueil() {
  return (
    <>
      <SectionHero />
      <ParcourirParVille />
      <LogementsEnVedette />
      <SectionAvantages />
    </>
  );
}