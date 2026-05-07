import { MockEndpoint } from '../types'
import {
  getTotalCount,
  getMethodCount,
  getSuccessCount,
  getErrorCount,
  getMostUsedTag,
} from '../utils/endpointStats'

interface DashboardProps {
  endpoints: MockEndpoint[]
}

interface StatCardProps {
  label: string
  value: string | number
  accent?: string
}

function StatCard({ label, value, accent }: StatCardProps) {
  return (
    <div className={`stat-card ${accent ? `stat-card-${accent}` : ''}`}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export function Dashboard({ endpoints }: DashboardProps) {
  const total = getTotalCount(endpoints)
  const gets = getMethodCount(endpoints, 'GET')
  const posts = getMethodCount(endpoints, 'POST')
  const success = getSuccessCount(endpoints)
  const errors = getErrorCount(endpoints)
  const topTag = getMostUsedTag(endpoints)

  return (
    <section className="dashboard">
      <h2 className="section-title">Dashboard</h2>
      <div className="stats-grid">
        <StatCard label="Total Endpoints" value={total} />
        <StatCard label="GET" value={gets} accent="get" />
        <StatCard label="POST" value={posts} accent="post" />
        <StatCard label="Success (2xx)" value={success} accent="success" />
        <StatCard label="Errors (4xx/5xx)" value={errors} accent="error" />
        <StatCard label="Top Tag" value={topTag} accent="tag" />
      </div>
    </section>
  )
}
