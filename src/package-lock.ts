export interface PackageLockFile {
  name: string;
  version: string;
  dependencies?: PackageLockDeps;
  lockfileVersion: number;
}

export interface PackageLockDeps {
  [depNam: string]: PackageLockDep;
}

export interface PackageLockDep {
  version: string;
  resolved: string;
  integrity: string;
  requires?: {
    [depName: string]: string;
  };
  dependencies?: PackageLockDeps;
}
