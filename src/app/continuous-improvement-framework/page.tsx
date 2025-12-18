import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Continuous Improvement Framework for Teams',
  description: 'Learn the proven framework for continuous, incremental improvement. A systematic approach to making small, measurable changes that compound into extraordinary results for teams and operators.',
  keywords: ['continuous improvement framework', 'incremental improvement', 'continuous improvement methodology', 'team improvement framework', 'kaizen framework', 'continuous improvement process'],
}

export default function ContinuousImprovementFrameworkPage() {
  return (
    <article className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-accent-50">
      <Container className="py-16 md:py-24">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            A practical framework for continuous improvement in real teams
          </h1>
        </header>

        {/* Section 1 — Define the Problem */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Define the Problem</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Big Rewrites Fail</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Big rewrites fail because they attempt to solve too many problems at once. When teams commit to massive overhauls, they're betting everything on a single, complex plan. If any part of that plan goes wrong—and something always does—the entire effort can collapse. The complexity of coordinating multiple changes simultaneously creates countless failure points.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Large rewrites also suffer from planning fallacy. Teams consistently underestimate the time, resources, and complexity required. What starts as a "three-month project" becomes a year-long struggle, draining resources and morale. By the time the rewrite is complete (if it ever is), the original problems may have changed, or new ones may have emerged.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why "One Big Change" Rarely Sticks</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  One big change rarely sticks because it disrupts too much at once. When teams introduce a major transformation, they're asking people to change multiple habits, processes, and workflows simultaneously. This cognitive overload makes it nearly impossible for the change to become natural.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Big changes also lack the feedback loops that help teams learn and adapt. By the time you know if a major change is working, you've invested so much that reverting feels impossible. Teams end up stuck with changes that don't work because the cost of undoing them is too high.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Additionally, big changes often fail because they don't account for the day-to-day reality of how teams actually work. What looks good in planning documents often breaks down when faced with real-world constraints, unexpected problems, and the natural resistance to major disruption.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Real-World Friction: Time, Risk, and Morale</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Time is the most precious resource for teams, and big rewrites consume it voraciously. Teams can't afford to pause normal operations for months while implementing a major change. The opportunity cost is enormous—every day spent on a rewrite is a day not spent delivering value to customers or improving other areas.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Risk compounds with scale. A small change that fails is a learning opportunity. A big rewrite that fails can threaten the entire operation. Teams understandably become risk-averse when facing potential catastrophic failure, which makes them hesitant to attempt major changes even when they're clearly needed.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Morale suffers when big changes drag on. Teams start with enthusiasm, but as months pass without visible progress, motivation wanes. The constant pressure of a major initiative creates stress, and when the change finally completes (or fails), teams are exhausted rather than energized. This burnout makes it harder to attempt future improvements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 — The Compounding Effect */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Compounding Effect</h2>
            
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Small improvements compound because each change builds on previous ones. This isn't just philosophy—it's mathematical reality. When you make consistent, incremental improvements, the effects multiply over time rather than simply adding up.
              </p>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">The Simple Math</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Consider a team that improves by just 1% each week. After one week, they're 1% better. After two weeks, they're not 2% better—they're 2.01% better, because the second improvement builds on the first. After a year (52 weeks), they're not 52% better—they're 67.8% better. This is the power of compounding.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  The formula is simple: (1 + improvement rate)^number of periods. A 1% weekly improvement compounds to 167.8% of the original after one year. A 2% weekly improvement compounds to 280%—nearly triple the original capability. This exponential growth is why small, consistent changes create extraordinary results.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The key insight is that improvements don't just stack—they interact. Each improvement makes the next one easier. As teams get better at identifying opportunities, implementing changes, and measuring results, their improvement velocity increases. The process itself improves, creating a positive feedback loop.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Business-Friendly Examples</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  A customer support team reduces average response time by 30 seconds per ticket. That seems small—just 30 seconds. But if they handle 100 tickets per day, that's 50 minutes saved daily. Over a year, that's 300 hours of capacity created. More importantly, faster responses improve customer satisfaction, which increases retention and reduces churn. The small time savings compound into measurable business impact.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  A development team reduces deployment time by 2 minutes. Small change, right? But if they deploy 10 times per week, that's 20 minutes saved weekly. Over a year, that's 17 hours. More significantly, faster deployments mean teams can release fixes and features more frequently, improving responsiveness to customer needs. The small time improvement compounds into competitive advantage.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  An operations team improves incident detection time by 5 minutes. If they have 2 incidents per week, that's 10 minutes saved weekly. But faster detection means faster resolution, which means less downtime. If each incident costs $1,000 per minute of downtime, those 5 minutes saved per incident prevent $5,000 in costs. Over a year, that's $520,000 in prevented costs from a seemingly tiny improvement.
                </p>
              </div>

              <div className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded-r-lg">
                <p className="text-lg text-gray-800 leading-relaxed font-medium">
                  This is the philosophy behind <strong>A Little Better</strong>—the recognition that small, intentional improvements, when applied consistently, compound into extraordinary results. A little better each week doesn't just add up—it multiplies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — The Framework */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">The Framework</h2>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              This framework provides a systematic approach to continuous improvement. Each step builds on the previous one, creating a repeatable cycle that teams can apply to any area of their work.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 1: Identify Friction</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Friction is anything that slows down work, creates frustration, or prevents teams from doing their best. It might be a process that requires too many steps, a tool that's difficult to use, or a workflow that creates bottlenecks. The key is to look for things that team members complain about repeatedly or that consistently cause delays.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg my-4">
                  <p className="text-base text-gray-700 font-medium mb-2">Workflow Example:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Observe daily work for one week</li>
                    <li>Note every time someone says "this is annoying" or "why do we do it this way?"</li>
                    <li>Track how long common tasks actually take vs. how long they should take</li>
                    <li>Identify the top 3 sources of friction</li>
                    <li>Prioritize by impact (how much time/effort it wastes) and ease (how easy it would be to fix)</li>
                  </ol>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Don't try to fix everything at once. Pick one source of friction that has high impact and can be addressed with a small change. This becomes your first improvement target.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 2: Apply Small Change</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Once you've identified friction, design a small change that addresses it directly. The change should be small enough to implement quickly—ideally in hours or days, not weeks. It should be reversible, so if it doesn't work, you can easily undo it. And it should be focused, addressing one specific source of friction rather than trying to solve multiple problems.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg my-4">
                  <p className="text-base text-gray-700 font-medium mb-2">Implementation Example:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Design the change: What exactly will be different?</li>
                    <li>Communicate clearly: Tell the team what's changing and why</li>
                    <li>Implement during low-risk period: Don't make changes during critical deadlines</li>
                    <li>Make it visible: Ensure everyone knows the change is in effect</li>
                    <li>Be ready to adjust: Have a plan for what to do if it doesn't work</li>
                  </ol>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The goal is to make the change feel natural, not disruptive. If team members have to constantly remember to do something differently, the change is too complex. The best improvements become automatic quickly.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 3: Measure Outcome</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Before implementing the change, establish a baseline measurement. You need to know where you started to determine if the change is working. Choose metrics that directly relate to the friction you're trying to reduce. If you're reducing time, measure time. If you're reducing errors, measure errors. If you're improving satisfaction, measure satisfaction.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg my-4">
                  <p className="text-base text-gray-700 font-medium mb-2">Measurement Example:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>Before change: Measure current state for one full cycle (week/month)</li>
                    <li>After change: Measure new state for same duration</li>
                    <li>Compare: Did the metric improve? By how much?</li>
                    <li>Consider context: Were there other factors that might have influenced the result?</li>
                    <li>Decide: Is the change working well enough to keep?</li>
                  </ol>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Measurement doesn't require complex analytics. Simple tracking—counting, timing, or asking team members—is often sufficient. The key is consistency: measure the same thing, the same way, over time.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Step 4: Repeat Deliberately</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Continuous improvement isn't a one-time effort—it's a cycle. After measuring the outcome of one change, use what you learned to identify the next improvement opportunity. Each cycle teaches you something about your system, your team, and what works. This knowledge makes each subsequent improvement more effective.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg my-4">
                  <p className="text-base text-gray-700 font-medium mb-2">Repeat Cycle Example:</p>
                  <ol className="list-decimal list-inside space-y-1 text-gray-700">
                    <li>If change worked: Make it permanent, integrate into standard process</li>
                    <li>If change didn't work: Revert it, document what you learned</li>
                    <li>Identify next friction: Use improved understanding to find next opportunity</li>
                    <li>Apply next small change: Build on previous learning</li>
                    <li>Measure again: Continue the cycle</li>
                  </ol>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The repetition is what creates compounding. Each improvement cycle builds capability. Teams get better at identifying friction, designing changes, and measuring outcomes. This increasing capability means improvements become easier and more effective over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4 — Real Examples */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Real Examples</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Process Improvement: Code Review Workflow</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  A development team noticed that code reviews were taking too long. Instead of redesigning their entire review process, they made one small change: they added a checklist of common issues to look for. This checklist reduced review time by 15 minutes per review because reviewers knew what to focus on.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Over the next month, they refined the checklist based on what reviewers actually found useful. They removed items that weren't helpful and added ones that caught real issues. After three months, review time was down 40%, and code quality had actually improved because reviewers were more focused. The small checklist change, refined through multiple cycles, created substantial improvement.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Team Workflow: Daily Standup Efficiency</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  A product team's daily standups were running 45 minutes instead of the intended 15. Rather than canceling standups or restructuring the entire meeting format, they made one small change: they added a timer that beeped at 2 minutes per person. This simple constraint forced people to be concise.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Standups immediately dropped to 20 minutes. Over the next few weeks, team members got better at preparing concise updates. The team then made another small change: they moved status updates to a shared document and used standup time only for blockers and coordination. Standups are now consistently 12-15 minutes, and the team feels they're more valuable. Two small changes, applied sequentially, solved what seemed like a complex problem.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Product Iteration: Feature Flag Process</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  A SaaS company wanted to release features faster but was afraid of breaking production. Instead of implementing a complex feature flagging system, they started with one small change: they added a simple on/off toggle for new features in their admin panel. This let them deploy code but keep features hidden until ready.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This small change reduced deployment anxiety immediately. They could deploy code without fear because features were off by default. Over the next quarter, they incrementally improved the system—adding user-level flags, percentage rollouts, and automated testing. What started as a simple toggle became a sophisticated feature flagging system, but each step was small and reversible.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Operational Efficiency: Incident Response Documentation</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  An operations team was spending too much time responding to the same types of incidents repeatedly. Instead of building a comprehensive knowledge base, they started with one small change: after each incident, they wrote a one-paragraph summary of what happened and how they fixed it in a shared document.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This simple documentation practice immediately helped—when similar incidents occurred, team members could quickly find previous solutions. Over time, they refined the format, added search, and organized by category. After six months, incident resolution time was down 35%, and the team had built a valuable knowledge base—all starting from one small change: writing a paragraph after each incident.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 — Why Existing Tools Fail */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Existing Tools Fail</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Most Tools Push Big Initiatives</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Most improvement tools are designed around the idea of big initiatives. They encourage teams to plan major projects, set ambitious goals, and track progress toward large-scale transformations. This approach feels impressive—it's satisfying to see a big plan come together—but it's fundamentally misaligned with how improvement actually works.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  These tools create planning overhead. Teams spend weeks setting up projects, defining milestones, and creating dashboards. By the time they're ready to start improving, they've already invested so much in planning that they're committed to the big approach, even if small changes would be more effective.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">They Ignore Compounding</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Existing tools treat improvements as discrete events. They track individual projects or initiatives but don't help teams see how small changes compound over time. There's no mechanism to show that a 1% improvement this week, plus a 1% improvement next week, creates exponential growth rather than linear addition.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Without understanding compounding, teams undervalue small improvements. They think they need big changes to see meaningful results, so they wait until they can plan something substantial. This waiting means they miss opportunities for continuous progress and end up making fewer improvements overall.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Adoption Fails</h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Tools that require significant setup and training create adoption friction. Teams have to learn new workflows, change how they work, and invest time before seeing any benefit. This upfront cost makes adoption feel risky—what if the tool doesn't work for their specific needs? What if it's more trouble than it's worth?
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Even when teams do adopt these tools, they often abandon them because the tools don't fit into their natural workflow. The tool becomes another thing to remember, another system to maintain, another source of friction rather than a solution. Teams revert to their old ways because the tool requires more effort than it saves.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The fundamental problem is that most tools are built for big improvements, not small ones. They're designed for teams that can commit to major initiatives, not teams that need to improve incrementally while maintaining daily operations. This mismatch between tool design and real-world needs is why adoption fails.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 — Tie Back to Your Product */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">A Little Better: Built for Real-World Continuous Improvement</h2>
            <p className="text-xl mb-8 leading-relaxed">
              This framework is what <strong>A Little Better</strong> is built around. If you want to follow the project or help shape it early,{' '}
              <Link href="/" className="text-white underline hover:text-gray-200 transition-colors font-semibold">
                join the early access waitlist
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 font-bold">
                  Join the A Little Better early access waitlist
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </Container>
    </article>
  )
}
