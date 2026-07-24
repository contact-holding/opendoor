import Link from "next/link";

export default function LayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sable/30 px-6">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex justify-center">
          <img
            src="/images/accueil/icone-opendoor.png"
            alt="Open Doors"
            className="h-16 w-auto"
          />
        </Link>
        <div className="rounded-2xl border border-ligne bg-fond p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}