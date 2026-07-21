-- ============================================
-- 1. TABLE PROFILS (complète auth.users)
-- ============================================
create table public.profils (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('locataire', 'proprietaire', 'admin')),
  nom text not null,
  prenom text not null,
  telephone text,
  avatar_url text,
  ville text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- déclencheur : crée automatiquement un profil à chaque inscription
create function public.gerer_nouvel_utilisateur()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profils (id, role, nom, prenom)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'role', 'locataire'),
    coalesce(new.raw_user_meta_data->>'nom', ''),
    coalesce(new.raw_user_meta_data->>'prenom', '')
  );
  return new;
end;
$$;

create trigger declencheur_nouvel_utilisateur
  after insert on auth.users
  for each row execute procedure public.gerer_nouvel_utilisateur();


-- ============================================
-- 2. TABLE LOGEMENTS
-- ============================================
create table public.logements (
  id uuid primary key default gen_random_uuid(),
  proprietaire_id uuid not null references public.profils(id) on delete cascade,
  titre text not null,
  description text not null default '',
  type text not null check (type in ('appartement', 'studio', 'maison', 'chambre')),
  ville text not null,
  quartier text not null,
  adresse text,
  latitude numeric(9,6),
  longitude numeric(9,6),
  prix_mensuel integer not null check (prix_mensuel > 0),
  nombre_pieces integer not null check (nombre_pieces > 0),
  surface numeric(6,2) not null check (surface > 0),
  disponible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- 3. TABLE PHOTOS DES LOGEMENTS
-- ============================================
create table public.photos_logements (
  id uuid primary key default gen_random_uuid(),
  logement_id uuid not null references public.logements(id) on delete cascade,
  url text not null,
  ordre integer not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================
-- 4. TABLE EQUIPEMENTS DES LOGEMENTS
-- ============================================
create table public.equipements_logements (
  id uuid primary key default gen_random_uuid(),
  logement_id uuid not null references public.logements(id) on delete cascade,
  nom text not null
);

-- ============================================
-- 5. TABLE CONTRATS
-- ============================================
create table public.contrats (
  id uuid primary key default gen_random_uuid(),
  logement_id uuid not null references public.logements(id) on delete cascade,
  locataire_id uuid not null references public.profils(id) on delete cascade,
  proprietaire_id uuid not null references public.profils(id) on delete cascade,
  date_debut date not null,
  date_fin date,
  montant_loyer integer not null check (montant_loyer > 0),
  statut text not null default 'en_attente' check (statut in ('en_attente', 'actif', 'resilie')),
  signe_par_locataire boolean not null default false,
  signe_par_proprietaire boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- 6. TABLE ETATS DES LIEUX
-- ============================================
create table public.etats_des_lieux (
  id uuid primary key default gen_random_uuid(),
  contrat_id uuid not null references public.contrats(id) on delete cascade,
  type text not null check (type in ('entree', 'sortie')),
  description text not null default '',
  date_realisation date not null default current_date,
  created_at timestamptz not null default now()
);

-- ============================================
-- 7. TABLE HISTORIQUE DES LOYERS (suivi manuel)
-- ============================================
create table public.historique_loyers (
  id uuid primary key default gen_random_uuid(),
  contrat_id uuid not null references public.contrats(id) on delete cascade,
  mois_concerne date not null,
  montant integer not null check (montant > 0),
  statut text not null default 'en_attente' check (statut in ('en_attente', 'recu')),
  enregistre_par uuid references public.profils(id),
  created_at timestamptz not null default now()
);

-- ============================================
-- 8. TABLE INCIDENTS
-- ============================================
create table public.incidents (
  id uuid primary key default gen_random_uuid(),
  logement_id uuid not null references public.logements(id) on delete cascade,
  locataire_id uuid not null references public.profils(id) on delete cascade,
  titre text not null,
  description text not null,
  urgence text not null default 'normale' check (urgence in ('faible', 'normale', 'urgente')),
  statut text not null default 'signale' check (statut in ('signale', 'pris_en_charge', 'resolu')),
  photo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- 9. TABLE LITIGES
-- ============================================
create table public.litiges (
  id uuid primary key default gen_random_uuid(),
  contrat_id uuid not null references public.contrats(id) on delete cascade,
  ouvert_par uuid not null references public.profils(id),
  type text not null,
  description text not null,
  statut text not null default 'ouvert' check (statut in ('ouvert', 'en_cours', 'resolu')),
  created_at timestamptz not null default now(),
  resolu_le timestamptz
);

-- ============================================
-- 10. TABLE MESSAGES
-- ============================================
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  logement_id uuid references public.logements(id) on delete cascade,
  expediteur_id uuid not null references public.profils(id) on delete cascade,
  destinataire_id uuid not null references public.profils(id) on delete cascade,
  contenu text not null,
  lu boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================
-- 11. TABLE FAVORIS
-- ============================================
create table public.favoris (
  id uuid primary key default gen_random_uuid(),
  utilisateur_id uuid not null references public.profils(id) on delete cascade,
  logement_id uuid not null references public.logements(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (utilisateur_id, logement_id)
);

-- ============================================
-- 12. TABLE NOTIFICATIONS
-- ============================================
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  utilisateur_id uuid not null references public.profils(id) on delete cascade,
  titre text not null,
  message text not null,
  lien text,
  lu boolean not null default false,
  created_at timestamptz not null default now()
);





-- Active la sécurité sur toutes les tables
alter table public.profils enable row level security;
alter table public.logements enable row level security;
alter table public.photos_logements enable row level security;
alter table public.equipements_logements enable row level security;
alter table public.contrats enable row level security;
alter table public.etats_des_lieux enable row level security;
alter table public.historique_loyers enable row level security;
alter table public.incidents enable row level security;
alter table public.litiges enable row level security;
alter table public.messages enable row level security;
alter table public.favoris enable row level security;
alter table public.notifications enable row level security;

-- LOGEMENTS : visibles par tout le monde (même non connecté)
create policy "logements_lecture_publique" on public.logements
  for select using (true);

-- LOGEMENTS : un propriétaire ne modifie que ses propres biens
create policy "logements_modification_proprietaire" on public.logements
  for all using (auth.uid() = proprietaire_id);

-- PHOTOS / EQUIPEMENTS : lecture publique
create policy "photos_lecture_publique" on public.photos_logements
  for select using (true);

create policy "equipements_lecture_publique" on public.equipements_logements
  for select using (true);

-- PROFILS : chacun voit et modifie uniquement son propre profil
create policy "profils_lecture_personnelle" on public.profils
  for select using (auth.uid() = id);

create policy "profils_modification_personnelle" on public.profils
  for update using (auth.uid() = id);

-- CONTRATS : visibles uniquement par le locataire ou le propriétaire concerné
create policy "contrats_acces_concernes" on public.contrats
  for all using (auth.uid() = locataire_id or auth.uid() = proprietaire_id);

-- INCIDENTS : visibles par le locataire qui l'a créé
create policy "incidents_acces_locataire" on public.incidents
  for all using (auth.uid() = locataire_id);

-- FAVORIS / NOTIFICATIONS / MESSAGES : chacun voit uniquement les siens
create policy "favoris_acces_personnel" on public.favoris
  for all using (auth.uid() = utilisateur_id);

create policy "notifications_acces_personnel" on public.notifications
  for all using (auth.uid() = utilisateur_id);

create policy "messages_acces_concernes" on public.messages
  for all using (auth.uid() = expediteur_id or auth.uid() = destinataire_id);





  -- Tout le monde peut VOIR les photos (lecture publique)
create policy "photos_logements_lecture_publique"
on storage.objects for select
using (bucket_id = 'photos-logements');

-- Seuls les utilisateurs connectés peuvent AJOUTER des photos
create policy "photos_logements_ajout_connecte"
on storage.objects for insert
to authenticated
with check (bucket_id = 'photos-logements');

-- Un propriétaire ne peut supprimer QUE les photos qu'il a lui-même envoyées
create policy "photos_logements_suppression_proprietaire"
on storage.objects for delete
to authenticated
using (bucket_id = 'photos-logements' and owner = auth.uid());