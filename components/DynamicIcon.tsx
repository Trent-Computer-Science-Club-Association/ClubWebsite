import React, { useEffect, useState, useMemo } from 'react';
import * as IconsAi from 'react-icons/ai';
import * as IconsBs from 'react-icons/bs';
import * as IconsFa from 'react-icons/fa';
import * as IconsMd from 'react-icons/md';

type IconSet =
  | typeof IconsAi
  | typeof IconsBs
  | typeof IconsFa
  | typeof IconsMd;

const iconSets: Record<string, IconSet> = {
  Ai: IconsAi,
  Bs: IconsBs,
  Fa: IconsFa,
  Md: IconsMd,
};

interface DynamicIconProps {
  iconName?: string;
}

const DynamicIcon: React.FC<DynamicIconProps> = ({ iconName = 'FaCheck' }) => {
  const [Icon, setIcon] = useState<React.ComponentType | null>(null);

  const prefix = useMemo(() => iconName.slice(0, 2), [iconName]);
  const iconSet = useMemo(() => iconSets[prefix], [prefix]);

  useEffect(() => {
    if (iconSet && iconName in iconSet) {
      setIcon(() => iconSet[iconName as keyof IconSet]);
    } else {
      console.warn(`Icon ${iconName} not found`);
      setIcon(null);
    }
  }, [iconName, iconSet]);

  if (!Icon) return null;
  return <Icon />;
};

export default DynamicIcon;
