import { sampleSectorStrip } from '../../data/homeData';

export default function SectorStrip() {
  return (
    <section className="mx-auto mt-4 max-w-7xl px-4 sm:px-6">
      <div className="clay-card flex gap-3 overflow-x-auto rounded-2xl p-3">
        {sampleSectorStrip.map((item) => (
          <div key={item.name} className="min-w-[120px] rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <p className="text-xs text-slate-400">{item.name}</p>
            <p className={`text-sm font-semibold ${item.move.startsWith('-') ? 'text-[#ecb761]' : 'text-[#cbd690]'}`}>
              {item.move}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}


