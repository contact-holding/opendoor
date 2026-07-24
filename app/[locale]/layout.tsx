import Header from "@/components/partages/header";
import Footer from "@/components/partages/footer";
import BulleWhatsapp from "@/components/partages/bulle-whatsapp";
import ModalBienvenue from "@/components/partages/modal-bienvenue";
import BandeauCookies from "@/components/partages/bandeau-cookies";

export default function LayoutPublic({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <BulleWhatsapp />
      <ModalBienvenue />
      <BandeauCookies />
    </>
  );
}