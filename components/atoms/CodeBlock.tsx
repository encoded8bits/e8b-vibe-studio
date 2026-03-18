import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

/**
 * A Code Block Atom ⚛️
 * Designed for e8b-vibe-studio with a focus on readability.
 */
export const CodeBlock = ({ code, language = 'typescript' }: CodeBlockProps) => {
  return (
    <div className="rounded-xl overflow-hidden border border-brand-gold/10 shadow-2xl">
      <div className="bg-brand-darker px-4 py-2 border-b border-brand-gold/10 flex justify-between items-center">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
        </div>
        <span className="text-[10px] text-brand-gold/30 uppercase tracking-widest font-mono">
          {language}
        </span>
      </div>
      <SyntaxHighlighter 
        language={language} 
        style={coldarkDark}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          fontSize: '0.875rem',
          backgroundColor: '#002b2a', // Deep branding background
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};