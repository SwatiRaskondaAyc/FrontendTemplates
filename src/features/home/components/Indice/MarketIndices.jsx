import { sampleIndices } from '../../data/homeData';

export default function MarketIndices() {
  return (
    <section className="mx-auto mt-4 grid max-w-7xl gap-3 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
      {sampleIndices.map((item) => (
        <article key={item.name} className="clay-card rounded-2xl p-4">
          <p className="text-xs text-slate-400">{item.name}</p>
          <p className="mt-2 text-xl font-semibold text-slate-100">{item.value}</p>
          <p className={`mt-1 text-sm ${item.change.startsWith('-') ? 'text-[#ecb761]' : 'text-[#cbd690]'}`}>
            {item.change}
          </p>
        </article>
      ))}
    </section>
  );
}


