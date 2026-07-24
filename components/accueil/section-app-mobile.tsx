export default function SectionAppMobile() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="relative overflow-hidden rounded-3xl bg-argile px-8 py-10 text-fond md:px-14">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">
              Téléchargez l&apos;appli Open Doors
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-fond/85">
              <li className="flex items-center gap-2">
                <span>✓</span> Recevez une alerte dès qu&apos;un logement correspond à vos critères
              </li>
              <li className="flex items-center gap-2">
                <span>✓</span> Profitez d&apos;offres exclusives sur l&apos;appli
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-fond/10 text-center text-[10px] text-fond/60">
                QR code
                <br />
                bientôt
              </div>
              <div className="text-sm">
                <p className="font-display text-xl">Bientôt</p>
                <p className="text-fond/70">disponible</p>
              </div>
              <span className="rounded-full border border-fond/30 px-4 py-2 text-xs">
                Google Play
              </span>
              <span className="rounded-full border border-fond/30 px-4 py-2 text-xs">
                App Store
              </span>
            </div>
          </div>

          <div className="relative mx-auto hidden h-52 w-32 shrink-0 rounded-2xl border-4 border-fond/20 bg-encre/40 md:block">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-mousse px-3 py-1 text-[10px] font-medium text-fond">
              Bientôt
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}