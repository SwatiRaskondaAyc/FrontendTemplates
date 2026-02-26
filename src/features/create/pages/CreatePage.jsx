import { WandSparkles } from 'lucide-react';
import ContentIllustration from '../../../components/illustrations/ContentIllustration';

const illustrationCards = [
  {
    id: 'strategy',
    title: 'Strategy Blueprint',
    description: 'Visual blocks for planning objectives, entries, exits, and rebalance cadence.',
    type: 'strategy'
  },
  {
    id: 'portfolio',
    title: 'Portfolio Mix',
    description: 'Allocation illustration that explains how your capital is distributed across sleeves.',
    type: 'portfolio'
  },
  {
    id: 'risk',
    title: 'Risk Signals',
    description: 'Warning-style visual language for drawdown, exposure, and volatility checks.',
    type: 'risk'
  }
];

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] px-4 py-8 text-[var(--text-primary)] sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <header className="rounded-3xl border border-white/10 bg-[var(--surface-card)] p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-[#8b86be]/20 p-3 text-[#8b86be]">
              <WandSparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Create Illustrations</h1>
              <p className="mt-2 max-w-3xl text-sm text-[var(--text-secondary)]">
                Additional illustration sets are available here and mapped to your product content blocks.
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {illustrationCards.map((card) => (
            <article
              key={card.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-[var(--surface-card)] p-5 shadow-[var(--shadow-soft)]"
            >
              <div className="rounded-2xl bg-white/10 p-3">
                <ContentIllustration type={card.type} />
              </div>
              <h2 className="mt-4 text-lg font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{card.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
