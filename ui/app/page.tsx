import Container from "@mui/material/Container";
import type { PageModel } from "./model";
import { fetchStory } from "./data/storyblok";
import { Metadata } from "next";

export default async function Home() {
  const content = await fetchContent();

  return (
    <Container>
      <main>Hello</main>
    </Container>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchContent();
  return {
    title: content.title,
  };
}

async function fetchContent(): Promise<PageModel> {
  const data = await fetchStory("/cdn/stories/home");
  return { _uid: "mock", title: "My Website!", hero: [], component: "page" };
}
