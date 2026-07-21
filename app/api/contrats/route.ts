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
    .from("contrats")
    .insert({ ...corps, proprietaire_id: user.id })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ erreur: error.message }, { status: 400 });
  }

  return NextResponse.json({ contrat: data }, { status: 201 });
}

export async function GET(requete: NextRequest) {
  const supabase = await creerClientServeur();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ erreur: "Non autorisé" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("contrats")
    .select("*, logement:logements(*)")
    .or(`locataire_id.eq.${user.id},proprietaire_id.eq.${user.id}`);

  if (error) {
    return NextResponse.json({ erreur: error.message }, { status: 400 });
  }

  return NextResponse.json({ contrats: data });
}