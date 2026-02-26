import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileWorkflowIllustration from '../../../components/illustrations/ProfileWorkflowIllustration';
import Button from '../../../components/ui/Button';
import BannerSlider from '../components/BannerSlider';
import HomeCandlestickDemo from '../components/HomeCandlestickDemo';
import HomeExploreSections from '../components/HomeExploreSections';
import HomeFooter from '../components/HomeFooter';
import HomeNavbar from '../components/HomeNavbar';
import MarketIndices from '../components/Indice/MarketIndices';
import SectorStrip from '../components/Indice/SectorStrip';
import PortfolioMix from '../components/PortfolioMix';
import RiskSignalsSection from '../components/RiskSignalsSection';
import StrategyBlueprint from '../components/StrategyBlueprint';
import UploadWorkspace from '../components/UploadWorkspace';

const MotionMain = motion.main;

export default function HomePage({ theme, onToggleTheme, profile }) {
  return (
    <div className="fintech-bg min-h-screen text-slate-100 antialiased">
      <HomeNavbar theme={theme} onToggleTheme={onToggleTheme} profile={profile} />

      <MotionMain initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }} className="pb-14">
        <div className="mx-auto max-w-7xl space-y-8 px-2 pt-6 sm:px-3 lg:space-y-10">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
            className="fintech-glass overflow-hidden rounded-3xl p-6 sm:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
              <article>
                <p className="inline-flex rounded-full border border-[#d1de74]/40 bg-[#d1de74]/10 px-3 py-1 text-xs text-[#d1de74]">
                  CMDA Home Workspace
                </p>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Move from market pulse to action in one workflow
                </h1>
                <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
                  Review market context, upload a fresh file, and branch straight into deeper analytics with less friction.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/dashboard">
                    <Button>
                      Open Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </article>
              <article className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <ProfileWorkflowIllustration type="login" />
              </article>
            </div>
          </motion.section>

          <BannerSlider />

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <MarketIndices />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
            <SectorStrip />
          </motion.div>

          <UploadWorkspace />

          <StrategyBlueprint />

          <PortfolioMix />

          <RiskSignalsSection />

          <HomeExploreSections />
          <HomeCandlestickDemo />
        </div>
      </MotionMain>

      <HomeFooter />
    </div>
  );
}
