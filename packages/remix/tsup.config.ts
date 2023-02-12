import type { Options } from "tsup";

const config: Options = {
  entry: ["src/index.ts"],
  format: "cjs",
  dts: true,
  sourcemap: true,
  skipNodeModulesBundle: true,
  external: ["node_modules"],
};

export default config;
