export default function SectionAppMobile() {
  return (
    <section className="bg-sable/50">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-12">
        <div>
          <p className="font-donnees text-xs uppercase tracking-[0.2em] text-argile">
            Bientôt disponible
          </p>
          <h2 className="mt-2 font-display text-2xl">Open Doors, dans votre poche</h2>
          <p className="mt-2 max-w-md text-sm text-encre/60">
            L&apos;application mobile Open Doors arrive prochainement sur App
            Store et Google Play, pour rechercher et gérer vos logements où
            que vous soyez.
          </p>
        </div>

        <div className="flex gap-3">
          <span className="flex items-center gap-2 rounded-xl border border-ligne bg-fond px-5 py-3 text-sm text-encre/60">
            App Store
          </span>
          <span className="flex items-center gap-2 rounded-xl border border-ligne bg-fond px-5 py-3 text-sm text-encre/60">
            Google Play
          </span>
        </div>
      </div>
    </section>
  );
}