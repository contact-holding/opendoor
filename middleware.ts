import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const languesSupportees = ["fr", "en"];
const langueParDefaut = "fr";

export async function middleware(requete: NextRequest) {
  const chemin = requete.nextUrl.pathname;

  const langueDejaPresente = languesSupportees.some(
    (langue) => chemin.startsWith(`/${langue}/`) || chemin === `/${langue}`
  );

  if (!langueDejaPresente) {
    const nouvelleUrl = new URL(`/${langueParDefaut}${chemin}`, requete.url);
    return NextResponse.redirect(nouvelleUrl);
  }

  let reponse = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return requete.cookies.getAll();
        },
        setAll(cookiesAEnregistrer) {
          cookiesAEnregistrer.forEach(({ name, value }) =>
            requete.cookies.set(name, value)
          );
          reponse = NextResponse.next({ request: requete });
          cookiesAEnregistrer.forEach(({ name, value, options }) =>
            reponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const espacesProteges = ["/locataire", "/proprietaire", "/admin"];
  const cheminSansLangue = "/" + chemin.split("/").slice(2).join("/");
  const estEspaceProtege = espacesProteges.some((espace) =>
    cheminSansLangue.startsWith(espace)
  );

  if (estEspaceProtege && !user) {
    const urlConnexion = new URL(`/${langueParDefaut}/connexion`, requete.url);
    return NextResponse.redirect(urlConnexion);
  }

  return reponse;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|images|.*\\..*).*)"],
};