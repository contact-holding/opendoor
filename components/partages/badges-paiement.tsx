export default function BadgesPaiement() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs uppercase tracking-wide text-fond/50">
        Paiement mobile accepté
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="flex items-center gap-3 rounded-2xl bg-fond/10 px-6 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFCB05] text-xs font-black text-encre">
            MTN
          </span>
          <span className="text-sm font-medium text-fond">Mobile Money</span>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-fond/10 px-6 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6600] text-xs font-black text-fond">
            OM
          </span>
          <span className="text-sm font-medium text-fond">Orange Money</span>
        </div>
      </div>
    </div>
  );
}