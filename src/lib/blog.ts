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
