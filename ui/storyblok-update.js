#!/usr/bin/env node

const axios = require("axios");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const fs = require("fs/promises");

const ExitCodeNoToken = 1;
const ExitCodeFetchError = 2;

const TokenEnvVar = "STORYBLOK_ACCESS_TOKEN";

async function main() {
  const argv = yargs(hideBin(process.argv))
    .option("space", {
      alias: "s",
      demandOption: true,
      type: "number",
    })
    .option("output", { alias: "o", type: "string" })
    .option("dir", { type: "string" }).argv;

  const token = process.env[TokenEnvVar];
  if (!token) {
    console.error(
      `A Storyblok token must be set in the environment: ${TokenEnvVar}`
    );
    process.exit(ExitCodeNoToken);
  }

  const components = await fetchComponents(argv.space, { token });
  await fs.writeFile(
    argv.output || `${argv.dir || "storyblok"}/components.${argv.space}.json`,
    JSON.stringify(components, null, 2)
  );
}

main().catch((err) => {
  console.error("Unexpected error:", err.message, err.toJson?.());
  process.exit(ExitCodeFetchError);
});

/**
 * @return Promise<axios.AxiosResponse>
 */
async function fetchComponents(space, { token }) {
  return await axios
    .get(`https://mapi.storyblok.com/v1/spaces/${space}/components/`, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      responseType: "json",
      maxRedirects: 5,
    })
    .then((resp) => {
      if (resp.status !== 200) {
        throw new axios.AxiosError(
          "A non-200 code when downloading Storyblok components",
          `${resp.status}`,
          undefined,
          undefined,
          resp
        );
      }
      return resp.data;
    });
}
