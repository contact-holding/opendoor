import MenuLateral from "@/components/partages/menu-lateral";

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-encre/[0.02]">
      <MenuLateral espace="admin" />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}