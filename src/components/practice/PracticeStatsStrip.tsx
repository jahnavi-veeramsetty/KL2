import { currentUser } from '../../data'
import { problems } from '../../data'

export function PracticeStatsStrip() {
  const { solved } = currentUser
  const totalSolved = solved.easy + solved.medium + solved.hard

  const easyCount = problems.filter(p => p.difficulty === 'Easy').length
  const mediumCount = problems.filter(p => p.difficulty === 'Medium').length
  const hardCount = problems.filter(p => p.difficulty === 'Hard').length



  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {[
        { label: 'Total Solved', value: totalSolved, sub: `of ${problems.length}`, color: '#22D3EE' },
        { label: 'Easy', value: solved.easy, sub: `of ${easyCount}`, color: '#22C55E' },
        { label: 'Medium', value: solved.medium, sub: `of ${mediumCount}`, color: '#F59E0B' },
        { label: 'Hard', value: solved.hard, sub: `of ${hardCount}`, color: '#EF4444' },
      ].map(({ label, value, sub, color }) => (
        <div key={label} className="bg-raised/30 border border-line rounded-xl p-4 text-center">
          <div className="text-2xl font-bold" style={{ color }}>{value}</div>
          <div className="text-xs font-medium text-strong">{label}</div>
          <div className="text-xs text-subtle">{sub}</div>
        </div>
      ))}
    </div>
  )
}
