export function StatCard({ label, value, hint }) {
  return (
    <div className="panel p-5">
      <p className="text-sm text-skin-soft">{label}</p>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      <p className="mt-2 text-sm text-skin-soft">{hint}</p>
    </div>
  )
}
