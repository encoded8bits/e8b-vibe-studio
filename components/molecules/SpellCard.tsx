import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Text } from '../atoms/Text';
import { CardPrimitive } from '../atoms/CardPrimitive';

interface SpellCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  tag?: string;
}

export const SpellCard = ({ title, description, icon: Icon, tag }: SpellCardProps) => {
  return (
    <CardPrimitive>
      <div className="space-y-4 text-left">
        {/* Icon Wrapper Atom Pattern */}
        <div className="inline-flex p-3 rounded-xl bg-brand-jungle border border-brand-gold/20 text-accent group-hover:scale-110 transition-transform duration-500">
          <Icon size={24} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          {tag && <Text variant="label">{tag}</Text>}
          <Text variant="h3" className="group-hover:text-accent transition-colors duration-300">
            {title}
          </Text>
          <Text variant="body" className="group-hover:text-text-dim transition-colors duration-300">
            {description}
          </Text>
        </div>
      </div>
    </CardPrimitive>
  );
};