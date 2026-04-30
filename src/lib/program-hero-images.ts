export interface ProgramHeroImage {
  src: string;
  alt: string;
}

export const programHeroImageBySlug: Record<string, ProgramHeroImage> = {
  'strategic-content-operations-bootcamp': {
    src: '/programs/strategic-content-operations-bootcamp-hero.png',
    alt: 'Strategic Content Operations Bootcamp course illustration',
  },
  'executive-communication-design-for-digital-teams': {
    src: '/programs/executive-communication-design-for-digital-teams.png',
    alt: 'Executive Communication Design for Digital Teams course illustration',
  },
};
