import { CodeBlock } from '../atoms/CodeBlock';
import { Wand2 } from 'lucide-react';

const exampleCode = `// The Magia Digital Approach 🪄
export const useVibeCheck = (context: string) => {
  const [vibe, setVibe] = useState<"clean" | "magic">("clean");

  useEffect(() => {
    if (context.includes("e8b")) {
      setVibe("magic");
    }
  }, [context]);

  return vibe;
};`;

export const CodeExperiment = () => {
  return (
    <section className="w-full max-w-5xl py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-medium uppercase tracking-tighter">
          <Wand2 size={14} />
          Active Experiment
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">
          Sophisticated <span className="text-brand-gold italic font-serif">Logic</span>
        </h2>
        <p className="text-brand-gold/70 leading-relaxed text-lg font-light">
          Architecture isn't just about looks; it's about the precision of the underlying state. 
          In this lab, we test how **React 19 Hooks** interact with **Next.js 16 Server Actions**.
        </p>
      </div>
      
      <div className="relative">
        {/* Decorative feather floating behind the code ✨ */}
        <div className="absolute -top-12 -right-8 opacity-20 rotate-45 blur-sm">
          <span className="text-8xl">🪶</span>
        </div>
        <CodeBlock code={exampleCode} />
      </div>
    </section>
  );
};