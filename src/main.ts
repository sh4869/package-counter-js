import * as lockfile from "@yarnpkg/lockfile";
import { readFileSync } from "fs";
import { argv } from "process";
import { PackageLockFile } from "./package-lock";
import * as npm from "./npm_counter";
import * as yarn from "./yarn_counter";

if (argv.length < 3) {
  console.error("specify path to package-lock.json or yarn.lock");
  process.exit(0);
}

const path = argv[2];
const file = readFileSync(path).toString();

if (path.endsWith("yarn.lock")) {
  const lock = lockfile.parse(file);
  const count = yarn.getSetOfPackages(lock.object as lockfile.LockFileObject);
  console.log(`no duplicated: ${count.size}`);
} else if (path.endsWith("package-lock.json")) {
  const lockfile = JSON.parse(file) as PackageLockFile;
  const allcount = npm.getListOfPackages(lockfile);
  const nodulpcatedCount = npm.getSetOfPackages(lockfile);
  console.log(
    `all: ${allcount.length}, no duplicated: ${nodulpcatedCount.size}`
  );
}
