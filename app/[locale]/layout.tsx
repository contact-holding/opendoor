import Header from "@/components/partages/header";
import Footer from "@/components/partages/footer";

export default function LayoutPublic({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}