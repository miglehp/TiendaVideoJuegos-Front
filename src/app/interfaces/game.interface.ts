export interface Game {
  id: number;
  steam_app_id: number;
  name: string;
  detailed_description: string | null;
  about_the_game: string | null;
  short_description: string | null;
  header_image: string | null;
  capsule_image: string | null;
  capsule_imagev5: string | null;
  website: string | null;
  pc_requirements_minimum: string | null;
  pc_requirements_recomended: string | null;
  mac_requirements: string | null;
  linux_requirements: string | null;
  developers: string | null;
  publishers: string | null;
  price: number;
  release_date: string | null;
  support_info_url: string | null;
  suport_info_email: string | null;
  fatal: string | null;
}
