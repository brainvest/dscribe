import { CardItem } from '../../shared/flip-card/flip-card';

/** Tags an item can carry; the form offers these in a select. */
export const COLLECTION_TAGS = [
  'Getting started',
  'Design',
  'Reports',
  'Growth',
  'Social',
  'Impact',
  'Admin',
  'Wellbeing',
] as const;

/** Icons offered by the form, with a preview next to each option. */
export const COLLECTION_ICONS = [
  'rocket_launch',
  'palette',
  'insights',
  'school',
  'volunteer_activism',
  'eco',
  'travel_explore',
  'headphones',
  'lightbulb',
  'favorite',
] as const;

/** Sample data behind the end-user collection. Static: the form is a UI sample only. */
export const COLLECTION_ITEMS: CardItem[] = [
  {
    id: 1,
    icon: 'rocket_launch',
    title: 'Onboarding journey',
    blurb: 'Everything you need in your first two weeks, in one place.',
    tag: 'Getting started',
    details:
      'A guided path through accounts, tooling and the people you will work with. Steps unlock as you go, and nothing is lost if you pause.',
    facts: [
      { label: 'Steps', value: '12' },
      { label: 'Time', value: '~3 h' },
      { label: 'Progress', value: '58%' },
      { label: 'Owner', value: 'People Ops' },
    ],
  },
  {
    id: 2,
    icon: 'palette',
    title: 'Brand kit',
    blurb: 'Logos, colours and templates ready to drop into your work.',
    tag: 'Design',
    details:
      'The current palette, typography and logo lockups, with usage notes for print and screen. Downloads stay in sync with the design system.',
    facts: [
      { label: 'Assets', value: '84' },
      { label: 'Updated', value: 'Aug 2026' },
      { label: 'Formats', value: 'SVG, PNG' },
      { label: 'Licence', value: 'Internal' },
    ],
  },
  {
    id: 3,
    icon: 'insights',
    title: 'Weekly pulse',
    blurb: 'A short read on how the team is tracking this week.',
    tag: 'Reports',
    details:
      'Highlights, blockers and the two numbers that matter most, compiled every Monday morning and delivered before stand-up.',
    facts: [
      { label: 'Cadence', value: 'Weekly' },
      { label: 'Readers', value: '146' },
      { label: 'Next', value: 'Mon 09:00' },
      { label: 'Source', value: 'Analytics' },
    ],
  },
  {
    id: 4,
    icon: 'school',
    title: 'Learning paths',
    blurb: 'Short courses picked for your role, at your own pace.',
    tag: 'Growth',
    details:
      'Curated tracks with bite-sized lessons and a certificate at the end. Bookmark a path and pick it up from any device.',
    facts: [
      { label: 'Paths', value: '9' },
      { label: 'Enrolled', value: '2' },
      { label: 'Avg length', value: '45 min' },
      { label: 'Certificate', value: 'Yes' },
    ],
  },
  {
    id: 5,
    icon: 'volunteer_activism',
    title: 'Community board',
    blurb: 'Swap, lend and lift — posts from people nearby.',
    tag: 'Social',
    details:
      'A light-touch noticeboard for the things that never fit a ticket: lifts to the office, spare gear, lunch clubs and side projects.',
    facts: [
      { label: 'Open posts', value: '31' },
      { label: 'This week', value: '+7' },
      { label: 'Replies', value: '112' },
      { label: 'Moderated', value: 'Daily' },
    ],
  },
  {
    id: 6,
    icon: 'eco',
    title: 'Sustainability',
    blurb: 'Small choices, measured — see the difference they make.',
    tag: 'Impact',
    details:
      'Tracks travel, energy and procurement choices against the annual target, with practical suggestions rather than league tables.',
    facts: [
      { label: 'Target', value: '−18%' },
      { label: 'Actual', value: '−11%' },
      { label: 'Since', value: 'Jan 2026' },
      { label: 'Scope', value: '1 & 2' },
    ],
  },
  {
    id: 7,
    icon: 'travel_explore',
    title: 'Travel desk',
    blurb: 'Book, claim and check policy without the paperwork.',
    tag: 'Admin',
    details:
      'Trip requests, approvals and expenses in one flow. Policy limits are shown while you book, not after you have paid.',
    facts: [
      { label: 'Open trips', value: '1' },
      { label: 'Claims', value: '€ 240' },
      { label: 'Approval', value: '~1 day' },
      { label: 'Provider', value: 'Voyago' },
    ],
  },
  {
    id: 8,
    icon: 'headphones',
    title: 'Focus sessions',
    blurb: 'Quiet blocks and background sound to get things done.',
    tag: 'Wellbeing',
    details:
      'Reserve a distraction-free block, mute notifications and pick a soundscape. Sessions show as busy in your calendar automatically.',
    facts: [
      { label: 'Booked', value: '4 this wk' },
      { label: 'Avg block', value: '90 min' },
      { label: 'Soundscapes', value: '11' },
      { label: 'Streak', value: '6 days' },
    ],
  },
];
