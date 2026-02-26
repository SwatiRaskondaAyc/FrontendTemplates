import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarDays, FileSpreadsheet, PlayCircle, Users } from 'lucide-react';
import {
  sampleEquityHubData,
  sampleFinancialSheets,
  sampleWebinars
} from '../data/homeData';
import Button from '../../../components/ui/Button';

const MotionArticle = motion.article;
const MotionDiv = motion.div;
const MotionTr = motion.tr;

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
};

export default function HomeExploreSections() {
  return (
    <section className="mx-auto mt-6 w-full max-w-7xl space-y-6 px-2 sm:px-3" aria-label="CMDA explore sections">
      <MotionArticle
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="clay-elevated rounded-3xl p-5 sm:p-6"
      >
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">Explore</p>
            <h2 className="text-2xl font-semibold text-slate-100">EquityHub</h2>
          </div>
          <Button type="button">
            Open EquityHub
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </header>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {sampleEquityHubData.map((item, index) => (
            <MotionDiv
              key={item.symbol}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: Math.min(index * 0.06, 0.2), duration: 0.32 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-sm font-semibold text-slate-100">{item.symbol}</p>
              <p className="text-xs text-slate-400">{item.company}</p>
              <p className="mt-3 text-xs text-slate-300">{item.sector}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full bg-[#d1de74]/50 px-2.5 py-1 text-[11px] text-[#272625]">{item.signal}</span>
                <span className="text-xl text-[#a1c14b]">{item.confidence}</span>
              </div>
            </MotionDiv>
          ))}
        </div>
      </MotionArticle>

      <MotionArticle
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="clay-elevated rounded-3xl p-5 sm:p-6"
      >
        <header className="mb-4 flex items-center gap-2">
          <div className="rounded-xl bg-[#e0912f]/20 p-2 text-[#e0912f]">
            <FileSpreadsheet className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">Data Room</p>
            <h2 className="text-2xl font-semibold text-slate-100">Financial Sheets</h2>
          </div>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="text-xs uppercase text-slate-400">
              <tr className="border-b border-white/10">
                <th className="pb-3 pr-4">Sheet</th>
                <th className="pb-3 pr-4">Updated</th>
                <th className="pb-3 pr-4">Owner</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleFinancialSheets.map((row, index) => (
                <MotionTr
                  key={row.sheet}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: Math.min(index * 0.04, 0.18), duration: 0.28 }}
                  className="border-b border-white/5 text-slate-200 hover:bg-white/5"
                >
                  <td className="py-3 pr-4">{row.sheet}</td>
                  <td className="py-3 pr-4">{row.updated}</td>
                  <td className="py-3 pr-4">{row.owner}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] ${
                        row.status === 'Synced'
                          ? 'bg-[#d1de74]/50 text-[#272625]'
                          : 'bg-[#e0912f]/50 text-[#272625]'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </MotionTr>
              ))}
            </tbody>
          </table>
        </div>
      </MotionArticle>

      <MotionArticle
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="clay-elevated rounded-3xl p-5 sm:p-6"
      >
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-[#a1c14b]/20 p-2 text-[#272625]">
              <PlayCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400">Learning</p>
              <h2 className="text-2xl font-semibold text-slate-100">Webinar Section</h2>
            </div>
          </div>
          <Button type="button">View Calendar</Button>
        </header>

        <div className="grid gap-3 lg:grid-cols-3">
          {sampleWebinars.map((item, index) => (
            <MotionDiv
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: Math.min(index * 0.06, 0.18), duration: 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-base font-semibold text-slate-100">{item.title}</p>
              <p className="mt-1 text-xs text-slate-400">{item.speaker}</p>
              <div className="mt-4 space-y-1 text-xs text-slate-300">
                <p className="inline-flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-[#d1de74]" />
                  {item.slot}
                </p>
                <p className="inline-flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-[#a1c14b]" />
                  {item.attendees} registered
                </p>
              </div>
            </MotionDiv>
          ))}
        </div>
      </MotionArticle>
    </section>
  );
}
