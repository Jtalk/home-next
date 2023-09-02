import type { PageModel } from "./model";
import { fetchContent } from "./data/storyblok";
import { Metadata } from "next";
import Hero from "./components/Hero";
import { withPreloadedBlur } from "./data/image";

export default async function Home() {
  const content = await fetchPageContent();
  const heroContent = await withPreloadedBlur(content.hero[0], "background", {
    width: 600,
    height: 300,
  });

  return (
    <main>
      <Hero content={heroContent} />
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
