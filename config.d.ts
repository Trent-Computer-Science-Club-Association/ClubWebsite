declare module '*.yaml' {
  interface PageInfo {
    pageName: string;
    pageLink: string;
    displayInNav: boolean;
  }

  interface BannerInfo {
    text: string;
    hidden?: boolean;
  }

  interface HeroIcon {
    altText: string;
    link: string;
    path: string;
  }

  interface AboutUs {
    text: string;
    image: string;
    altText: string;
  }

  interface Config {
    pageInfo: PageInfo[];
    bannerInfo: BannerInfo;
    heroIcons: HeroIcon[];
    aboutUs: AboutUs;
  }

  const value: Config;
  export = value;
}
