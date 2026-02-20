import React, { useState, useMemo, useEffect } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import {
    TrendingUp, Activity, Server, Zap, Database, Search,
    ChevronLeft, ChevronRight, Filter, Download
} from 'lucide-react';

const CHART_COLORS = {
    blue: '#9AC1F0',
    green: '#72FA93',
    lime: '#A0E548',
    orange: '#E45F2B',
    yellow: '#F6C445'
};

const data = [
    { name: '00:00', processed: 4000, latency: 240, nodes: 1100 },
    { name: '02:00', processed: 4500, latency: 210, nodes: 1150 },
    { name: '04:00', processed: 3000, latency: 450, nodes: 1200 },
    { name: '06:00', processed: 3500, latency: 320, nodes: 1210 },
    { name: '08:00', processed: 2000, latency: 890, nodes: 1180 },
    { name: '10:00', processed: 4800, latency: 150, nodes: 1220 },
    { name: '12:00', processed: 2780, latency: 390, nodes: 1190 },
    { name: '14:00', processed: 5200, latency: 120, nodes: 1250 },
    { name: '16:00', processed: 1890, latency: 480, nodes: 1204 },
    { name: '18:00', processed: 3800, latency: 280, nodes: 1230 },
    { name: '20:00', processed: 2390, latency: 380, nodes: 1210 },
    { name: '22:00', processed: 4200, latency: 220, nodes: 1240 },
    { name: '23:59', processed: 3490, latency: 430, nodes: 1204 },
];

const barData = [
    { engine: 'Oracle', load: 85, color: '#9AC1F0' },
    { engine: 'Kafka', load: 62, color: '#72FA93' },
    { engine: 'AWS S3', load: 94, color: '#A0E548' },
    { engine: 'Redis', load: 45, color: '#F6C445' },
    { engine: 'Elastic', load: 78, color: '#E45F2B' },
];

const pieData = [
    { name: 'Processed', value: 75, fill: '#72FA93' },
    { name: 'Pending', value: 15, fill: '#9AC1F0' },
    { name: 'Failed', value: 10, fill: '#E45F2B' },
];

const radarData = [
    { subject: 'Speed', A: 120, B: 110, fullMark: 150 },
    { subject: 'Security', A: 98, B: 130, fullMark: 150 },
    { subject: 'Stability', A: 86, B: 130, fullMark: 150 },
    { subject: 'Cost', A: 99, B: 100, fullMark: 150 },
    { subject: 'Scalability', A: 85, B: 90, fullMark: 150 },
];



const INITIAL_TABLE_DATA = Array.from({ length: 25 }, (_, i) => ({
    id: `TX-${9081 + i}`,
    source: ['Oracle_DB_01', 'Kafka_Cluster', 'AWS_S3', 'Redis_Edge', 'Elastic_Log'][i % 5],
    type: ['JSON', 'PARQUET', 'AVRO', 'BINARY', 'CSV'][i % 5],
    size: `${(Math.random() * 10).toFixed(1)} TB`,
    status: ['Optimal', 'High Load', 'Syncing', 'Latency'][i % 4],
    color: ['var(--success)', 'var(--accent)', 'var(--primary)', 'var(--warning)'][i % 4]
}));

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);
    const itemsPerPage = 8;

    useEffect(() => {
        // Force a resize event to ensure Recharts observes the container size
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
            setIsLoaded(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const filteredData = useMemo(() => {
        return INITIAL_TABLE_DATA.filter(item =>
            item.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentTableData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="main-content" style={{ position: 'relative' }}>
            <header style={{
                marginBottom: '48px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '24px'
            }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px' }}>
                        Operational <span className="text-gradient">Intelligence</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Advanced Cluster Telemetry & Neural Analysis</p>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div className="glass-card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }} />
                        <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Real-time Feed: ACTIVE</span>
                    </div>
                </div>
            </header>

            {/* Stats Bar */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                {[
                    { label: 'Throughput', value: '4.2 GB/s', color: 'var(--primary)', icon: Activity },
                    { label: 'Nodes Active', value: '1,204', color: 'var(--success)', icon: Server },
                    { label: 'Error Margin', value: '0.003%', color: 'var(--warning)', icon: TrendingUp },
                    { label: 'Total Storage', value: '89.4 PB', color: 'var(--accent)', icon: Database },
                ].map((stat, i) => (
                    <div key={i} className="glass-card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ background: `${stat.color}15`, padding: '12px', borderRadius: '12px', color: stat.color }}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '500' }}>{stat.label}</p>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stat.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Grid */}
            <div className="charts-grid-container" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                <div className="glass-card" style={{ padding: '32px', gridColumn: 'span 2' }}>
                    <h3 style={{ marginBottom: '24px', fontWeight: '700' }}>Processing Latency Analysis</h3>
                    <div style={{ height: '300px', width: '100%', minWidth: '0' }}>
                        {isLoaded && (
                            <ResponsiveContainer width="100%" height="100%" debounce={0}>
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={CHART_COLORS.blue} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={CHART_COLORS.blue} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--glass-shadow)' }} />
                                    <Area type="monotone" dataKey="processed" stroke={CHART_COLORS.blue} fillOpacity={1} fill="url(#chartGradient)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '32px' }}>
                    <h3 style={{ marginBottom: '24px', fontWeight: '700' }}>Engine Load Analysis</h3>
                    <div style={{ height: '300px', width: '100%', minWidth: '0' }}>
                        {isLoaded && (
                            <ResponsiveContainer width="100%" height="100%" debounce={0}>
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                    <XAxis dataKey="engine" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)' }} />
                                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--glass-shadow)' }} />
                                    <Bar dataKey="load" radius={[6, 6, 0, 0]}>
                                        {barData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '32px' }}>
                    <h3 style={{ marginBottom: '24px', fontWeight: '700' }}>Task Distribution</h3>
                    <div style={{ height: '300px', width: '100%', minWidth: '0' }}>
                        {isLoaded && (
                            <ResponsiveContainer width="100%" height="100%" debounce={0}>
                                <PieChart>
                                    <Pie data={pieData} innerRadius={60} outerRadius={90} paddingAngle={8} dataKey="value" label>
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '32px' }}>
                    <h3 style={{ marginBottom: '24px', fontWeight: '700' }}>System Reliability</h3>
                    <div style={{ height: '300px', width: '100%', minWidth: '0' }}>
                        {isLoaded && (
                            <ResponsiveContainer width="100%" height="100%" debounce={0}>
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid stroke="rgba(0,0,0,0.1)" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                                    <Radar name="Cluster A" dataKey="A" stroke={CHART_COLORS.blue} fill={CHART_COLORS.blue} fillOpacity={0.6} />
                                    <Radar name="Cluster B" dataKey="B" stroke={CHART_COLORS.yellow} fill={CHART_COLORS.yellow} fillOpacity={0.6} />
                                </RadarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>

            {/* Enhanced Table Section */}
            <div className="glass-card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '800' }}>Data Flow Streams</h3>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Filter streams..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    padding: '10px 12px 10px 40px',
                                    background: 'rgba(0,0,0,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '10px',
                                    width: '280px',
                                    color: 'var(--text-main)',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem', background: '#f1f5f9', color: '#1e293b', border: '1px solid #e2e8f0' }}>
                            <Filter size={16} /> Filter
                        </button>
                        <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                            <Download size={16} /> Export
                        </button>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                                <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>IDENTIFIER</th>
                                <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>ENGINE ORIGIN</th>
                                <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>FORMAT</th>
                                <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>CAPACITY</th>
                                <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>TELEMETRY</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTableData.map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                                    <td style={{ padding: '18px 16px', fontWeight: '700', color: 'var(--primary)' }}>{row.id}</td>
                                    <td style={{ padding: '18px 16px', fontWeight: '500' }}>{row.source}</td>
                                    <td style={{ padding: '18px 16px' }}>
                                        <span style={{ padding: '4px 10px', background: 'rgba(0,0,0,0.05)', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>{row.type}</span>
                                    </td>
                                    <td style={{ padding: '18px 16px', fontWeight: '700' }}>{row.size}</td>
                                    <td style={{ padding: '18px 16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: row.color }} />
                                            <span style={{ color: row.color, fontSize: '0.85rem', fontWeight: '600' }}>{row.status}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div style={{
                    marginTop: '32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '24px',
                    borderTop: '1px solid var(--glass-border)'
                }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} streams
                    </p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'none', cursor: 'pointer', opacity: currentPage === 1 ? 0.3 : 1 }}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                            <button
                                key={num}
                                onClick={() => setCurrentPage(num)}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: currentPage === num ? 'var(--primary)' : 'transparent',
                                    color: currentPage === num ? '#0f172a' : 'var(--text-main)',
                                    fontWeight: '700',
                                    cursor: 'pointer'
                                }}
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'none', cursor: 'pointer', opacity: currentPage === totalPages ? 0.3 : 1 }}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
