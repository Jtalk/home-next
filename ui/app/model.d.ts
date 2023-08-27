export interface AssetModel {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}

export interface IntroHeroModel {
  title: string;
  subtitle?: string;
  background?: AssetModel;
  _uid: string;
  component: "intro-hero";
  [k: string]: any;
}

export interface PageModel {
  title: string;
  hero: IntroHeroModel[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}
