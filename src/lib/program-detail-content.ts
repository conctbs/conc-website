export type ProgramDetailSample = {
  highlightTitle: string;
  highlights: string[];
  agendaTitle: string;
  agenda: string[];
  deliverablesTitle: string;
  deliverables: string[];
};

export const programDetailContent: Record<string, ProgramDetailSample> = {
  "strategic-content-operations-bootcamp": {
    highlightTitle: "What The Bootcamp Covers",
    highlights: [
      "Diagnose where planning, approvals, and publishing currently break across the team.",
      "Turn scattered channel requests into a shared operating model with clear ownership.",
      "Use lightweight content templates and governance rules before adding more tooling.",
    ],
    agendaTitle: "Sample Agenda",
    agenda: [
      "Day 1: Audit the current publishing flow, roles, blockers, and channel dependencies.",
      "Day 1: Redesign planning rituals, approval checkpoints, and content handoff rules.",
      "Day 2: Build a practical operating model with content calendar logic and team responsibilities.",
      "Day 2: Review a 90-day implementation roadmap for rollout, measurement, and iteration.",
    ],
    deliverablesTitle: "Participants Leave With",
    deliverables: [
      "A draft content operations map aligned to real roles in the organization.",
      "A reusable editorial workflow template for intake, production, review, and publication.",
      "A shortlist of process fixes the team can implement immediately after the program.",
    ],
  },
  "headless-cms-implementation-for-service-teams": {
    highlightTitle: "Key Working Sessions",
    highlights: [
      "Compare page-builder content, shared components, and structured collections in one model.",
      "Review which API shapes help frontend teams ship faster and reduce brittle coupling.",
      "Translate real website requirements into content types editors can actually maintain.",
    ],
    agendaTitle: "Workshop Flow",
    agenda: [
      "Morning: Map the service website use case and identify reusable entities, sections, and relationships.",
      "Morning: Model content types, shared components, and editorial constraints for maintainability.",
      "Afternoon: Shape API responses for listing pages, detail pages, and registration-ready journeys.",
      "Afternoon: Plan implementation sequencing across CMS setup, frontend integration, and QA.",
    ],
    deliverablesTitle: "Example Outputs",
    deliverables: [
      "A starter content architecture for a service-led website or training catalog.",
      "An agreed set of DTO expectations between content and frontend teams.",
      "A phased migration outline for moving existing pages into a headless workflow.",
    ],
  },
  "executive-communication-design-for-digital-teams": {
    highlightTitle: "Session Focus",
    highlights: [
      "Clarify what decision the audience needs to make before drafting updates or decks.",
      "Restructure dense information into a simple narrative that supports executive reading patterns.",
      "Improve communication artifacts used in leadership syncs, steering meetings, and internal briefings.",
    ],
    agendaTitle: "Session Outline",
    agenda: [
      "Part 1: Diagnose why strategic updates become confusing, slow, or overloaded.",
      "Part 2: Practice message framing, sequencing, and evidence selection for higher-stakes communication.",
      "Part 3: Rewrite a sample update into a cleaner executive-ready structure.",
      "Part 4: Review a practical checklist for future decks, memos, and digital status reports.",
    ],
    deliverablesTitle: "Participants Receive",
    deliverables: [
      "A simple narrative framework for executive updates and stakeholder communication.",
      "A checklist for simplifying message structure, visuals, and decision requests.",
      "Sample before-and-after references to use in internal communication reviews.",
    ],
  },
};
