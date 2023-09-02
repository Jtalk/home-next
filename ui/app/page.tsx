import Container from "@mui/material/Container";
import type { PageModel } from "./model";
import { fetchContent } from "./data/storyblok";
import { Metadata } from "next";
import Hero from "./components/Hero";

export default async function Home() {
  const content = await fetchPageContent();

  return (
    <main>
      <Hero content={content.hero[0]} />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const content = await fetchPageContent();
  return {
    title: content.title,
  };
}

async function fetchPageContent(): Promise<PageModel> {
  return await fetchContent<PageModel>("/home");
}
