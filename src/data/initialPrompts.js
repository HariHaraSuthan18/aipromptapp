export const categories = [
  'Writing',
  'Coding',
  'Marketing',
  'Art & Design',
  'Business',
  'Other',
]

export const initialPrompts = [
  {
    id: 1,
    title: 'Blog Post Outline Generator',
    content:
      'Act as a content strategist. Create a detailed blog post outline for the topic: "{topic}". Include an engaging title, 5 subheadings, and a short description under each.',
    category: 'Writing',
    tags: ['blog', 'content', 'outline'],
    favorite: true,
    rating: 5,
    usageCount: 12,
    createdAt: '2026-06-20',
  },
  {
    id: 2,
    title: 'React Bug Fixer',
    content:
      'You are a senior React developer. Review the following component code and identify bugs, performance issues, and suggest fixes with explanations: {code}',
    category: 'Coding',
    tags: ['react', 'debugging', 'code-review'],
    favorite: true,
    rating: 4,
    usageCount: 27,
    createdAt: '2026-06-25',
  },
  {
    id: 3,
    title: 'Instagram Caption Writer',
    content:
      'Write 3 catchy Instagram captions for a post about {subject}. Keep the tone fun, include relevant emojis and 5 hashtags.',
    category: 'Marketing',
    tags: ['social-media', 'instagram', 'captions'],
    favorite: false,
    rating: 4,
    usageCount: 8,
    createdAt: '2026-07-01',
  },
  {
    id: 4,
    title: 'Logo Concept Brainstorm',
    content:
      'Act as a brand designer. Suggest 5 unique logo concepts for a brand called "{brand_name}" in the {industry} industry, describing shapes, colors, and style for each.',
    category: 'Art & Design',
    tags: ['branding', 'logo', 'design'],
    favorite: false,
    rating: 3,
    usageCount: 4,
    createdAt: '2026-07-05',
  },
  {
    id: 5,
    title: 'Startup Pitch Refiner',
    content:
      'You are a venture capital advisor. Review this startup pitch and give feedback on clarity, market positioning, and ask 3 tough questions an investor might raise: {pitch}',
    category: 'Business',
    tags: ['startup', 'pitch', 'investor'],
    favorite: false,
    rating: 5,
    usageCount: 6,
    createdAt: '2026-07-10',
  },
]
