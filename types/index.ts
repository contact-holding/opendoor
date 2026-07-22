export type Role = "locataire" | "proprietaire" | "admin";
export type TypeLogement = "appartement" | "studio" | "maison" | "chambre";
export type StatutContrat = "en_attente" | "actif" | "resilie";
export type StatutIncident = "signale" | "pris_en_charge" | "resolu";
export type StatutLitige = "ouvert" | "en_cours" | "resolu";
export type StatutLoyer = "en_attente" | "recu";
export type Urgence = "faible" | "normale" | "urgente";

export interface Profil {
  id: string;
  role: Role;
  nom: string;
  prenom: string;
  telephone: string | null;
  avatar_url: string | null;
  ville: string | null;
  created_at: string;
}

export interface Logement {
  id: string;
  proprietaire_id: string;
  titre: string;
  description: string;
  type: TypeLogement;
  ville: string;
  quartier: string;
  adresse: string | null;
  latitude: number | null;
  longitude: number | null;
  prix_mensuel: number;
  nombre_pieces: number;
  surface: number;
  disponible: boolean;
  created_at: string;
  photos?: PhotoLogement[];
  equipements?: EquipementLogement[];
}

export interface PhotoLogement {
  id: string;
  logement_id: string;
  url: string;
  ordre: number;
}

export interface EquipementLogement {
  id: string;
  logement_id: string;
  nom: string;
}

export interface Contrat {
  id: string;
  logement_id: string;
  locataire_id: string;
  proprietaire_id: string;
  date_debut: string;
  date_fin: string | null;
  montant_loyer: number;
  statut: StatutContrat;
  signe_par_locataire: boolean;
  signe_par_proprietaire: boolean;
  created_at: string;
  logement?: Logement;
}

export interface EtatDesLieux {
  id: string;
  contrat_id: string;
  type: "entree" | "sortie";
  description: string;
  date_realisation: string;
}

export interface HistoriqueLoyer {
  id: string;
  contrat_id: string;
  mois_concerne: string;
  montant: number;
  statut: StatutLoyer;
  enregistre_par: string | null;
}

export interface Incident {
  id: string;
  logement_id: string;
  locataire_id: string;
  titre: string;
  description: string;
  urgence: Urgence;
  statut: StatutIncident;
  photo_url: string | null;
  created_at: string;
  logement?: Logement;
}

export interface Litige {
  id: string;
  contrat_id: string;
  ouvert_par: string;
  type: string;
  description: string;
  statut: StatutLitige;
  created_at: string;
  resolu_le: string | null;
}

export interface MessageDirect {
  id: string;
  logement_id: string | null;
  expediteur_id: string;
  destinataire_id: string;
  contenu: string;
  lu: boolean;
  created_at: string;
}

export interface NotificationUtilisateur {
  id: string;
  utilisateur_id: string;
  titre: string;
  message: string;
  lien: string | null;
  lu: boolean;
  created_at: string;
}

export interface Avis {
  id: string;
  auteur_id: string;
  note: number;
  commentaire: string;
  role_auteur: "locataire" | "proprietaire";
  approuve: boolean;
  created_at: string;
  profil?: Profil;
}

export interface PointInteret {
  id: string;
  nom: string;
  categorie: "universite" | "marche" | "hopital" | "gare_routiere" | "autre";
  ville: string;
  latitude: number;
  longitude: number;
}