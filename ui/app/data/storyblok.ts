import StoryblokClient from "storyblok-js-client";
import { Dev } from "../shared/dev";

const storyblok = new StoryblokClient({
  accessToken: Dev.storyblok.previewToken,
});

export async function fetchStory(path: string) {
  try {
    await storyblok.getStory(path, {});
  } catch (e) {
    // Ignoring it for now, Storyblok hasn't been set up yet
  }
  return {};
}
