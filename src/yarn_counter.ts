import * as lockfile from "@yarnpkg/lockfile";

export const getSetOfPackages = (
  lockfile: lockfile.LockFileObject
): Set<string> => {
  let set = new Set<string>();
  for (const i of Object.entries(lockfile)) {
    const name =
      i[0][0] === "@" ? "@" + i[0].substr(1).split("@")[0] : i[0].split("@")[0];
    const version = i[1].version;
    set.add(name + "@" + version);
  }
  return set;
};
