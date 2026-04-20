export const galleryCategoryDefinitions = {
  all: {
    label: 'All Gallery',
    path: '/gallery',
    pageSlug: 'gallery',
    description: 'Browse every published gallery entry from activities, seminars, curriculum activity, and knowledge sharing videos.',
  },
  activities: {
    label: 'Activities',
    path: '/gallery/activities',
    pageSlug: 'gallery-activities',
    apiCategory: 'activities',
    description: 'Activity archives covering workshops, faculty exchange, and participant engagement.',
  },
  'past-seminar': {
    label: 'Past Seminar',
    path: '/gallery/past-seminar',
    pageSlug: 'gallery-past-seminar',
    apiCategory: 'past-seminar',
    description: 'Past seminar records including speakers, audience participation, and event atmosphere.',
  },
  'past-curriculum-activities': {
    label: 'Past Curriculum Activities',
    path: '/gallery/past-curriculum-activities',
    pageSlug: 'gallery-past-curriculum-activities',
    apiCategory: 'past-curriculum-activities',
    description: 'Program exercise archives, facilitator-led sessions, and curriculum delivery moments.',
  },
  'knowledge-sharing-videos': {
    label: 'Knowledge Sharing Videos',
    path: '/gallery/knowledge-sharing-videos',
    pageSlug: 'gallery-knowledge-sharing-videos',
    apiCategory: 'knowledge-sharing-videos',
    description: 'Recorded knowledge sharing sessions and reusable learning references.',
  },
} as const;

export type GalleryCategorySlug = Exclude<keyof typeof galleryCategoryDefinitions, 'all'>;

export function getGalleryCategoryEntries() {
  return Object.entries(galleryCategoryDefinitions) as Array<
    [keyof typeof galleryCategoryDefinitions, (typeof galleryCategoryDefinitions)[keyof typeof galleryCategoryDefinitions]]
  >;
}
