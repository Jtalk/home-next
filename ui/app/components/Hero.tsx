"use client";

import { styled } from "@mui/material";
import { IntroHeroModel } from "../model";

// CSS - Content interop
const cssStyleBright = "hero-text-bright" as const;
const cssStyleDark = "hero-text-dark" as const;
type CssStyles = typeof cssStyleBright | typeof cssStyleDark;

const contentToCssStyle: Record<IntroHeroModel["textColourScheme"], CssStyles> =
  {
    bright: "hero-text-bright",
    dark: "hero-text-dark",
  };

// CSS Components
const HeroContainer = styled("section")`
  background-color: #fafafa;
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextContainer = styled("label")`
  display: flex;
  flex-direction: column;
  align-items: center;

  &.${cssStyleBright} {
    color: white;
  }
  &.${cssStyleDark} {
    color: black;
  }
`;
const Title = styled("h1")`
  margin: 0px;

  &::before,
  &::after {
    content: "";
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.8em;
    width: 3em;
    height: 2px;

    .${cssStyleBright} & {
      background-color: white;
    }
    .${cssStyleDark} & {
      background-color: black;
    }
  }
`;
const Subtitle = styled("h3")`
  font-size: 0.8em;
  font-weight: normal;
  font-style: italic;
  margin: 0px;
`;

export type HeroProps = {
  content: IntroHeroModel;
};

export default function Hero(props: HeroProps) {
  const textColourClass = contentToCssStyle[props.content.textColourScheme];

  return (
    <HeroContainer>
      <TextContainer className={textColourClass}>
        <Subtitle>{props.content.intro}</Subtitle>
        <Title>{props.content.title}</Title>
        <Subtitle>{props.content.subtitle}</Subtitle>
      </TextContainer>
    </HeroContainer>
  );
}
