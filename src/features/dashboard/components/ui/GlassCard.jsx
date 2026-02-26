export default function GlassCard({ className = '', children }) {
  return <section className={`fintech-glass rounded-3xl p-6 ${className}`}>{children}</section>;
}
