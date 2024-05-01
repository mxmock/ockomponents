import * as esbuild from "esbuild";
import { writeFile } from "node:fs/promises";
import components from "./src/components.js";
import reactPlugin from "esbuild-plugin-static-react";

const SRC = `src`;
const JS_OUT_DIR = "js";
const BUILD = `${SRC}/build`;
const TIME_LOG = `Successfully built in`;

const build = async () => {
  const result = await esbuild.build({
    entryPoints: [`${SRC}/index.jsx`],
    outfile: `${BUILD}/${JS_OUT_DIR}/index.js`,
    bundle: true,
    jsx: "automatic",
    loader: { ".js": "jsx" },
    minify: true,
    plugins: [
      reactPlugin({
        components,
        srcDir: SRC,
        outDir: BUILD,
        pagesDir: `pages`,
        assetsDir: `assets`,
        jsOutDir: JS_OUT_DIR,
        css: { dir: "styles", name: "index.scss" },
      }),
    ],
    legalComments: "none",
    metafile: true,
    pure: ["console"],
    entryNames: "[name]_[hash]",
  });
  await writeFile(`${BUILD}/meta.json`, JSON.stringify(result.metafile));
};

console.time(TIME_LOG);
build()
  .then(async () => {
    console.timeEnd(TIME_LOG);
  })
  .catch((err) => {
    console.error("Something goes wrong:", err.message);
  });
