import { useEffect, useMemo, useState } from 'react';
import { performanceSeries } from '../data/dashboardData';

export function useDashboardState() {
  const [range, setRange] = useState('1M');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const series = useMemo(() => performanceSeries[range], [range]);

  return {
    range,
    setRange,
    loading,
    series
  };
}
