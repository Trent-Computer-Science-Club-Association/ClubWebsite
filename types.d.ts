interface PageInfo {
  pageName: string;
  pageLink: string;
  pageTitle: string;
  displayInNav: boolean;
}
// Yaml Config
// TODO: Make this only match the config.yaml file
declare module '*.yaml' {
  // Config
  export const pageInfo: PageInfo[];
}