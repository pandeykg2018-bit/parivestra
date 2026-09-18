'use client'

import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Check,
  ChevronDown,
  Command,
  Database,
  Menu,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react'

const agents = [
  {
    name: 'SEO Opportunity Analyst',
    category: 'Growth',
    description: 'Finds the highest-impact opportunities hiding in your search data.',
    icon: BarChart3,
    accent: 'mint',
    metrics: ['INPUTS / Search data', 'TOOLS / GSC · GA4'],
  },
  {
    name: 'Reputation Monitor',
    category: 'Intelligence',
    description: 'Tracks the conversations shaping how your market sees you.',
    icon: Network,
    accent: 'violet',
    metrics: ['INPUTS / Brand context', 'OUTPUT / Signal brief'],
  },
  {
    name: 'Campaign Analyst',
    category: 'Marketing',
    description: 'Turns scattered performance data into your next best move.',
    icon: Target,
    accent: 'blue',
    metrics: ['TOOLS / GA4 · Ads', 'OUTPUT / Action plan'],
  },
]

const capabilities = ['Outcome-first', 'Context-aware', 'Connected', 'Operational']

export default function Page() {
  const [query, setQuery] = useState('')
  const [activeAgent, setActiveAgent] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmit = () => {
    if (query.trim()) setSubmitted(true)
  }

  return (
    <main className="site-shell" onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); setPointer({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 }) }}>
      <div className="ambient ambient-one" />
      <div className="earth-scene" aria-hidden="true" style={{ '--earth-x': `${pointer.x * 18}px`, '--earth-y': `${pointer.y * 12 - scrollY * 0.08}px`, '--earth-scale': `${1 - Math.min(scrollY / 1800, 0.08)}` } as CSSProperties}>
        <div className="earth-haze" />
        <div className="earth-orbit orbit-one" />
        <div className="earth-orbit orbit-two" />
        <div className="earth" />
        <div className="earth-clouds" />
        <div className="earth-shine" />
        <div className="signal-node node-a" />
        <div className="signal-node node-b" />
      </div>
      <div className="ambient ambient-two" />
      <header className="nav-wrap">
        <nav className="nav glass-panel" aria-label="Main navigation">
          <a href="#top" className="brand" aria-label="Parivestra home">
            <span className="brand-mark"><Sparkles size={14} /></span>
            <span>parivestra</span>
          </a>
          <div className="nav-links">
            <a href="#agents">Agents</a>
            <a href="#approach">Approach</a>
            <a href="#enterprise">Enterprise</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="nav-actions">
            <button className="search-trigger" aria-label="Search agents"><Search size={15} /><span>Search</span><kbd>⌘ K</kbd></button>
            <a href="#contact" className="sign-in">Sign in</a>
            <a href="#contact" className="button button-dark button-small">Talk to us <ArrowUpRight size={14} /></a>
          </div>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </nav>
        {menuOpen && <div className="mobile-links glass-panel"><a href="#agents">Agents</a><a href="#approach">Approach</a><a href="#enterprise">Enterprise</a><a href="#pricing">Pricing</a><a href="#contact">Talk to us <ArrowUpRight size={14} /></a></div>}
      </header>

      <section className="hero section-grid" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> PARIVESTRA / AI WORKFORCE</div>
          <h1>Give every workflow <em>an operator.</em></h1>
          <p className="hero-intro">Purpose-built AI agents that understand the work, connect to your systems, and move your business forward.</p>
          <div className="hero-actions"><a className="button button-dark" href="#agents">Explore agents <ArrowUpRight size={16} /></a><a className="text-link" href="#approach">See how it works <span>→</span></a></div>
          <div className="hero-note"><span className="live-dot" /> A new operating layer for modern teams</div>
        </div>

        <div className="console-wrap">
          <div className="console-glow" />
          <div className="agent-console glass-panel">
            <div className="console-header"><div className="console-title"><span className="window-dots"><i /><i /><i /></span><span>AGENT CONSOLE</span></div><span className="console-status"><span className="live-dot" /> LIVE PREVIEW</span></div>
            <div className="console-body">
              {!submitted ? <>
                <div className="console-kicker">Start with the outcome</div>
                <h2>What do you need <span>to get done?</span></h2>
                <div className="prompt-box"><textarea value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) { e.preventDefault(); handleSubmit() } }} placeholder="Describe a workflow, a problem, or a goal..." aria-label="Describe what you need to get done" /><button onClick={handleSubmit} aria-label="Find an agent"><ArrowUpRight size={19} /></button></div>
                <div className="prompt-suggestions"><span>Try</span><button onClick={() => setQuery('Find the biggest problems in our SEO performance')}>“Find the biggest problems in our SEO performance”</button><button onClick={() => setQuery('Monitor our brand reputation')}>“Monitor our brand reputation”</button></div>
                <div className="console-footer"><span><Command size={13} /> Ask in plain language</span><span>⌘ ↵ to run</span></div>
              </> : <div className="result-state">
                <button className="back-link" onClick={() => setSubmitted(false)}>← New workflow</button>
                <div className="console-kicker">MATCHED TO YOUR WORKFLOW</div>
                <h2>Three operators <span>can help.</span></h2>
                <p className="result-query">“{query}”</p>
                <div className="agent-results">{agents.map((agent, index) => { const Icon = agent.icon; return <button key={agent.name} className={`agent-result ${activeAgent === index ? 'selected' : ''}`} onClick={() => setActiveAgent(index)}><span className={`agent-icon ${agent.accent}`}><Icon size={17} /></span><span className="agent-result-info"><strong>{agent.name}</strong><small>{agent.description}</small></span><ArrowUpRight size={16} /></button> })}</div>
                <div className="selected-preview"><div><span className="mini-label">RECOMMENDED OPERATOR</span><strong>{agents[activeAgent].name}</strong></div><a href="#agents" className="button button-dark button-small">Try operator <ArrowUpRight size={14} /></a></div>
              </div>}
            </div>
          </div>
          <div className="console-caption"><span>01</span><span>Describe the work. Parivestra finds the right operator.</span><span>↗</span></div>
        </div>
      </section>

      <section className="signal-bar"><div className="signal-label">BUILT FOR WORK THAT MATTERS</div><div className="signal-items"><span><Database size={15} /> Your context</span><span><Zap size={15} /> Real execution</span><span><ShieldCheck size={15} /> Visible by design</span></div></section>

      <section className="section section-grid" id="agents">
        <div className="section-heading"><div><div className="eyebrow">02 / AGENT LIBRARY</div><h2>Meet your new <em>operators.</em></h2></div><p>Specialists for the workflows your team already runs. Discover what they do, see how they work, and put them to work.</p></div>
        <div className="agent-grid">{agents.map((agent, index) => { const Icon = agent.icon; return <article className={`agent-card ${index === 0 ? 'featured' : ''}`} key={agent.name}><div className={`agent-visual ${agent.accent}`}><div className="visual-top"><span>PARIVESTRA / {agent.category.toUpperCase()}</span><Icon size={19} /></div>{index === 0 ? <div className="chart-visual"><div className="chart-line line-one" /><div className="chart-line line-two" /><div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /></div><span>SEARCH PERFORMANCE <b>↑ 28.4%</b></span></div> : index === 1 ? <div className="nodes-visual"><span /><span /><span /><span /><i /><i /><i /></div> : <div className="bars-visual"><span>CONVERSION PATH</span><div><i /><i /><i /><i /></div><small>CONTENT → CAMPAIGN → OUTCOME</small></div>}</div><div className="card-content"><div className="card-meta"><span>{agent.category}</span><span>↗</span></div><h3>{agent.name}</h3><p>{agent.description}</p><div className="card-footer"><div className="metrics">{agent.metrics.map((metric) => <span key={metric}><Check size={12} /> {metric}</span>)}</div><a href="#contact" aria-label={`Try ${agent.name}`}>Try agent <ArrowUpRight size={14} /></a></div></div></article> })}</div><a className="browse-link" href="#contact">Browse the full agent library <ArrowUpRight size={15} /></a>
      </section>

      <section className="trust-section section" id="approach"><div className="section-grid trust-grid"><div><div className="eyebrow">03 / NO BLACK BOXES</div><h2>See the work <em>as it happens.</em></h2><p className="trust-copy">An agent should not feel like a mystery. Every Parivestra operator makes its inputs, connections, activity, and output visible.</p><a className="text-link" href="#contact">Understand our approach <span>→</span></a></div><div className="work-flow glass-panel"><div className="flow-header"><span>OPERATOR ACTIVITY</span><span><span className="live-dot" /> RUNNING</span></div>{['Connected to search data', 'Reviewed 2,418 queries', 'Compared against benchmarks', 'Identified 14 opportunities'].map((item, index) => <div className={`flow-row ${index === 3 ? 'active' : ''}`} key={item}><span className="flow-index">0{index + 1}</span><span className="flow-check"><Check size={12} /></span><span>{item}</span><span className="flow-time">{index === 3 ? 'now' : `${index + 1}.${index + 2}s`}</span></div>)}<div className="flow-output"><div><span className="mini-label">OUTPUT / 01</span><strong>Organic opportunity detected</strong><p>High-impression queries are underperforming on click-through rate.</p></div><span className="output-score">+28%<small>potential CTR</small></span></div></div></div></section>

      <section className="principles section section-grid"><div className="principles-intro"><div className="eyebrow">04 / THE DIFFERENCE</div><h2>Intelligence that <em>operates.</em></h2><p>Not another chatbot. A connected layer of specialized intelligence built around the outcomes your business cares about.</p></div><div className="principle-list">{capabilities.map((item, index) => <div className="principle" key={item}><span>0{index + 1}</span><strong>{item}</strong><p>{['Built around the job to be done, not the prompt to be written.', 'Works with the context that makes your business different.', 'Fits into the tools and systems your team already trusts.', 'Produces useful work, with a clear next step attached.'][index]}</p><ArrowUpRight size={17} /></div>)}</div></section>

      <section className="enterprise section" id="enterprise"><div className="enterprise-inner section-grid"><div><div className="eyebrow">05 / BUILT AROUND YOU</div><h2>Need an operator for <em>your business?</em></h2><p>Bring your proprietary data, internal tools, and unique workflows. We will build the intelligence layer that belongs to your team.</p><a className="button button-light" href="#contact">Talk to our team <ArrowUpRight size={16} /></a></div><div className="system-diagram"><div className="diagram-line" />{['YOUR DATA', 'PARIVESTRA OPERATOR', 'YOUR TOOLS', 'BUSINESS OUTCOME'].map((label, index) => <div className={`diagram-node node-${index}`} key={label}><span>{String(index + 1).padStart(2, '0')}</span><strong>{label}</strong><ArrowUpRight size={15} /></div>)}</div></div></section>

      <section className="closing section" id="pricing"><div className="eyebrow">06 / START WITH THE WORK</div><h2>There is a better way<br />to move <em>forward.</em></h2><a className="button button-dark" href="#contact">Explore the workforce <ArrowUpRight size={16} /></a></section>
      <footer className="footer section-grid" id="contact"><div className="brand"><span className="brand-mark"><Sparkles size={14} /></span><span>parivestra</span></div><div className="footer-copy">The operating layer for intelligent work.<br /><span>© 2026 Parivestra Systems</span></div><div className="footer-links"><a href="#agents">Agents</a><a href="#approach">Approach</a><a href="#enterprise">Enterprise</a><a href="mailto:hello@parivestra.ai">Contact <ArrowUpRight size={13} /></a></div></footer>
    </main>
  )
}
