/**
 * Global website utilities.
 * @module Utils
 * This file is used for managing all of our global utility functions,
 * having all these in a single file can get messy if not done properly so we have a small list of rules here.
 * Any code placed in this file needs to be small pieces of code designed todo something general,
 * code in this file should not be massive, if you want to implement a system like authentication do it elsewhere.
 * Every function in this file must be documented using jsdoc to maintain the code integrity of this file,
 * remember to design your functions with tree-shaking in mind as this file is used throughout the app.
 */
// Imports
import moment from 'moment';
import { Anonymous_Pro, Open_Sans } from 'next/font/google';
import { Orbitron, Poppins } from 'next/font/google';

// Fonts - A collection of fonts used throughout the website
// Anonymous_Pro
const Font_Anonymous_Pro = Anonymous_Pro({
  weight: '400',
  subsets: ['latin'],
});
// Open Sans
const Font_Open_Sans = Open_Sans({
  subsets: ['latin'],
});

// Hackathon Fonts
const Font_Orbitron = Orbitron({ subsets: ['latin'], weight: '600' });
const Font_Poppins = Poppins({ subsets: ['latin'], weight: '400' });

/**
 * A collection of fonts used throughout the website.
 */
export const Fonts = {
  // Anonymous_Pro
  Anonymous_Pro: Font_Anonymous_Pro.className,
  // Open_Sans
  Open_Sans: Font_Open_Sans.className,

  // Hackathon Fonts

  // Font_Orbitron
  Orbitron: Font_Orbitron.className,
  // Font_Poppins
  Poppins: Font_Poppins.className,
};

// Date Formatting
/**
 * The formatting style to apply to your date.
 */
export enum DateFormat {
  /**
   * The standard date format: Month Day, Year
   */
  Standard,
  /**
   * The HTML date format: Year-Month-Day
   *
   * This is used when setting the datetime property of on time elements
   */
  HTMlDateTime,
}

/**
 * A standardized utility for formatting dates.
 *
 * @param date The date to format as a javascript date object
 * @param format The formatting style you want this defaults to `DateFormat.Standard`
 * @returns The formatted date as a string
 */
export const formatDate = (
  date: Date,
  format = DateFormat.Standard
): string => {
  switch (format) {
    case DateFormat.Standard:
      return moment(date).format('MMMM Do, YYYY');
    case DateFormat.HTMlDateTime:
      return moment(date).format('YYYY-MM-DD');
  }
};

// SectionStyling
/**
 * The type of style to apply.
 */
export enum SectionStyle {
  Primary,
  Secondary,
}
/**
 * The styling information for a section.
 */
interface SectionStyling {
  foregroundColor: string;
  backgroundColor: string;
}
/**
 * A global helper for getting the style information within sections.
 * @param style: The style of the section
 * @returns {Object} The style information for the section
 */
export const getSectionStyling = (style: SectionStyle): SectionStyling => {
  // Note: These classes are in ./styles/globals.scss
  switch (style) {
    case SectionStyle.Primary:
      return {
        foregroundColor: 'primaryForeground',
        backgroundColor: 'primaryBackground',
      };
    case SectionStyle.Secondary:
      return {
        foregroundColor: 'secondaryForeground',
        backgroundColor: 'secondaryBackground',
      };
  }
};
