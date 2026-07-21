import SectionHero from "@/components/accueil/section-hero";
import LogementsEnVedette from "@/components/accueil/logements-en-vedette";
import SectionAvantages from "@/components/accueil/section-avantages";

export default function PageAccueil() {
  return (
    <>
      <SectionHero />
      <LogementsEnVedette />
      <SectionAvantages />
    </>
  );
}