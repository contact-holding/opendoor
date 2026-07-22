import Link from "next/link";
import { Key } from "lucide-react";

export default function LayoutAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sable/30 px-6">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2 font-display text-xl">
          <Key className="h-5 w-5 text-argile" strokeWidth={1.75} />
          Opendoor
        </Link>
        <div className="rounded-2xl border border-ligne bg-fond p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}