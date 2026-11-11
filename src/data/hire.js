import { Bot, MonitorSmartphone, Smartphone } from 'lucide-react';

/**
 * Hire Developers — powers the mega menu, /hire-developers and /hire-developers/:slug.
 */
export const hireGroups = [
  {
    id: 'ai',
    label: 'AI Developers',
    icon: Bot,
    roles: [
      { slug: 'ai-engineers', title: 'AI Engineers', desc: 'Build intelligent features end to end', skills: ['Python', 'PyTorch', 'LangChain', 'OpenAI APIs', 'Vector databases', 'FastAPI'] },
      { slug: 'ml-engineers', title: 'ML Engineers', desc: 'Train and deploy production models', skills: ['TensorFlow', 'scikit-learn', 'MLflow', 'Feature stores', 'Kubeflow', 'SQL'] },
      { slug: 'llm-engineers', title: 'LLM Engineers', desc: 'RAG, agents and fine-tuning', skills: ['RAG pipelines', 'Prompt engineering', 'Fine-tuning', 'Evaluation', 'Agents', 'Guardrails'] },
      { slug: 'data-scientists', title: 'Data Scientists', desc: 'Insights, forecasting and analytics', skills: ['Pandas', 'Statistics', 'Forecasting', 'Jupyter', 'Power BI', 'A/B testing'] },
    ],
  },
  {
    id: 'web',
    label: 'Web Developers',
    icon: MonitorSmartphone,
    roles: [
      { slug: 'frontend-engineers', title: 'Frontend Engineers', desc: 'React, Next.js, Vue experts', skills: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Tailwind CSS', 'Testing Library'] },
      { slug: 'backend-engineers', title: 'Backend Engineers', desc: 'Node.js, Python, Go, .NET', skills: ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis', 'Microservices'] },
      { slug: 'full-stack-engineers', title: 'Full-stack Engineers', desc: 'Ship features across the stack', skills: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'AWS', 'Docker'] },
      { slug: 'devops-engineers', title: 'DevOps Engineers', desc: 'CI/CD, cloud and reliability', skills: ['AWS', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Prometheus', 'Linux'] },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile Developers',
    icon: Smartphone,
    roles: [
      { slug: 'ios-engineers', title: 'iOS Engineers', desc: 'Swift & SwiftUI specialists', skills: ['Swift', 'SwiftUI', 'Combine', 'Core Data', 'XCTest', 'App Store'] },
      { slug: 'android-engineers', title: 'Android Engineers', desc: 'Kotlin & Jetpack Compose', skills: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Room', 'Firebase', 'Play Console'] },
      { slug: 'flutter-engineers', title: 'Flutter Engineers', desc: 'Beautiful cross-platform apps', skills: ['Flutter', 'Dart', 'Riverpod', 'Bloc', 'Firebase', 'REST & GraphQL'] },
      { slug: 'react-native-engineers', title: 'React Native Engineers', desc: 'One codebase, every device', skills: ['React Native', 'TypeScript', 'Expo', 'Redux', 'Native modules', 'Detox'] },
    ],
  },
];

export const hireRoles = hireGroups.flatMap((g) => g.roles.map((r) => ({ ...r, group: g.label, groupId: g.id, icon: g.icon })));

export const getRole = (slug) => hireRoles.find((r) => r.slug === slug);

export const engagementModels = [
  { title: 'Dedicated Team', desc: 'A full squad working exclusively on your product, managed by a Velotech delivery lead.', best: 'Long-term products' },
  { title: 'Staff Augmentation', desc: 'Add individual engineers to your existing team, working in your tools and rituals.', best: 'Scaling quickly' },
  { title: 'Fixed Scope', desc: 'A defined scope, timeline and budget with milestone-based delivery.', best: 'Well-defined projects' },
];

export const hiringSteps = [
  { step: '01', title: 'Share your needs', desc: 'Tell us about your project, required skills and team size.' },
  { step: '02', title: 'Meet candidates', desc: 'Interview hand-picked, pre-vetted engineers within 48 hours.' },
  { step: '03', title: 'Risk-free trial', desc: 'Start with a trial period — only continue if you are happy.' },
  { step: '04', title: 'Scale with ease', desc: 'Add or rotate team members as your roadmap evolves.' },
];
