import { NextRequest, NextResponse } from "next/server";
import { creerClientServeur } from "@/lib/supabase/serveur";

export async function POST(requete: NextRequest) {
  const supabase = await creerClientServeur();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ erreur: "Non autorisé" }, { status: 401 });
  }

  const corps = await requete.json();

  const { data, error } = await supabase
    .from("incidents")
    .insert({ ...corps, locataire_id: user.id, statut: "signale" })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ erreur: error.message }, { status: 400 });
  }

  return NextResponse.json({ incident: data }, { status: 201 });
}

export async function PATCH(requete: NextRequest) {
  const supabase = await creerClientServeur();
  const { id, ...champsAMettreAJour } = await requete.json();

  const { data, error } = await supabase
    .from("incidents")
    .update(champsAMettreAJour)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ erreur: error.message }, { status: 400 });
  }

  return NextResponse.json({ incident: data });
}