import * as esbuild from "esbuild";

const loggerPlugin = {
  name: "logger",
  setup(build) {
    build.onEnd((result) => {
      if (!!result.errors.length) {
        console.log(`Build ended with ${result.errors.length} errors`);
      } else {
        console.log(`Build ended successfully !`);
      }
    });
  },
};

const ctx = await esbuild.context({
  entryPoints: [`./src/index.jsx`],
  outfile: `./src/index.js`,
  bundle: true,
  jsx: "automatic",
  plugins: [loggerPlugin],
  sourcemap: true,
  loader: { ".js": "jsx" },
});

await ctx.watch();
console.log("Esbuild is watching for changes. Press Ctrl-C to stop.");
