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

  interface Footer {
    text: string;
  }

  interface NewsItem {
    text: string;
    date: Date;
    href: string;
  }

  const HomeSectionTypes = {
    TextSection = 'TextSection',
    LatestNews = 'LatestNews',
  };

  type HomeSectionType =
    (typeof HomeSectionTypes)[keyof typeof HomeSectionTypes];

  interface HomePageSection {
    type: HomeSectionType;
    header: string;
  }

  interface TextSection extends HomePageSection {
    type: HomeSectionType.TextSection;
    text: string;
    image: string;
    imageAlt: string;
    buttonText?: string;
    buttonRoute?: string;
  }

  interface LatestNews extends HomePageSection {
    type: HomeSectionType.LatestNews;
    newsFeed: NewsItem[];
  }

  type TextSectionType = (typeof TextSection)[keyof typeof TextSection];
  type LatestNewsType = (typeof LatestNews)[keyof typeof LatestNews];
  type HomeSection = TextSectionType | LatestNewsType;

  interface Config {
    pageInfo: PageInfo[];
    bannerInfo: BannerInfo;
    heroIcons: HeroIcon[];
    homeSections: HomeSection[];
    email: string;
    tagline: string;
    footer: Footer;
    HomeSection: HomeSection;
  }

  const value: Config;
  export = value;
}
