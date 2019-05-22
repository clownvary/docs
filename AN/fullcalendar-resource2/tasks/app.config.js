"use strict";

import path from "path";

export const host = "localhost";
export const port = 5000;

export const outputDir = {
  "static": path.resolve("dist"),
  "dev": path.resolve("dist"),
  "prod": path.resolve("lib")
};
