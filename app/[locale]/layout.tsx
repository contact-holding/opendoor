import Header from "@/components/partages/header";
import Footer from "@/components/partages/footer";
import BulleWhatsapp from "@/components/partages/bulle-whatsapp";

export default function LayoutPublic({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <BulleWhatsapp />
    </>
  );
}