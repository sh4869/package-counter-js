import { PackageLockFile, PackageLockDeps } from "./package-lock";

export const getListOfPackages = (lock: PackageLockFile): Array<string> => {
  let array = new Array<string>();
  calcListOfPackages(lock.dependencies, array);
  return array;
};

const calcListOfPackages = (
  deps: PackageLockDeps,
  array: Array<string>
): void => {
  for (const i of Object.values(deps)) {
    const name = i[0] + "@" + i[1].version;
    array.push(name);
    if (i.dependencies) calcListOfPackages(i.dependencies, array);
  }
};

export const getSetOfPackages = (lock: PackageLockFile): Set<string> => {
  let set = new Set<string>();
  calcSetOfPackages(lock.dependencies, set);
  return set;
};

const calcSetOfPackages = (deps: PackageLockDeps, set: Set<string>) => {
  for (const i of Object.entries(deps)) {
    const name = i[0] + "@" + i[1].version;
    set.add(name);
    if (i[1].dependencies) calcSetOfPackages(i[1].dependencies, set);
  }
};
