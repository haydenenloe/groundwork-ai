export interface BlogPost {
  slug: string
  title: string
  date: string
  summary: string
  readTime: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'agentic-ai-beating-expectations',
    title: 'Why Agentic AI Is Beating Expectations — and What Your Team Is Probably Missing',
    date: '2026-06-30',
    summary: 'A recent study found 96% of agentic AI deployments met or exceeded expectations. The companies achieving those results aren\'t doing anything exotic — but most teams are still missing the key distinction between AI tools and AI agents.',
    readTime: '5 min read',
    tags: ['AI Operations', 'Automation'],
  },
  {
    slug: 'document-before-you-automate',
    title: 'AI Can Run Your Processes. But Only If They\'re Written Down.',
    date: '2026-06-23',
    summary: 'The bottleneck in most AI deployments isn\'t the technology — it\'s undocumented tribal knowledge sitting in people\'s heads. Here\'s how to fix that before you build anything.',
    readTime: '5 min read',
    tags: ['AI Operations', 'Automation'],
  },
  {
    slug: 'ai-automation-breaks',
    title: 'AI Automations Break. Here\'s What to Do About It Before It Happens.',
    date: '2026-06-16',
    summary: 'Every AI automation you build will eventually break — silently, often weeks before anyone notices. Here\'s the maintenance system that prevents that.',
    readTime: '5 min read',
    tags: ['AI Operations', 'Automation'],
  },
  {
    slug: 'the-cost-of-waiting',
    title: 'The Cost of Waiting to Automate',
    date: '2026-06-09',
    summary: 'Every month you defer an automation project, you\'re not saving money — you\'re spending it. Here\'s how to calculate what waiting is actually costing your operation.',
    readTime: '5 min read',
    tags: ['AI Operations', 'ROI'],
  },
  {
    slug: 'stuck-in-pilot-mode',
    title: 'You\'re Stuck in AI Pilot Mode. Here\'s Why It Never Ends.',
    date: '2026-06-02',
    summary: 'Only 16% of companies have scaled AI enterprise-wide — despite rising investment and successful demos. Here\'s what keeps operations teams trapped in perpetual pilots, and the three things you need to actually scale.',
    readTime: '6 min read',
    tags: ['AI Operations', 'Automation'],
  },
  {
    slug: 'your-operations-arent-ai-ready',
    title: 'Your Operations Aren\'t AI-Ready. Here\'s How to Tell.',
    date: '2026-05-26',
    summary: 'Most companies try to deploy AI before they know what they\'re automating. Here are the four signs your operations aren\'t ready — and what to fix before you build anything.',
    readTime: '5 min read',
    tags: ['AI Operations', 'Automation'],
  },
  {
    slug: 'ai-automation-roi-gap',
    title: 'Your AI Automation Is Running. So Why Aren\'t You Saving Money?',
    date: '2026-05-19',
    summary: 'Most businesses automate the wrong things — and then measure the results wrong. Here\'s the real reason your AI isn\'t showing up in the numbers.',
    readTime: '5 min read',
    tags: ['AI Operations', 'ROI'],
  },
  {
    slug: 'ai-layoffs-dont-work',
    title: 'Cutting Headcount with AI Isn\'t a Strategy. Here\'s What Actually Works.',
    date: '2026-05-12',
    summary: 'A Gartner study found that 80% of companies used AI to cut staff — and none of it correlated to better ROI. Here\'s what the companies actually winning with AI are doing instead.',
    readTime: '5 min read',
    tags: ['AI Operations', 'ROI'],
  },
  {
    slug: 'ai-agents-fragmented',
    title: 'Your AI Agents Are Fragmented. Here\'s Why They\'re Underdelivering.',
    date: '2026-05-05',
    summary: 'Nearly half of enterprises are already running AI agents. Most are falling short — not because the technology is bad, but because the deployment is. Here\'s what\'s actually going wrong.',
    readTime: '6 min read',
    tags: ['AI Operations', 'Automation'],
  },
  {
    slug: 'why-ai-projects-fail',
    title: 'Why 40% of AI Projects Fail — And How to Not Be One of Them',
    date: '2026-04-21',
    summary: 'Gartner predicts 40% of AI agent projects will be scrapped by 2027. The reason isn\'t the technology. Here\'s what separates the companies that succeed from the ones that don\'t.',
    readTime: '6 min read',
    tags: ['AI Operations', 'ROI'],
  },
  {
    slug: 'ai-pilot-to-production',
    title: 'Your AI Pilot Worked. Here\'s Why It Didn\'t Scale.',
    date: '2026-04-14',
    summary: 'Most AI pilots succeed and then stall. The gap between a successful demo and production AI is where most companies lose — and it\'s not a technology problem.',
    readTime: '5 min read',
    tags: ['AI Operations', 'ROI'],
  },
  {
    slug: 'stop-buying-ai-tools',
    title: 'Stop Buying AI Tools. Start Building AI Workflows.',
    date: '2026-04-07',
    summary: 'Most companies have an AI budget but not an AI strategy. Here\'s the difference between tools that sit unused and workflows that actually cut costs.',
    readTime: '5 min read',
    tags: ['AI Operations', 'Automation', 'ROI'],
  },
]
