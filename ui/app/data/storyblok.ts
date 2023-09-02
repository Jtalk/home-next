import StoryblokClient from "storyblok-js-client";
import { Dev } from "../shared/dev";

const storyblok = new StoryblokClient({
  accessToken: Dev.storyblok.previewToken,
});

export async function fetchContent<T>(path: string): Promise<T> {
  try {
    const story = await storyblok.getStory(path, {
      version: Dev.storyblok.version,
    });
    return story.data.story.content as T;
  } catch (e) {
    console.error("Error fetching content at ", path, e);
    if (e instanceof Error) {
      throw Error(e.message);
    } else {
      throw Error("Unknown error");
    }
  }
}
