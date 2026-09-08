import { Card } from '../../ui/Card'
import { Avatar } from '../../ui/Avatar'
import { Badge } from '../../ui/Badge'
import { Chip } from '../../ui/Chip'

export default function CandidateProfile() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left">
          <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">Proof of work</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-strong">
            The profile that replaces the resume.
          </h2>
          <p className="text-muted text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            A resume tells you what someone claims they know. A Knowvation Select profile shows you what they built, how they think, and where they excel.
          </p>
        </div>

        {/* Right: Candidate Card */}
        <div className="flex-1 w-full order-1 lg:order-2">
          <Card className="p-6 md:p-8 border-line shadow-xl bg-panel">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <Avatar name="Candidate D" size="lg" />
                <div>
                  <div className="text-lg font-bold text-strong mb-1">Candidate D</div>
                  <Badge color="accent" size="sm">Select Qualified</Badge>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="text-xs font-semibold text-faint uppercase tracking-wider mb-2">Specialisation</div>
                <div className="text-strong font-medium">GenAI / LLM engineering</div>
              </div>
              
              <div>
                <div className="text-xs font-semibold text-faint uppercase tracking-wider mb-2">Demonstrated Skills</div>
                <div className="flex flex-wrap gap-2">
                  <Chip>Python</Chip>
                  <Chip>RAG</Chip>
                  <Chip>FastAPI</Chip>
                  <Chip>LLM APIs</Chip>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-line flex flex-wrap gap-x-8 gap-y-4">
              <div>
                <div className="text-xs font-semibold text-faint uppercase tracking-wider mb-1">Assessment</div>
                <div className="text-sm font-medium text-success flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                  Qualified
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-faint uppercase tracking-wider mb-1">Open to</div>
                <div className="text-sm font-medium text-strong">GenAI Roles</div>
              </div>
            </div>
          </Card>
        </div>
        
      </div>
    </div>
  )
}
