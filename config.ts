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
import { fromZodError } from 'zod-validation-error';
// Import Config
import rawConfig from './config.yaml';
// General Types
export interface ImageDescription {
  src: string;
  alt: string;
}

interface MetaConfig {
  title: string;
  description: string;
}
const metaConfig = z.strictObject({
  title: z.string(),
  description: z.string(),
});
// Config Types
export interface SocialIcon {
  alt_text: string;
  link: string;
  path: string;
  text: string;
}
const socialIcon = z.strictObject({
  alt_text: z.string(),
  link: z.string(),
  path: z.string(),
  text: z.string(),
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
// Section
export enum SectionType {
  TextSection = 'TextSection',
  NewsSection = 'NewsSection',
  ContactSection = 'ContactSection',
  ListingSection = 'ListingSection',
}
interface SectionBase {
  // section_type: SectionType; -- We cannot have this here because of the whole filtering by sections stuff, but it is necessary on each type
  section_header?: string;
}
const sectionBase = z.strictObject({
  section_type: z.nativeEnum(SectionType),
  section_header: z.string().optional(),
});

export enum TextSectionButton {
  Default = 'Default',
  Sponsor = 'Sponsor',
}
const textSectionButton = z.nativeEnum(TextSectionButton);

export interface TextSection extends SectionBase {
  section_type: SectionType.TextSection;
  text: string;
  image: ImageDescription;
  button?: {
    style: TextSectionButton;
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
  button: z
    .strictObject({
      style: textSectionButton.optional().default(TextSectionButton.Default),
      text: z.string(),
      href: z.string(),
    })
    .optional(),
});

export interface NewsItem {
  text: string;
  date: Date;
  location?: string;
  href?: string;
}
const newsItem = z.strictObject({
  text: z.string(),
  date: z.date(),
  location: z.string().optional(),
  href: z.string().optional(),
});

export interface NewsSection extends SectionBase {
  section_type: SectionType.NewsSection;
  news_feed: NewsItem[];
}
const newsSection = sectionBase.extend({
  section_type: z.literal(SectionType.NewsSection),
  news_feed: z.array(newsItem),
});

export interface ContactSection extends SectionBase {
  section_type: SectionType.ContactSection;
  submission_url: string;
}
const contactSection = sectionBase.extend({
  section_type: z.literal(SectionType.ContactSection),
  submission_url: z.string(),
});

export enum ContactSubject {
  Applying = 'Applying',
  Sponsor = 'Sponsor',
  Volunteering = 'Volunteering',
  Development = 'Development',
  Creative = 'Creative',
  Managerial = 'Managerial',
  Outreach = 'Outreach',
}
export const contactSubject = z.nativeEnum(ContactSubject);

export enum RequirementIcon {
  CheckMark = 'CheckMark',
  React = 'React',
}
const requirementIcon = z.nativeEnum(RequirementIcon);
interface Requirement {
  description: string;
  icon: RequirementIcon;
}
const requirement = z.strictObject({
  description: z.string(),
  icon: requirementIcon.optional().default(RequirementIcon.CheckMark),
});

export interface Listing {
  priority: number;
  title: string;
  description: string;
  requirements: Requirement[];
  type: ContactSubject;
  modal?: string;
  keywords: string[];
}
const listing = z.strictObject({
  priority: z.number().default(Infinity),
  title: z.string(),
  description: z.string(),
  requirements: z.array(requirement).max(4),
  type: contactSubject,
  modal: z.string().optional(),
  keywords: z.array(z.string()),
});

export interface ListingSection extends SectionBase {
  section_type: SectionType.ListingSection;
  listings: Listing[];
}
const listingSection = sectionBase.extend({
  section_type: z.literal(SectionType.ListingSection),
  listings: z.array(listing),
});

// Top Level
export type Section =
  | TextSection
  | NewsSection
  | ContactSection
  | ListingSection;
const section = z.union([
  textSection,
  newsSection,
  contactSection,
  listingSection,
]);

interface WebsiteConfig {
  title: string;
  meta: MetaConfig;
  email: string;
  discord: string;
  instagram: string;
  linkedin: string;
  github: string;
  tagline: string;
  social_icons: SocialIcon[];
  banner_text?: string;
}
const websiteConfig = z.strictObject({
  title: z.string(),
  meta: metaConfig,
  email: z.string(),
  discord: z.string(),
  instagram: z.string(),
  linkedin: z.string(),
  github: z.string(),
  tagline: z.string(),
  social_icons: z.array(socialIcon),
  banner_text: z.optional(z.string()),
});
interface ComposablePage {
  sections: Section[];
}
const composablePage = z.strictObject({
  sections: z.array(section),
});

// config
interface ValidConfig {
  website_config: WebsiteConfig;
  page_list: PageItem[];
  footer_config: FooterConfig;
  // Page Configs
  home_page: ComposablePage;
  contact_page: ComposablePage;
}
const configValidator = z.strictObject({
  website_config: websiteConfig,
  page_list: z.array(pageItem),
  footer_config: footerConfig,
  home_page: composablePage,
  contact_page: composablePage,
});
// Config Section Spaced out for an easier error
// =========================================================================
function formatConfigError(error: z.ZodError) {
  const formattedError = fromZodError(error, {
    prefix: 'Configuration error',
    prefixSeparator: ': ',
  });

  return `${formattedError.message}\n\nPlease check your config.yaml file at the following location(s):
${error.errors.map((err) => `  - ${err.path.join('.')}`).join('\n')}`;
}

function validateConfig(rawConfig: unknown): ValidConfig {
  const result = configValidator.safeParse(rawConfig);

  if (!result.success) {
    const errorMessage = formatConfigError(result.error);
    throw new Error(errorMessage);
  }

  return result.data;
}

const validatedConfig: ValidConfig = validateConfig(rawConfig);

// =========================================================================

// ======== Preprocessing if needed ========
type Config = ValidConfig; // if you need todo preprocessing, replace this line with the commented out one below, replace home_page with whatever field you want to replace
// interface Config extends Omit<ValidConfig, 'home_page'> {}
const config: Config = validatedConfig; // if you need todo preprocessing, this is where

// Exports - to ensure our configuration is written well, we export each top level field directly
export const website_config = config.website_config;
export const footer_config = config.footer_config;
export const page_list = config.page_list;
export const home_page = config.home_page;
export const contact_page = config.contact_page;
