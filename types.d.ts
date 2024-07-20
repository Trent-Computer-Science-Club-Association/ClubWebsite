interface PageInfo {
  pageName: string;
  pageLink: string;
  pageTitle: string;
  displayInNav: boolean;
}

interface BannerInfo {
  title: string;
}

interface HeroIcons {
  altText: string;
  link: string;
  path: string;
}
// Yaml Config
// TODO: Make this only match the config.yaml file
declare module '*.yaml' {
  // Config
  export const pageInfo: PageInfo[];
  export const bannerInfo: BannerInfo;
  export const heroIcons: HeroIcons[];
}
