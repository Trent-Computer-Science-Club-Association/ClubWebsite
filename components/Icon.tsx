/**
 * @module Icon: A dynamic icon component.
 */
import React from 'react';
// Icon Imports - Icons at https://react-icons.github.io/react-icons/search
import { MdOutlinePeopleOutline } from 'react-icons/md';
import {
  FaAward,
  FaRegLightbulb,
  FaHourglassStart,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';
import { LuChevronsLeftRight } from 'react-icons/lu';
import { FiTarget } from 'react-icons/fi';

// Icon Types
export enum IconType {
  // General
  People = 'People',
  Award = 'Award',
  LightBulb = 'LightBulb',
  Development = 'Development',
  Target = 'Target',
  HourGlass = 'HourGlass',
  // Social
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  Twitter = 'Twitter',
  Linkedin = 'linkedin',
}

export const Icon = ({ iconType }: { iconType: IconType }): JSX.Element => {
  switch (iconType) {
    // General
    case IconType.People:
      return <MdOutlinePeopleOutline />;
    case IconType.Award:
      return <FaAward />;
    case IconType.LightBulb:
      return <FaRegLightbulb />;
    case IconType.Development:
      return <LuChevronsLeftRight />;
    case IconType.Target:
      return <FiTarget />;
    case IconType.HourGlass:
      return <FaHourglassStart />;
    // Social
    case IconType.Facebook:
      return <FaFacebook />;
    case IconType.Instagram:
      return <FaInstagram />;
    case IconType.Twitter:
      return <FaTwitter />;
    case IconType.Linkedin:
      return <FaLinkedin />;
  }
};

export default Icon;
