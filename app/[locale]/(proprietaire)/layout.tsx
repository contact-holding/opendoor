import MenuLateral from "@/components/partages/menu-lateral";

export default function LayoutProprietaire({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <MenuLateral espace="proprietaire" />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}