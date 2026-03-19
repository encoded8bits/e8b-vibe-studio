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
        {/* Usamos surface-secondary para el fondo del icono y border-subtle */}
        <div className="inline-flex p-3 rounded-xl bg-surface-secondary border border-border-subtle text-accent group-hover:scale-110 transition-transform duration-500">
          <Icon size={24} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          {tag && <Text variant="label">{tag}</Text>}
          <Text variant="h3" className="group-hover:text-accent transition-colors duration-300">
            {title}
          </Text>
          {/* Eliminamos el group-hover:text-text-dim porque ya es el default */}
          <Text variant="body">
            {description}
          </Text>
        </div>
      </div>
    </CardPrimitive>
  );
};