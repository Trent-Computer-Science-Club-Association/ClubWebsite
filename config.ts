// What is this file?
// Perhaps you had a weird error while editing the config sending you here
// if that was the case you probably messed up your config, this file makes sure the config is properly written

// if you are a developer and plan on editing this file, do so carefully
// this file is the single source of truth for our configs and types

// A note about zod, we could just define the types with zod but we define them twice
// we then check the configuration against our typescript types, this makes it easier to
// ensure our typescript values are what we want, additionally this allows for strict checks with looser parent types

// An additional note, do not use `z.object` instead use `z.strictObject` or else we are not fully validating the values


import z from 'zod';
// Import Config
import rawConfig from './config.yaml';
// General Types
export interface ImageDescription {
  src: string;
  alt: string;
}
// Section
export enum SectionType {
  TextSection = 'TextSection',
  LatestNews = 'NewsSection',
}
interface SectionBase {
  // section_type: SectionType; -- We cannot have this here because of the whole filtering by sections stuff, but it is necessary on each type
  section_header: string;
}
const sectionBase = z.strictObject({
  section_type: z.nativeEnum(SectionType),
  section_header: z.string()
});
// Config Types
interface SocialIcon {
  alt_text: string;
  link: string;
  path: string;
}
const socialIcon = z.strictObject({
  alt_text: z.string(),
  link: z.string(),
  path: z.string()
});
interface WebsiteConfig {
  title: string;
  email: string;
  discord: string;
  tagline: string;
  social_icons: SocialIcon[];
  banner_text?: string;
}
const websiteConfig = z.strictObject({
  title: z.string(),
  email: z.string(),
  discord: z.string(),
  tagline: z.string(),
  social_icons: z.array(socialIcon),
  banner_text: z.optional(z.string()),
});
interface PageItem {
  page_name: string;
  page_link: string;
  display_in_navbar: boolean;
}
const pageItem = z.strictObject({
  page_name: z.string(),
  page_link: z.string(),
  display_in_navbar: z.boolean(),
});
interface FooterConfig {
  text: string;
}
const footerConfig = z.strictObject({
  text: z.string(),
});
// homepage sections
export interface TextSection extends SectionBase {
  section_type: SectionType.TextSection;
  text: string;
  image: ImageDescription;
  button?: {
    text: string;
    href: string;
  };
}
const textSection = sectionBase.extend({
  section_type: z.literal(SectionType.TextSection),
  text: z.string(),
  image: z.strictObject({
    src: z.string(),
    alt: z.string(),
  }),
  button: z.strictObject({
    text: z.string(),
    href: z.string(),
  }).optional(),
});
export interface NewsSection extends SectionBase {
  section_type: SectionType.LatestNews;
  news_feed: {
    text: string;
    date: Date;
    href: string;
  }[];
}
const newsSection = sectionBase.extend({
  section_type: z.literal(SectionType.LatestNews),
  news_feed: z.array(z.strictObject({
    text: z.string(),
    date: z.date(),
    href: z.string(),
  })),
});
type HomeSection = TextSection | NewsSection;
const homeSection = z.union( [textSection, newsSection]);
interface HomePage {
  sections: HomeSection[];
}
const homePage = z.strictObject({
  sections: z.array(homeSection),
});
// config
export type Section = HomeSection;
interface Config {
  website_config: WebsiteConfig;
  page_list: PageItem[];
  footer_config: FooterConfig;
  // Page Configs
  home_page: HomePage;
}
const configValidator = z.strictObject({
  website_config: websiteConfig,
  page_list: z.array(pageItem),
  footer_config: footerConfig,
  home_page: homePage,
});
// Config Section Spaced out for an easier error
// =========================================================================
// The real error is in config.yaml, you messed up the configuration file
const config: Config = configValidator.parse(rawConfig);
// =========================================================================




// Exports - to ensure our configuration is written well, we export each top level field directly
export const website_config = config.website_config;
export const footer_config = config.footer_config;
export const page_list = config.page_list;
export const home_page = config.home_page;