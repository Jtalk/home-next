import {StoryblokStory} from 'storyblok-generate-ts'

export interface AssetModel {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
}

export interface IntroHeroModel {
  intro?: string;
  title: string;
  subtitle?: string;
  background?: AssetModel;
  textColourScheme: "bright" | "dark";
  _uid: string;
  component: "intro-hero";
}

export interface PageModel {
  title: string;
  hero: IntroHeroModel[];
  _uid: string;
  component: "page";
  uuid?: string;
}
