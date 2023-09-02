import { AssetModel } from "../model";

export const DefaultBlur = 10;
export type PreloadBlurOptions = {
  height: number;
  width: number;
  blur?: number;
};
export type AssetModelWithBlur = AssetModel & { blurDataURL: string };
export type WithPreloadBlur<T, Path extends keyof T & string> = Omit<
  T,
  Path
> & {
  [K in Path]?: AssetModelWithBlur;
};

/**
 * Load blurred version of a Storyblok asset as Data URL.
 *
 * Next.js can show a blurred low-res preview of an image while the actual one is
 * being loaded. This util enriches Storyblok's AssetModel with a blur URL.
 *
 * It has weird API for the sake of being easier to use from inside React components.
 * Since it's a server-side component, the function does all the heavy lifting and
 * leaves the client with a static image string upon build.
 *
 * @param target The object whose asset to enrich.
 * @param assetPath The name of the property that stores the asset to enrich.
 * @param options Customisation options.
 * @returns The {@link target} supplied with the asset at {@link assetPath} enriched with blurDataURL.
 */
export async function withPreloadedBlur<
  K extends string,
  T extends { [P in K]?: AssetModel }
>(
  target: T,
  assetPath: K,
  options: PreloadBlurOptions
): Promise<WithPreloadBlur<T, K>> {
  const asset: AssetModel | undefined = target[assetPath];
  if (!asset) {
    return {
      ...target,
      [assetPath]: undefined,
    };
  }
  const blurDataURL = await preloadBlur(asset.filename, options);
  return {
    ...target,
    [assetPath]: {
      ...asset,
      blurDataURL,
    },
  };
}

async function preloadBlur(
  storyblokUrl: string,
  options: PreloadBlurOptions
): Promise<string> {
  const blur = options.blur || DefaultBlur;
  const blurredUrl = `${storyblokUrl}/m/${options.width}x${options.height}/filters:blur(${blur})`;

  try {
    const result = await fetch(blurredUrl);
    if (!result.ok) {
      throw Error("Blurred URL prefetch failed with code " + result.status);
    }

    const buffer = Buffer.from(await result.arrayBuffer());
    const b64Content = buffer.toString("base64");

    // Data URLs should be fine with compound content types.
    const contentType = result.headers.get("content-type");
    if (!contentType) {
      throw Error(
        "Could not determine content type while preloading " + blurredUrl
      );
    }
    return `data:${contentType};base64,${b64Content}`;
  } catch (e) {
    console.error(`Error per-downloading blurred image for ${storyblokUrl}`, e);
    throw Error("Error per-downloading blurred image");
  }
}
