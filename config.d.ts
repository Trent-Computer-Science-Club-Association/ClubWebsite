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

  interface HomeSection {
    title: string;
    text: string;
    image: string;
    imageAlt: string;
    buttonText?: string;
    buttonRoute?: string;
  }

  interface ContactUs {
    text: string;
  }

  interface Config {
    pageInfo: PageInfo[];
    bannerInfo: BannerInfo;
    heroIcons: HeroIcon[];
    homeSections: HomeSection[];
    email: string;
    contactUs: ContactUs;
  }

  const value: Config;
  export = value;
}
