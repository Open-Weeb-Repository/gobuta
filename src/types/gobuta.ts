export interface IProviderInfo {
  name: string;
  language: string;
  homepage: string;
}

export interface ITask {
  projectListUrl: string;
  parseProjectListScript: string;
  parseProjectDetailScript: string;
  providerInfo: IProviderInfo;
}
