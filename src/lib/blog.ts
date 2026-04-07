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
    slug: 'stop-buying-ai-tools',
    title: 'Stop Buying AI Tools. Start Building AI Workflows.',
    date: '2026-04-07',
    summary: 'Most companies have an AI budget but not an AI strategy. Here\'s the difference between tools that sit unused and workflows that actually cut costs.',
    readTime: '5 min read',
    tags: ['AI Operations', 'Automation', 'ROI'],
  },
]
