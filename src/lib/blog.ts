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
