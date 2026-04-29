import type {
  GalleryEntry,
  KnowledgeArticle,
  KnowledgeArticleListItem,
  Media,
  NewsEntry,
  NewsListItem,
  PageDto,
  Program,
  Project,
  ProjectListItem,
  Service,
  SiteSettingDto,
} from "./api";

const noMedia: Media = null;

function buildAvatarMedia(initials: string, background: string, foreground: string, label: string): Media {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" role="img" aria-label="${label}">
      <rect width="256" height="256" rx="128" fill="${background}" />
      <circle cx="128" cy="98" r="56" fill="${foreground}" opacity="0.92" />
      <path d="M48 224c14-42 45-62 80-62s66 20 80 62" fill="${foreground}" opacity="0.92" />
      <text x="128" y="210" text-anchor="middle" font-family="Arial, sans-serif" font-size="40" font-weight="700" fill="${background}">
        ${initials}
      </text>
    </svg>
  `.trim();
  const encoded = typeof Buffer !== "undefined" ? Buffer.from(svg).toString("base64") : btoa(svg);

  return {
    id: null,
    url: `data:image/svg+xml;base64,${encoded}`,
    alternativeText: label,
    caption: null,
    width: 256,
    height: 256,
    mime: "image/svg+xml",
  };
}

const services: Service[] = [
  {
    id: 1,
    name: "Web Design",
    slug: "web-design",
    description: "Design systems and marketing websites focused on clarity and conversion.",
    order: 1,
    seo: {
      metaTitle: "Web Design Services | Conc Website",
      metaDescription: "Design systems and service pages focused on clarity, structure, and conversion.",
      canonicalUrl: "https://conc.example/services/web-design",
      noIndex: false,
      metaImage: null,
    },
    icon: noMedia,
  },
  {
    id: 2,
    name: "Strapi Development",
    slug: "strapi-development",
    description: "Content architecture, API modeling, and custom CMS workflows on Strapi.",
    order: 2,
    seo: {
      metaTitle: "Strapi Development | Conc Website",
      metaDescription: "Strapi content modeling, APIs, and editorial workflows for service websites.",
      canonicalUrl: "https://conc.example/services/strapi-development",
      noIndex: false,
      metaImage: null,
    },
    icon: noMedia,
  },
  {
    id: 3,
    name: "Frontend Engineering",
    slug: "frontend-engineering",
    description: "Fast, maintainable interfaces built for modern React and headless CMS stacks.",
    order: 3,
    seo: {
      metaTitle: "Frontend Engineering | Conc Website",
      metaDescription: "Frontend implementation for headless CMS websites and reusable content systems.",
      canonicalUrl: "https://conc.example/services/frontend-engineering",
      noIndex: false,
      metaImage: null,
    },
    icon: noMedia,
  },
];

const projects: Project[] = [
  {
    id: 1,
    title: "Conc Website Relaunch",
    slug: "conc-website-relaunch",
    summary: "A modern marketing site with a reusable page builder and clearer service positioning.",
    content:
      "<p>We designed and implemented a new content model for landing pages, editorial content, reusable sections, and case studies.</p>",
    clientName: "Conc Studio",
    completedDate: "2026-02-14",
    featured: true,
    showOnConsultingProject: true,
    order: 1,
    seo: {
      metaTitle: "Conc Website Relaunch Project",
      metaDescription: "A project showcasing a reusable page builder and clearer service positioning.",
      canonicalUrl: "https://conc.example/projects/conc-website-relaunch",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
    gallery: [],
    services: services.slice(0, 2),
  },
  {
    id: 2,
    title: "Editorial Operations Toolkit",
    slug: "editorial-operations-toolkit",
    summary: "A headless CMS setup for teams that publish across service pages, blog content, and campaigns.",
    content: "<p>This project focused on schema consistency, editorial speed, and frontend-friendly API shapes.</p>",
    clientName: "Internal Prototype",
    completedDate: "2026-03-05",
    featured: false,
    showOnConsultingProject: false,
    order: 2,
    seo: {
      metaTitle: "Editorial Operations Toolkit Project",
      metaDescription: "A headless CMS setup for marketing pages, campaigns, and editorial workflows.",
      canonicalUrl: "https://conc.example/projects/editorial-operations-toolkit",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
    gallery: [],
    services,
  },
];

const consultingProjects = projects.filter((project) => project.showOnConsultingProject);

const newsEntries: NewsEntry[] = [
  {
    id: 1,
    title: "Launching The New Conc Website Content Platform",
    slug: "launching-the-new-conc-website-content-platform",
    content:
      "<p>We rebuilt the website content model to support reusable page sections, richer editorial workflows, and faster publishing.</p>",
    publishedDate: "2026-03-01",
    seo: {
      metaTitle: "Launching The New Conc Website Content Platform",
      metaDescription: "How the new content platform improves editorial workflows and page building.",
      canonicalUrl: "https://conc.example/news/launching-the-new-conc-website-content-platform",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
  },
  {
    id: 2,
    title: "How We Structure Page Builder Content In Strapi",
    slug: "how-we-structure-page-builder-content-in-strapi",
    content:
      "<p>This article explains how dynamic zones, shared components, and editorial naming conventions help teams ship faster.</p>",
    publishedDate: "2026-03-10",
    seo: {
      metaTitle: "How We Structure Page Builder Content In Strapi",
      metaDescription: "A practical look at dynamic zones, reusable components, and editor-friendly schemas.",
      canonicalUrl: "https://conc.example/news/how-we-structure-page-builder-content-in-strapi",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
  },
  {
    id: 3,
    title: "Project Spotlight: Headless Content For A Service Brand",
    slug: "project-spotlight-headless-content-for-a-service-brand",
    content:
      "<p>A case study on using Strapi to power landing pages, case studies, news, and reusable content blocks.</p>",
    publishedDate: "2026-03-18",
    seo: {
      metaTitle: "Project Spotlight: Headless Content For A Service Brand",
      metaDescription: "A sample case study on using Strapi for marketing pages and editorial content.",
      canonicalUrl: "https://conc.example/news/project-spotlight-headless-content-for-a-service-brand",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
  },
];

const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: 1,
    title: "From Training Room To Working Routine",
    slug: "from-training-room-to-working-routine",
    summary:
      "A practical guide for turning program takeaways into team rituals, follow-up checkpoints, and reusable learning artifacts.",
    content:
      "<p>Learning becomes more durable when participants leave a program with a visible routine for applying the idea. Teams can start with one shared practice, one reflection question, and one follow-up checkpoint.</p><p>This CONC Knowledge article outlines a lightweight structure that helps managers convert classroom discussion into repeatable behavior at work.</p>",
    category: "article",
    publishedDate: "2026-03-24",
    featured: true,
    order: 1,
    seo: {
      metaTitle: "From Training Room To Working Routine | CONC Knowledge",
      metaDescription: "A CONC Knowledge guide for turning training takeaways into practical team routines.",
      canonicalUrl: "https://conc.example/life-long-learning/conc-knowledge/from-training-room-to-working-routine",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
    attachment: noMedia,
    externalUrl: null,
  },
  {
    id: 2,
    title: "A Simple Framework For Post-Program Reflection",
    slug: "simple-framework-post-program-reflection",
    summary:
      "A three-question reflection model that helps participants identify what to keep, what to change, and what to share after learning sessions.",
    content:
      "<p>Post-program reflection should be easy enough to use within the first week. The model asks participants to identify one useful concept, one behavior to test, and one insight to share with a colleague.</p><p>Using the same reflection structure across programs gives organizations a shared language for learning transfer.</p>",
    category: "framework",
    publishedDate: "2026-03-12",
    featured: false,
    order: 2,
    seo: {
      metaTitle: "A Simple Framework For Post-Program Reflection | CONC Knowledge",
      metaDescription: "A three-question reflection model for stronger learning transfer after CONC programs.",
      canonicalUrl: "https://conc.example/life-long-learning/conc-knowledge/simple-framework-post-program-reflection",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
    attachment: noMedia,
    externalUrl: null,
  },
  {
    id: 3,
    title: "Checklist: Preparing Leaders For Case Discussion",
    slug: "checklist-preparing-leaders-for-case-discussion",
    summary:
      "A reusable checklist for helping leaders prepare for case-method sessions with clearer context, decision criteria, and discussion roles.",
    content:
      "<p>Case-method learning works best when participants arrive with a point of view. Before the session, leaders can clarify the business context, list available evidence, and write the decision they would make with current information.</p><p>The checklist supports richer discussion by separating facts, assumptions, tradeoffs, and action choices.</p>",
    category: "tool",
    publishedDate: "2026-02-28",
    featured: false,
    order: 3,
    seo: {
      metaTitle: "Checklist: Preparing Leaders For Case Discussion | CONC Knowledge",
      metaDescription: "A practical CONC Knowledge checklist for case-method preparation.",
      canonicalUrl: "https://conc.example/life-long-learning/conc-knowledge/checklist-preparing-leaders-for-case-discussion",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
    attachment: noMedia,
    externalUrl: null,
  },
  {
    id: 4,
    title: "How To Turn A Forum Insight Into Team Action",
    slug: "how-to-turn-a-forum-insight-into-team-action",
    summary:
      "A short guide for converting one useful idea from a forum or seminar into a practical action plan for a team.",
    content:
      "<p>After a forum or seminar, the most important step is choosing one insight that can be tested immediately. Teams should translate that idea into a small action, assign an owner, and set a short review date.</p><p>This article provides a simple follow-through pattern: capture the insight, define the first action, agree on evidence of progress, and share the result with the group.</p>",
    category: "article",
    publishedDate: "2026-04-01",
    featured: false,
    order: 4,
    seo: {
      metaTitle: "How To Turn A Forum Insight Into Team Action | CONC Knowledge",
      metaDescription: "A CONC Knowledge guide for turning forum insights into practical team action.",
      canonicalUrl: "https://conc.example/life-long-learning/conc-knowledge/how-to-turn-a-forum-insight-into-team-action",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
    attachment: noMedia,
    externalUrl: null,
  },
];

const galleryEntries: GalleryEntry[] = [
  {
    id: 1,
    title: "Leadership Roundtable and Faculty Activity Highlights",
    slug: "leadership-roundtable-and-faculty-activity-highlights",
    summary: "A visual archive of faculty exchange, campus activity, and participant engagement across recent CONC activities.",
    content:
      "<p>This gallery groups recent activity images from workshops, roundtables, and small group sessions that reflect the center's day-to-day learning environment.</p>",
    category: "activities",
    occurredOn: "2026-03-22",
    featured: true,
    seo: {
      metaTitle: "Leadership Roundtable and Faculty Activity Highlights",
      metaDescription: "Gallery archive for recent CONC activities, roundtables, and faculty engagement.",
      canonicalUrl: "https://conc.example/gallery/item/leadership-roundtable-and-faculty-activity-highlights",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
    gallery: [],
    videoUrl: null,
  },
  {
    id: 2,
    title: "Past Seminar Archive: Communication Under Pressure",
    slug: "past-seminar-archive-communication-under-pressure",
    summary: "Selected moments, speaker sessions, and audience interaction from a past seminar on communication under pressure.",
    content:
      "<p>This archive documents the seminar format, the speaker flow, and the way participants engaged with practical communication scenarios during the session.</p>",
    category: "past-seminar",
    occurredOn: "2025-11-18",
    featured: true,
    seo: {
      metaTitle: "Past Seminar Archive: Communication Under Pressure",
      metaDescription: "Past seminar gallery with speaker sessions and audience interaction highlights.",
      canonicalUrl: "https://conc.example/gallery/item/past-seminar-archive-communication-under-pressure",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
    gallery: [],
    videoUrl: null,
  },
  {
    id: 3,
    title: "Curriculum Activity Archive: Strategic Content Operations Bootcamp",
    slug: "curriculum-activity-archive-strategic-content-operations-bootcamp",
    summary: "A record of in-class exercises, group discussion, and curriculum activity from the bootcamp format.",
    content:
      "<p>This gallery captures curriculum-based working sessions, breakout exercises, and facilitator-led review points from the program delivery.</p>",
    category: "past-curriculum-activities",
    occurredOn: "2025-09-03",
    featured: false,
    seo: {
      metaTitle: "Curriculum Activity Archive: Strategic Content Operations Bootcamp",
      metaDescription: "Past curriculum activity gallery covering breakout sessions and facilitator-led exercises.",
      canonicalUrl: "https://conc.example/gallery/item/curriculum-activity-archive-strategic-content-operations-bootcamp",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
    gallery: [],
    videoUrl: null,
  },
  {
    id: 4,
    title: "Knowledge Sharing Video: Building Practical Learning Systems",
    slug: "knowledge-sharing-video-building-practical-learning-systems",
    summary: "A knowledge sharing video session on structuring practical learning systems and post-session follow-through.",
    content:
      "<p>This entry highlights a recorded knowledge sharing session that can be reused as an evergreen learning reference between live programs.</p>",
    category: "knowledge-sharing-videos",
    occurredOn: "2026-02-06",
    featured: true,
    seo: {
      metaTitle: "Knowledge Sharing Video: Building Practical Learning Systems",
      metaDescription: "Knowledge sharing video archive for practical learning systems and post-session follow-through.",
      canonicalUrl: "https://conc.example/gallery/item/knowledge-sharing-video-building-practical-learning-systems",
      noIndex: false,
      metaImage: null,
    },
    coverImage: noMedia,
    gallery: [],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

const programs: Program[] = [
  {
    id: 2,
    title: "Strategic Content Operations Bootcamp",
    slug: "strategic-content-operations-bootcamp",
    category: "Training Program",
    format: "Hybrid Intensive",
    dateLabel: "12-13 April 2026",
    startsAt: "2026-04-12",
    duration: "2 days",
    location: "Bangkok + Online",
    fee: "THB 12,900",
    audience: "Marketing leads, content managers, and digital transformation teams",
    summary:
      "A practical bootcamp for teams that need a clearer operating model for content planning, governance, and delivery across web channels.",
    tagline: "Build a repeatable content operating model for cross-channel delivery.",
    overview: [
      "This program focuses on turning fragmented publishing work into a repeatable content operations system.",
      "Participants work through planning models, ownership design, workflow checkpoints, and practical templates they can reuse after the workshop.",
    ],
    outcomes: [
      "Map content ownership across teams and channels",
      "Design a realistic editorial workflow with approvals and handoffs",
      "Identify the minimum content system needed before scaling tooling",
    ],
    seats: 24,
    registrationEnabled: true,
    isForumEvent: false,
    forumSeriesLabel: null,
    registrationNote: null,
    coverImage: noMedia,
    gallery: [],
    speakers: [],
    agendaItems: [],
    testimonials: [
      {
        id: 1,
        quote:
          "The program helped us turn scattered publishing requests into a workflow the marketing and product teams could actually run together.",
        authorName: "Kornkanok S.",
        authorRole: "Content Lead",
        authorCompany: "Regional Education Brand",
        authorAvatar: buildAvatarMedia("KS", "#7f1d1d", "#fecaca", "Kornkanok S. avatar"),
      },
      {
        id: 2,
        quote:
          "We left with a practical governance model, not just inspiration. It clarified ownership, review points, and what to standardize first.",
        authorName: "Piyawat L.",
        authorRole: "Digital Transformation Manager",
        authorCompany: "Service Operations Team",
        authorAvatar: buildAvatarMedia("PL", "#0f766e", "#99f6e4", "Piyawat L. avatar"),
      },
    ],
    seo: {
      metaTitle: "Strategic Content Operations Bootcamp",
      metaDescription: "A practical bootcamp on content planning, governance, and delivery systems for digital teams.",
      canonicalUrl: "https://conc.example/programs/strategic-content-operations-bootcamp",
      noIndex: false,
      metaImage: null,
    },
  },
  {
    id: 3,
    title: "Headless CMS Implementation for Service Teams",
    slug: "headless-cms-implementation-for-service-teams",
    category: "Training Program",
    format: "Onsite Workshop",
    dateLabel: "28 April 2026",
    startsAt: "2026-04-28",
    duration: "1 day",
    location: "CONC Learning Studio",
    fee: "THB 8,500",
    audience: "Frontend developers, product owners, and technical marketers",
    summary:
      "A hands-on workshop on content modeling, API shape design, and frontend integration patterns for teams moving to a headless CMS stack.",
    tagline: "Translate content architecture into delivery-ready APIs and frontend patterns.",
    overview: [
      "The workshop uses a service-website scenario to explain how content models, reusable components, and frontend DTOs fit together.",
      "It is designed for teams that need a shared technical and editorial vocabulary before implementation starts.",
    ],
    outcomes: [
      "Define collection types and reusable components for a real website model",
      "Reduce frontend coupling by shaping CMS responses for actual page needs",
      "Plan a phased migration path from static pages to structured content",
    ],
    seats: 18,
    registrationEnabled: true,
    isForumEvent: false,
    forumSeriesLabel: null,
    registrationNote: null,
    coverImage: noMedia,
    gallery: [],
    speakers: [],
    agendaItems: [],
    testimonials: [
      {
        id: 3,
        quote:
          "This was the first workshop where editorial and frontend teams aligned on the same content model without talking past each other.",
        authorName: "Nattida P.",
        authorRole: "Product Owner",
        authorCompany: "Professional Services Firm",
        authorAvatar: buildAvatarMedia("NP", "#1d4ed8", "#bfdbfe", "Nattida P. avatar"),
      },
      {
        id: 4,
        quote:
          "The API-shaping exercises made it obvious where our frontend coupling came from and how to reduce it before migration.",
        authorName: "Thanawat K.",
        authorRole: "Frontend Engineer",
        authorCompany: "B2B Platform Team",
        authorAvatar: buildAvatarMedia("TK", "#9333ea", "#e9d5ff", "Thanawat K. avatar"),
      },
    ],
    seo: {
      metaTitle: "Headless CMS Implementation for Service Teams",
      metaDescription: "A workshop on content modeling, API design, and frontend integration for service teams.",
      canonicalUrl: "https://conc.example/programs/headless-cms-implementation-for-service-teams",
      noIndex: false,
      metaImage: null,
    },
  },
  {
    id: 4,
    title: "Executive Communication Design for Digital Teams",
    slug: "executive-communication-design-for-digital-teams",
    category: "Training Program",
    format: "Live Online Session",
    dateLabel: "15 May 2026",
    startsAt: "2026-05-15",
    duration: "Half day",
    location: "Zoom",
    fee: "THB 4,900",
    audience: "Leadership teams, PMs, consultants, and internal communication owners",
    summary:
      "A concise training session on structuring high-stakes updates, strategy decks, and digital communication so decisions can move faster.",
    tagline: "Sharpen decision-oriented communication for executives and stakeholder groups.",
    overview: [
      "The session covers message framing, narrative sequencing, and visual simplification for decision-oriented communication.",
      "Participants leave with a reusable structure for turning dense information into clearer executive communication.",
    ],
    outcomes: [
      "Structure updates for faster decision-making",
      "Reduce ambiguity in strategic communication",
      "Create cleaner artifacts for executives and stakeholder groups",
    ],
    seats: 40,
    registrationEnabled: false,
    isForumEvent: false,
    forumSeriesLabel: null,
    registrationNote: null,
    coverImage: noMedia,
    gallery: [],
    speakers: [],
    agendaItems: [],
    testimonials: [
      {
        id: 5,
        quote:
          "The session gave our leadership team a much cleaner structure for updates. Decisions moved faster because the ask was visible earlier.",
        authorName: "Warisa T.",
        authorRole: "Strategy Office Lead",
        authorCompany: "Technology Group",
        authorAvatar: buildAvatarMedia("WT", "#be185d", "#fbcfe8", "Warisa T. avatar"),
      },
      {
        id: 6,
        quote:
          "It was concise but immediately useful. We reused the communication checklist in our next steering committee deck.",
        authorName: "Phuwanat R.",
        authorRole: "Program Manager",
        authorCompany: "Enterprise Transformation Office",
        authorAvatar: buildAvatarMedia("PR", "#b45309", "#fde68a", "Phuwanat R. avatar"),
      },
    ],
    seo: {
      metaTitle: "Executive Communication Design for Digital Teams",
      metaDescription: "A short training session on message framing, narrative sequencing, and executive communication.",
      canonicalUrl: "https://conc.example/programs/executive-communication-design-for-digital-teams",
      noIndex: false,
      metaImage: null,
    },
  },
  {
    id: 5,
    title: "CONC Thammasat Forum: Future-Ready Leadership in the Age of AI",
    slug: "conc-thammasat-forum-future-ready-leadership-ai",
    category: "Seminar Forum",
    format: "Onsite Forum",
    dateLabel: "20 June 2026",
    startsAt: "2026-06-20",
    duration: "09:00-16:30",
    location: "Thammasat University, Bangkok",
    fee: "THB 2,500",
    audience: "Executives, HR leaders, communication managers, and public-sector transformation teams",
    summary:
      "A one-day forum on leadership choices, organizational capability, and communication practice when AI is changing how teams coordinate work and decisions.",
    tagline: "Cross-sector dialogue on leadership, trust, and execution in AI-shaped organizations.",
    overview: [
      "The forum brings together academic, public, and business perspectives on how AI is reshaping leadership work, not just technical operations.",
      "Participants compare strategic responses to workforce redesign, communication clarity, and capability-building under rapid technology adoption.",
      "Each session is structured to move from framing and case-based reflection into practical discussion for institutional decision-makers.",
    ],
    outcomes: [
      "Clarify where leadership judgment still matters most in AI-enabled workflows",
      "Identify capability gaps in communication, governance, and team coordination",
      "Compare practical responses from organizations facing similar change pressures",
      "Leave with concrete questions and options for the next planning cycle",
    ],
    seats: 120,
    registrationEnabled: true,
    isForumEvent: true,
    forumSeriesLabel: "CONC Thammasat Forum",
    registrationNote:
      "Seats are limited. Registration is confirmed only after payment verification and CONC confirmation email.",
    coverImage: noMedia,
    gallery: [],
    speakers: [
      {
        id: 1,
        name: "Assoc. Prof. Dr. Narin Vachirakul",
        role: "Faculty Speaker",
        organization: "Thammasat University",
        bio: "Researches leadership, institutional adaptation, and executive learning design.",
        photo: noMedia,
      },
      {
        id: 2,
        name: "Ms. Ploy Chutima",
        role: "Industry Discussant",
        organization: "Digital Strategy Office",
        bio: "Leads transformation programs across communication, policy, and operating-model change.",
        photo: noMedia,
      },
    ],
    agendaItems: [
      {
        id: 1,
        timeLabel: "09:00-09:30",
        title: "Registration and opening remarks",
        description: "Participant check-in, forum framing, and session overview.",
        speakerName: null,
      },
      {
        id: 2,
        timeLabel: "09:30-10:45",
        title: "Keynote: Leadership choices in AI-enabled organizations",
        description:
          "How leaders rethink delegation, accountability, and communication when AI becomes part of daily work.",
        speakerName: "Assoc. Prof. Dr. Narin Vachirakul",
      },
      {
        id: 3,
        timeLabel: "11:00-12:00",
        title: "Panel: Capability building beyond tools",
        description:
          "A discussion on workforce readiness, trust, and operational alignment across sectors.",
        speakerName: "Assoc. Prof. Dr. Narin Vachirakul and Ms. Ploy Chutima",
      },
    ],
    testimonials: [
      {
        id: 7,
        quote:
          "The forum balanced academic perspective with operational reality. It helped our team frame AI adoption as a leadership issue, not only a tooling issue.",
        authorName: "Sirinya M.",
        authorRole: "HR Development Director",
        authorCompany: "Public Enterprise",
        authorAvatar: buildAvatarMedia("SM", "#0f766e", "#ccfbf1", "Sirinya M. avatar"),
      },
      {
        id: 8,
        quote:
          "The roundtable format surfaced practical concerns we were already facing internally, especially around communication trust and capability gaps.",
        authorName: "Aekkachai V.",
        authorRole: "Communication Manager",
        authorCompany: "University Administration",
        authorAvatar: buildAvatarMedia("AV", "#334155", "#cbd5e1", "Aekkachai V. avatar"),
      },
    ],
    seo: {
      metaTitle: "CONC Thammasat Forum: Future-Ready Leadership in the Age of AI",
      metaDescription: "A one-day cross-sector forum on leadership, trust, and execution in AI-shaped organizations.",
      canonicalUrl: "https://conc.example/programs/conc-thammasat-forum-future-ready-leadership-ai",
      noIndex: false,
      metaImage: null,
    },
  },
  {
    id: 6,
    title: "CONC Thammasat Forum: Public Communication Under Pressure",
    slug: "conc-thammasat-forum-public-communication-under-pressure",
    category: "Seminar Forum",
    format: "Forum Archive",
    dateLabel: "18 February 2026",
    startsAt: "2026-02-18",
    duration: "13:00-17:00",
    location: "CONC Auditorium",
    fee: "Completed event",
    audience: "Communication leaders, policy teams, media relations staff, and institutional spokespeople",
    summary:
      "An archived forum exploring how leaders communicate through ambiguity, public scrutiny, and fast-moving stakeholder expectations.",
    tagline: "A previous CONC forum session on public communication, trust, and institutional response.",
    overview: [
      "This archived forum examined the communication pressures leaders face during uncertainty and public scrutiny.",
      "Speakers compared institutional response patterns, message discipline, and the tradeoff between speed and clarity.",
    ],
    outcomes: [
      "Recognize common communication failure points during high-pressure moments",
      "Compare response patterns used across public, academic, and business institutions",
      "Capture practical lessons for future spokesperson and leadership preparation",
    ],
    seats: 0,
    registrationEnabled: false,
    isForumEvent: true,
    forumSeriesLabel: "CONC Thammasat Forum Archive",
    registrationNote: "This event has ended. Contact CONC if you want information on future forum sessions.",
    coverImage: noMedia,
    gallery: [],
    speakers: [
      {
        id: 3,
        name: "Dr. Kanokwan Siri",
        role: "Forum Speaker",
        organization: "School of Journalism and Communication",
        bio: "Works on crisis communication, public trust, and institutional messaging.",
        photo: noMedia,
      },
    ],
    agendaItems: [
      {
        id: 4,
        timeLabel: "13:15-14:15",
        title: "Opening keynote",
        description: "Communication choices under ambiguity and public attention.",
        speakerName: "Dr. Kanokwan Siri",
      },
      {
        id: 5,
        timeLabel: "14:30-16:00",
        title: "Case discussion",
        description: "Participants reviewed examples of public communication breakdown and recovery.",
        speakerName: null,
      },
    ],
    testimonials: [
      {
        id: 9,
        quote:
          "The archived session remains useful because the case discussion exposed the exact tension between speed and message discipline.",
        authorName: "Patcharee N.",
        authorRole: "Public Affairs Lead",
        authorCompany: "Institutional Communications Office",
        authorAvatar: buildAvatarMedia("PN", "#9f1239", "#fecdd3", "Patcharee N. avatar"),
      },
    ],
    seo: {
      metaTitle: "CONC Thammasat Forum: Public Communication Under Pressure",
      metaDescription: "Archived CONC forum session on communication, public trust, and institutional response.",
      canonicalUrl: "https://conc.example/programs/conc-thammasat-forum-public-communication-under-pressure",
      noIndex: false,
      metaImage: null,
    },
  },
  {
    id: 7,
    title: "CONC Thammasat Forum: Strategic Foresight for Public Sector Leaders",
    slug: "conc-thammasat-forum-strategic-foresight-public-sector-leaders",
    category: "Seminar Forum",
    format: "Onsite Forum",
    dateLabel: "10 August 2026",
    startsAt: "2026-08-10",
    duration: "09:00-16:00",
    location: "Thammasat Rangsit Campus",
    fee: "THB 3,200",
    audience: "Public-sector executives, policy planners, and organizational strategy teams",
    summary:
      "A sample closed-registration forum on strategic foresight, scenario thinking, and leadership choices for public institutions facing long-horizon uncertainty.",
    tagline: "A sample forum record with registration closed and capacity fixed at 100 seats.",
    overview: [
      "This sample forum record demonstrates how CONC Thammasat Forum sessions can be stored as structured seminar entries in Strapi.",
      "The session focuses on foresight practice, scenario-based discussion, and executive decision framing for public-sector leaders.",
      "It is intentionally configured as closed registration so the frontend and admin review flows can display the correct state.",
    ],
    outcomes: [
      "Compare strategic foresight methods suitable for executive discussion",
      "Identify leadership risks that emerge in long-horizon planning",
      "Use a closed forum sample to test frontend listing and registration status behavior",
    ],
    seats: 100,
    registrationEnabled: false,
    isForumEvent: true,
    forumSeriesLabel: "CONC Thammasat Forum",
    registrationNote: "This sample event is closed for registration. Capacity is capped at 100 seats.",
    coverImage: noMedia,
    gallery: [],
    speakers: [
      {
        id: 4,
        name: "Dr. Suriya Anantakul",
        role: "Keynote Speaker",
        organization: "Institute of Public Strategy",
        bio: "Works on foresight methods, scenario planning, and public-institution leadership under uncertainty.",
        photo: noMedia,
      },
    ],
    agendaItems: [
      {
        id: 6,
        timeLabel: "09:30-10:30",
        title: "Keynote on strategic foresight for public leadership",
        description: "A framing session on long-range uncertainty, policy signals, and executive decision-making.",
        speakerName: "Dr. Suriya Anantakul",
      },
      {
        id: 7,
        timeLabel: "11:00-12:00",
        title: "Scenario workshop",
        description: "Participants compare plausible public-sector futures and planning responses.",
        speakerName: null,
      },
      {
        id: 8,
        timeLabel: "13:30-15:00",
        title: "Roundtable synthesis",
        description: "A moderated exchange on translating foresight work into institutional action.",
        speakerName: null,
      },
    ],
    testimonials: [
      {
        id: 10,
        quote:
          "This forum pushed our planning team to think beyond annual cycles and compare multiple scenarios before locking decisions.",
        authorName: "Dr. Chanin P.",
        authorRole: "Policy Planning Advisor",
        authorCompany: "Public Sector Strategy Unit",
        authorAvatar: buildAvatarMedia("CP", "#166534", "#bbf7d0", "Dr. Chanin P. avatar"),
      },
    ],
    seo: {
      metaTitle: "CONC Thammasat Forum: Strategic Foresight for Public Sector Leaders",
      metaDescription: "A sample closed-registration CONC Thammasat Forum entry with 100 seats.",
      canonicalUrl: "https://conc.example/programs/conc-thammasat-forum-strategic-foresight-public-sector-leaders",
      noIndex: false,
      metaImage: null,
    },
  },
];

const siteSetting: SiteSettingDto = {
  id: 1,
  siteName: "Conc Website",
  siteDescription: "Sample content for a Strapi-powered service website with a reusable page builder.",
  contactEmail: "hello@conc.example",
  contactPhone: "+66 2 000 0000",
  paymentBankName: "Bangkok Bank",
  paymentAccountName: "Conc Website",
  paymentAccountNumber: "123-4-56789-0",
  paymentPromptpayId: "0800000000",
  paymentInstructions:
    "Transfer the fee, then submit the payment reference and optional slip URL through the payment page so the team can verify your seat.",
  paymentScbQrEnabled: false,
  paymentScbQrInstructions:
    "SCB QR can be enabled later by adding the SCB QR payment template and image URL template in site settings.",
  paymentScbQrPayloadTemplate: null,
  paymentScbQrImageUrlTemplate: null,
  address: "Bangkok, Thailand",
  facebookUrl: "https://facebook.com/",
  lineUrl: "https://line.me/",
  youtubeUrl: "https://youtube.com/",
  copyrightText: "© 2026 Conc Website. All rights reserved.",
  logo: null,
};

function buildInfoPage(input: {
  id: number;
  slug: string;
  title: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
}): PageDto {
  return {
    id: input.id,
    slug: input.slug,
    title: input.title,
    seo: {
      metaTitle: input.metaTitle,
      metaDescription: input.metaDescription,
      canonicalUrl: input.canonicalUrl,
      noIndex: false,
      metaImage: null,
    },
    sections: [
      {
        type: "hero",
        id: input.id * 10 + 1,
        eyebrow: input.eyebrow,
        title: input.title,
        description: input.intro,
        primaryButtonText: "Contact Us",
        primaryButtonUrl: "/contact",
        secondaryButtonText: "View Sitemap",
        secondaryButtonUrl: "/sitemap",
        backgroundImage: null,
      },
      {
        type: "stats",
        id: input.id * 10 + 2,
        eyebrow: input.eyebrow,
        title: "Key Focus Areas",
        description: "A concise summary block that helps the frontend render structured supporting points for this page.",
        items: input.sections.map((section, index) => ({
          id: input.id * 100 + index + 1,
          value: "01",
          suffix: null,
          label: section.title,
          description: section.body,
        })),
      },
      {
        type: "rich-text",
        id: input.id * 10 + 3,
        eyebrow: "Overview",
        title: input.title,
        description: null,
        body: `<p>${input.intro}</p>`,
      },
      {
        type: "faq",
        id: input.id * 10 + 4,
        eyebrow: "Details",
        title: `${input.title} Highlights`,
        description: "This section mirrors the supporting cards from the frontend placeholder page in a backend-friendly shape.",
        items: input.sections.map((section, index) => ({
          id: input.id * 100 + index + 11,
          question: section.title,
          answer: `<p>${section.body}</p>`,
        })),
      },
    ],
  };
}

const pages: Record<string, PageDto> = {
  home: {
    id: 1,
    slug: "home",
    title: "Home",
    seo: {
      metaTitle: "Conc Website | Strapi-Powered Service Website",
      metaDescription: "A sample homepage powered by Strapi with reusable sections and frontend-friendly APIs.",
      canonicalUrl: "https://conc.example/",
      noIndex: false,
      metaImage: null,
    },
    sections: [
      {
        type: "hero",
        id: 1,
        eyebrow: "Conc Website",
        title: "A flexible Strapi page builder for service-led websites",
        description: "Manage services, projects, news, and reusable landing-page sections from one editorial workflow.",
        primaryButtonText: "View Services",
        primaryButtonUrl: "/services",
        secondaryButtonText: "See Projects",
        secondaryButtonUrl: "/projects",
        backgroundImage: null,
      },
      {
        type: "services-list",
        id: 2,
        eyebrow: "Capabilities",
        title: "What we help teams ship",
        description: "A small set of focused services tied directly to the content model and frontend output.",
        limit: 3,
        viewAllText: "View all services",
        viewAllUrl: "/services",
        services,
      },
      {
        type: "projects-list",
        id: 3,
        eyebrow: "Selected Work",
        title: "Recent projects",
        description: "Structured case studies that can be reused across marketing pages and editorial content.",
        limit: 2,
        viewAllText: "Browse all projects",
        viewAllUrl: "/projects",
        projects,
      },
      {
        type: "stats",
        id: 4,
        eyebrow: "Impact",
        title: "Content operations made easier",
        description: "A cleaner schema gives editors a faster way to publish and maintain pages.",
        items: [
          { id: 1, value: "10", suffix: "+", label: "Reusable sections", description: "Page-builder blocks available to editors out of the box." },
          { id: 2, value: "3", suffix: null, label: "Core collections", description: "Services, projects, and news organized for easy reuse." },
          { id: 3, value: "1", suffix: null, label: "Single source", description: "One CMS model for homepage, landing pages, and editorial content." },
        ],
      },
      {
        type: "team",
        id: 5,
        eyebrow: "Team",
        title: "People behind the build",
        description: "A sample team section to help shape the frontend layout and admin workflow.",
        members: [
          {
            id: 1,
            name: "Sathorn",
            role: "Product Lead",
            bio: "Defines the content model and ensures the website structure supports the real editorial workflow.",
            linkedinUrl: "https://www.linkedin.com/",
            email: "sathorn@example.com",
            photo: null,
          },
          {
            id: 2,
            name: "Ariya",
            role: "Frontend Engineer",
            bio: "Builds the page renderer and integrates dynamic-zone content into the frontend experience.",
            linkedinUrl: "https://www.linkedin.com/",
            email: "ariya@example.com",
            photo: null,
          },
        ],
      },
      {
        type: "testimonial",
        id: 6,
        eyebrow: "Feedback",
        title: "What this setup enables",
        description: "Sample testimonials for frontend layout and editorial review.",
        items: [
          {
            id: 1,
            quote: "The new content model makes it much easier to launch pages without asking developers for every change.",
            authorName: "Editorial Team",
            authorRole: "Content Operations",
            authorCompany: "Conc Studio",
            authorAvatar: null,
          },
          {
            id: 2,
            quote: "Reusable sections keep the frontend clean and the admin experience predictable.",
            authorName: "Engineering Team",
            authorRole: "Frontend Development",
            authorCompany: "Conc Studio",
            authorAvatar: null,
          },
        ],
      },
      {
        type: "faq",
        id: 7,
        eyebrow: "FAQ",
        title: "Questions teams usually ask",
        description: "Starter answers for common implementation and editorial topics.",
        items: [
          {
            id: 1,
            question: "Can editors build multiple pages with the same sections?",
            answer: "<p>Yes. The page builder uses reusable component schemas so the same section types can be mixed per page.</p>",
          },
          {
            id: 2,
            question: "Can projects, services, and news be reused across sections?",
            answer: "<p>Yes. The list sections are relation-based, so editors can select existing entries instead of duplicating content.</p>",
          },
        ],
      },
      {
        type: "news-list",
        id: 8,
        eyebrow: "Updates",
        title: "Latest news",
        description: "Editorial content tied into the same CMS model as the marketing pages.",
        limit: 3,
        viewAllText: "Read all news",
        viewAllUrl: "/news",
        newsEntries,
      },
      {
        type: "gallery",
        id: 9,
        eyebrow: "Gallery",
        title: "Visual placeholders for layout testing",
        description: "Media can be added later in the admin; this section exists now so the frontend can support it.",
        layout: "grid",
        images: [],
      },
      {
        type: "call-to-action",
        id: 10,
        eyebrow: "Next Step",
        title: "Ready to connect the frontend to this content model?",
        description: "Use this sample CTA block to validate button styling, spacing, and route handling.",
        buttonText: "Contact Us",
        buttonUrl: "/contact",
        backgroundImage: null,
      },
    ],
  },
  about: {
    id: 2,
    slug: "about",
    title: "About",
    seo: {
      metaTitle: "About CONC",
      metaDescription: "Learn how CONC approaches content systems, service websites, and maintainable frontend delivery.",
      canonicalUrl: "https://conc.example/about",
      noIndex: false,
      metaImage: null,
    },
    sections: [
      {
        type: "hero",
        id: 11,
        eyebrow: "About CONC",
        title: "A service-led team focused on structured digital experiences",
        description: "We help organizations clarify their offer, structure their content, and ship websites that are easier to maintain.",
        primaryButtonText: "Contact Us",
        primaryButtonUrl: "/contact",
        secondaryButtonText: "See Projects",
        secondaryButtonUrl: "/projects",
        backgroundImage: null,
      },
      {
        type: "rich-text",
        id: 12,
        eyebrow: "Who We Are",
        title: "Built for editorial clarity and practical delivery",
        description: null,
        body: "<p>CONC works at the intersection of content strategy, information architecture, and frontend delivery. We focus on helping teams publish with less friction and keep their websites maintainable over time.</p><p>Our approach prioritizes reusable systems over one-off page builds so that marketing, editorial, and product teams can move faster together.</p>",
      },
      {
        type: "stats",
        id: 13,
        eyebrow: "What Matters",
        title: "A working model for smaller teams",
        description: "A concise set of operating principles to shape the about page layout.",
        items: [
          { id: 4, value: "1", suffix: null, label: "Shared content model", description: "One structure for pages, projects, and editorial content." },
          { id: 5, value: "3", suffix: null, label: "Core disciplines", description: "Strategy, content systems, and frontend implementation." },
          { id: 6, value: "100%", suffix: null, label: "Reusable sections", description: "Page sections designed to be mixed and reused across routes." },
        ],
      },
      {
        type: "call-to-action",
        id: 14,
        eyebrow: "Next Step",
        title: "Need a clearer content system for your website?",
        description: "Use this page as a reusable about-page reference and route users to contact.",
        buttonText: "Talk to CONC",
        buttonUrl: "/contact",
        backgroundImage: null,
      },
    ],
  },
  executive: buildInfoPage({
    id: 8,
    slug: "executive",
    title: "Executive",
    eyebrow: "About Us",
    metaTitle: "Executive | CONC",
    metaDescription: "Executive direction, stewardship, and institutional leadership context for CONC.",
    canonicalUrl: "https://conc.example/about/executive",
    intro:
      "CONC brings together academic credibility and market-facing experience to support executive development, strategic communication, and capability building across leadership teams.",
    sections: [
      {
        title: "Strategic Direction",
        body: "Executive oversight focuses on keeping consulting, coaching, and learning services aligned with institutional goals and the practical needs of partner organizations.",
      },
      {
        title: "Cross-Disciplinary Expertise",
        body: "The center operates with a mix of academic, advisory, and operational perspectives so programs can address leadership, communication, and transformation work in one place.",
      },
      {
        title: "Partnership Stewardship",
        body: "Leadership maintains relationships with university stakeholders, industry partners, and client organizations to ensure quality, continuity, and long-term relevance.",
      },
    ],
  }),
  philosophy: buildInfoPage({
    id: 9,
    slug: "philosophy",
    title: "Philosophy",
    eyebrow: "About Us",
    metaTitle: "Philosophy | CONC",
    metaDescription: "How CONC approaches practical learning, evidence-led work, and accountable organizational development.",
    canonicalUrl: "https://conc.example/about/philosophy",
    intro:
      "CONC works as a university-linked consulting and coaching center that values disciplined thinking, practical execution, and measurable development for leaders, teams, and organizations.",
    sections: [
      {
        title: "Learning Through Practice",
        body: "Programs are designed around real organizational challenges so participants can translate frameworks into decisions, communication, and delivery habits that hold up in actual work.",
      },
      {
        title: "Evidence Before Assumption",
        body: "We favor structured diagnosis, stakeholder listening, and clear success criteria before recommending interventions, content strategy, or executive coaching pathways.",
      },
      {
        title: "Growth With Accountability",
        body: "Coaching and consulting are paired with explicit outcomes, follow-through checkpoints, and operational clarity so development work does not stop at inspiration.",
      },
    ],
  }),
  facilities: buildInfoPage({
    id: 10,
    slug: "facilities",
    title: "Facilities",
    eyebrow: "About Us",
    metaTitle: "Facilities | CONC",
    metaDescription: "Training rooms, meeting space, and hybrid-ready facilities that support CONC programs and engagements.",
    canonicalUrl: "https://conc.example/about/facilities",
    intro:
      "The center supports workshops, coaching, and executive engagement with spaces and formats that can accommodate focused discussion, collaborative sessions, and hybrid delivery.",
    sections: [
      {
        title: "Training Rooms",
        body: "Configured for seminars, capability workshops, and intensive short-format programs with layouts that support both instruction and group work.",
      },
      {
        title: "Executive Meeting Space",
        body: "Used for coaching conversations, planning sessions, and partner consultations that require privacy, concentration, and a more formal setting.",
      },
      {
        title: "Hybrid Session Support",
        body: "Facilities can support blended participation models for organizations that need on-site facilitation combined with remote attendance and documentation workflows.",
      },
    ],
  }),
  contact: {
    id: 3,
    slug: "contact",
    title: "Contact",
    seo: {
      metaTitle: "Contact CONC",
      metaDescription: "Get in touch with CONC about content modeling, frontend delivery, and service website implementation.",
      canonicalUrl: "https://conc.example/contact",
      noIndex: false,
      metaImage: null,
    },
    sections: [
      {
        type: "hero",
        id: 15,
        eyebrow: "Contact",
        title: "Start with the problem you need to solve",
        description: "Reach out about content modeling, service websites, frontend implementation, or editorial workflows.",
        primaryButtonText: "Email Us",
        primaryButtonUrl: "mailto:hello@conc.example",
        secondaryButtonText: "Read About Us",
        secondaryButtonUrl: "/about",
        backgroundImage: null,
      },
      {
        type: "rich-text",
        id: 16,
        eyebrow: "Contact Details",
        title: "Ways to reach the team",
        description: null,
        body: "<p><strong>Email:</strong> hello@conc.example</p><p><strong>Phone:</strong> +66 2 000 0000</p><p><strong>Address:</strong> Bangkok, Thailand</p><p>Share your current setup, what is blocking the team, and what outcome you want from the next iteration of the site.</p>",
      },
      {
        type: "faq",
        id: 17,
        eyebrow: "Before We Start",
        title: "Useful questions to answer first",
        description: "This gives the contact page meaningful structure while testing reusable sections.",
        items: [
          {
            id: 3,
            question: "What should we send in the first message?",
            answer: "<p>Include your current website or content system, the main problem, and the timeline you are working against.</p>",
          },
          {
            id: 4,
            question: "Can this setup work for small teams?",
            answer: "<p>Yes. The model is intentionally lean so a small team can maintain it without a large editorial operation.</p>",
          },
        ],
      },
    ],
  },
  services: {
    id: 4,
    slug: "services",
    title: "Services",
    seo: {
      metaTitle: "Services | CONC",
      metaDescription: "Explore the sample service offering used across the CONC website content model.",
      canonicalUrl: "https://conc.example/services",
      noIndex: false,
      metaImage: null,
    },
    sections: [
      {
        type: "hero",
        id: 18,
        eyebrow: "Services",
        title: "A focused service set built to support content and delivery",
        description: "This sample services page mirrors the frontend list route and helps editors validate service cards, copy, and linking.",
        primaryButtonText: "View Projects",
        primaryButtonUrl: "/projects",
        secondaryButtonText: "Contact Us",
        secondaryButtonUrl: "/contact",
        backgroundImage: null,
      },
      {
        type: "services-list",
        id: 19,
        eyebrow: "Capabilities",
        title: "Published services",
        description: "Use this section to curate the service entries that should appear on the services landing page.",
        limit: 6,
        viewAllText: "All services",
        viewAllUrl: "/services",
        services,
      },
      {
        type: "call-to-action",
        id: 20,
        eyebrow: "Next Step",
        title: "Need help shaping a service-led website?",
        description: "Route visitors from the service listing into a conversation about structure, delivery, and CMS setup.",
        buttonText: "Talk to CONC",
        buttonUrl: "/contact",
        backgroundImage: null,
      },
    ],
  },
  projects: {
    id: 5,
    slug: "projects",
    title: "Projects",
    seo: {
      metaTitle: "Projects | CONC",
      metaDescription: "Review sample projects that show how CONC structures reusable content and frontend delivery.",
      canonicalUrl: "https://conc.example/projects",
      noIndex: false,
      metaImage: null,
    },
    sections: [
      {
        type: "hero",
        id: 21,
        eyebrow: "Projects",
        title: "Selected work built around reusable content systems",
        description: "This page gives editors a sample layout for project overviews while keeping the same content model used by the frontend.",
        primaryButtonText: "See Services",
        primaryButtonUrl: "/services",
        secondaryButtonText: "Read News",
        secondaryButtonUrl: "/news",
        backgroundImage: null,
      },
      {
        type: "projects-list",
        id: 22,
        eyebrow: "Case Studies",
        title: "Published projects",
        description: "Curate project entries for the main projects landing page or campaign-style showcase pages.",
        limit: 6,
        viewAllText: "All projects",
        viewAllUrl: "/projects",
        projects,
      },
      {
        type: "call-to-action",
        id: 23,
        eyebrow: "Start A Project",
        title: "Want a more maintainable delivery model?",
        description: "Use the project page template to move from examples into a concrete implementation conversation.",
        buttonText: "Contact Us",
        buttonUrl: "/contact",
        backgroundImage: null,
      },
    ],
  },
  "consulting-project": {
    id: 6,
    slug: "consulting-project",
    title: "Consulting Project",
    seo: {
      metaTitle: "Consulting Project | CONC",
      metaDescription: "Browse consulting projects and case references managed from the CONC backend.",
      canonicalUrl: "https://conc.example/services/consulting-project",
      noIndex: false,
      metaImage: null,
    },
    sections: [
      {
        type: "hero",
        id: 24,
        eyebrow: "Consulting Service",
        title: "Consulting Project",
        description:
          "Use this backend-managed page to curate consulting case studies, delivery references, and featured engagements directly from the project database.",
        primaryButtonText: "Browse All Projects",
        primaryButtonUrl: "/projects",
        secondaryButtonText: "Contact Us",
        secondaryButtonUrl: "/contact",
        backgroundImage: null,
      },
      {
        type: "projects-list",
        id: 25,
        eyebrow: "Project Database",
        title: "Selected consulting projects",
        description:
          "Editors can manage which consulting projects appear here by updating project records and curating this section from the Strapi page builder.",
        limit: 6,
        viewAllText: "All projects",
        viewAllUrl: "/projects",
        projects: consultingProjects.length > 0 ? consultingProjects : projects,
      },
      {
        type: "call-to-action",
        id: 26,
        eyebrow: "Next Step",
        title: "Need a consulting engagement shaped around a real delivery problem?",
        description:
          "Use this page to move from example projects into a scoped conversation about advisory support, implementation priorities, and team outcomes.",
        buttonText: "Talk To CONC",
        buttonUrl: "/contact",
        backgroundImage: null,
      },
    ],
  },
  news: {
    id: 6,
    slug: "news",
    title: "News",
    seo: {
      metaTitle: "News | CONC",
      metaDescription: "Sample editorial updates published from the same Strapi content system as the website pages.",
      canonicalUrl: "https://conc.example/news",
      noIndex: false,
      metaImage: null,
    },
    sections: [
      {
        type: "hero",
        id: 24,
        eyebrow: "News",
        title: "Editorial updates published from the same content system",
        description: "This sample archive page shows how news entries can be reused inside a page-builder route while still supporting detail pages.",
        primaryButtonText: "Browse Projects",
        primaryButtonUrl: "/projects",
        secondaryButtonText: "About CONC",
        secondaryButtonUrl: "/about",
        backgroundImage: null,
      },
      {
        type: "news-list",
        id: 25,
        eyebrow: "Latest Updates",
        title: "Published news entries",
        description: "Editors can reuse this section for a main archive, a homepage block, or a campaign landing page.",
        limit: 6,
        viewAllText: "All news",
        viewAllUrl: "/news",
        newsEntries,
      },
      {
        type: "call-to-action",
        id: 26,
        eyebrow: "Stay In Touch",
        title: "Want updates on content systems and delivery?",
        description: "Keep the archive connected to a clear next step instead of ending the user journey at the list.",
        buttonText: "Contact Us",
        buttonUrl: "/contact",
        backgroundImage: null,
      },
    ],
  },
  gallery: buildInfoPage({
    id: 29,
    slug: "gallery",
    title: "Gallery",
    eyebrow: "Gallery",
    metaTitle: "Gallery | CONC",
    metaDescription: "Browse all CONC gallery archives including activities, seminars, curriculum activity, and knowledge sharing videos.",
    canonicalUrl: "https://conc.example/gallery",
    intro:
      "This archive groups visual records and media from activities, past seminars, curriculum-based activity, and knowledge sharing videos in one place.",
    sections: [
      {
        title: "All Gallery",
        body: "Use this section as the main visual archive for all CONC gallery content, regardless of event type or learning format.",
      },
      {
        title: "Category Navigation",
        body: "Visitors can move from the full archive into more focused views for activities, past seminars, curriculum activities, and knowledge sharing video content.",
      },
      {
        title: "Editorial Reuse",
        body: "Each gallery entry can support promotion, documentation, and post-event knowledge sharing from the same backend workflow.",
      },
    ],
  }),
  "gallery-activities": buildInfoPage({
    id: 30,
    slug: "gallery-activities",
    title: "Gallery Activities",
    eyebrow: "Gallery",
    metaTitle: "Activities Gallery | CONC",
    metaDescription: "Activity gallery archive for workshops, faculty exchange, and participant engagement.",
    canonicalUrl: "https://conc.example/gallery/activities",
    intro:
      "This archive focuses on recent CONC activities including workshop delivery, faculty engagement, and participant interaction.",
    sections: [
      {
        title: "Activity Records",
        body: "Highlight ongoing activity across campus sessions, partner engagements, and short-format learning events.",
      },
    ],
  }),
  "gallery-past-seminar": buildInfoPage({
    id: 31,
    slug: "gallery-past-seminar",
    title: "Gallery Past Seminar",
    eyebrow: "Gallery",
    metaTitle: "Past Seminar Gallery | CONC",
    metaDescription: "Past seminar gallery archive covering speaker sessions and audience engagement.",
    canonicalUrl: "https://conc.example/gallery/past-seminar",
    intro:
      "This archive collects image-based records from past seminars, including speakers, audience participation, and program atmosphere.",
    sections: [
      {
        title: "Seminar Archive",
        body: "Use this space to document completed seminar sessions in a browsable visual archive.",
      },
    ],
  }),
  "gallery-past-curriculum-activities": buildInfoPage({
    id: 32,
    slug: "gallery-past-curriculum-activities",
    title: "Gallery Past Curriculum Activities",
    eyebrow: "Gallery",
    metaTitle: "Past Curriculum Activities Gallery | CONC",
    metaDescription: "Curriculum activity archive for in-class exercises and learning interaction.",
    canonicalUrl: "https://conc.example/gallery/past-curriculum-activities",
    intro:
      "This archive highlights program exercises, curriculum delivery, and workshop interaction captured during previous cohorts.",
    sections: [
      {
        title: "Curriculum Activity Archive",
        body: "Document facilitator-led work, breakout activity, and participant collaboration in a category dedicated to program delivery.",
      },
    ],
  }),
  "gallery-knowledge-sharing-videos": buildInfoPage({
    id: 33,
    slug: "gallery-knowledge-sharing-videos",
    title: "Gallery Knowledge Sharing Videos",
    eyebrow: "Gallery",
    metaTitle: "Knowledge Sharing Videos | CONC",
    metaDescription: "Video archive for recorded knowledge sharing sessions and reusable learning references.",
    canonicalUrl: "https://conc.example/gallery/knowledge-sharing-videos",
    intro:
      "This archive focuses on recorded knowledge sharing content that can be revisited between live sessions and programs.",
    sections: [
      {
        title: "Recorded Sessions",
        body: "Use this category for replayable knowledge sharing sessions that extend learning beyond live delivery.",
      },
    ],
  }),
  programs: {
    id: 7,
    slug: "programs",
    title: "Programs",
    seo: {
      metaTitle: "Programs | CONC",
      metaDescription: "Browse sample training programs and registration-ready offerings managed in Strapi.",
      canonicalUrl: "https://conc.example/programs",
      noIndex: false,
      metaImage: null,
    },
    sections: [
      {
        type: "hero",
        id: 27,
        eyebrow: "CONC Programs",
        title: "Applied training programs for teams that need sharper digital execution",
        description: "Browse sample CONC learning tracks built around content operations, headless implementation, and communication clarity. Each program is designed to move from theory into decisions, tools, and practical team workflows.",
        primaryButtonText: "Explore Programs",
        primaryButtonUrl: "#upcoming-cohorts",
        secondaryButtonText: "Ask About Custom Training",
        secondaryButtonUrl: "/contact",
        backgroundImage: null,
      },
      {
        type: "stats",
        id: 30,
        eyebrow: "Why These Programs Work",
        title: "Short format, practical outputs, and clear next steps",
        description: "The sample catalog is structured to help editors present programs as concrete working sessions instead of generic course descriptions.",
        items: [
          {
            value: "3",
            suffix: "",
            label: "Sample tracks",
            description: "Content ops, headless CMS implementation, and executive communication formats ready for listing pages.",
          },
          {
            value: "1",
            suffix: " team",
            label: "Shared workflow",
            description: "Each program is framed around what a team can align on and implement together after the session.",
          },
          {
            value: "90",
            suffix: " days",
            label: "Implementation horizon",
            description: "The sample copy points participants toward concrete rollout decisions after the training rather than ending at the workshop.",
          },
        ],
      },
      {
        type: "programs-list",
        id: 28,
        eyebrow: "Upcoming Cohorts",
        title: "Current and sample-ready training offers",
        description: "Use this listing block to surface active cohorts, show what each program is for, and route visitors into either direct registration or a custom training conversation.",
        limit: 6,
        viewAllText: "All programs",
        viewAllUrl: "/programs",
        programs,
      },
      {
        type: "call-to-action",
        id: 29,
        eyebrow: "Custom Training",
        title: "Need an in-house version shaped around your team?",
        description: "CONC can turn these public program outlines into a private cohort, leadership session, or working workshop aligned to your current delivery challenges.",
        buttonText: "Talk To CONC",
        buttonUrl: "/contact",
        backgroundImage: null,
      },
    ],
  },
  "announcement": buildInfoPage({
    id: 11,
    slug: "announcement",
    title: "Announcement",
    eyebrow: "News & Events",
    metaTitle: "Announcement | CONC",
    metaDescription: "Official announcements, notices, and program updates published from the CONC backend.",
    canonicalUrl: "https://conc.example/announcement",
    intro:
      "This page can be used for official announcements, public notices, registration windows, and important updates related to CONC activities and programs.",
    sections: [
      {
        title: "Public Notices",
        body: "Announcements can cover opening and closing dates, participation requirements, venue updates, and service information that visitors should see quickly.",
      },
      {
        title: "Program Updates",
        body: "Use this section for schedule changes, new opportunities, speaker confirmations, or any update that directly affects participants and partners.",
      },
      {
        title: "Institutional Communication",
        body: "The page can also support formal communication from the center when information needs to remain visible outside the standard news feed format.",
      },
    ],
  }),
  "event-calendar": buildInfoPage({
    id: 12,
    slug: "event-calendar",
    title: "Event Calendar",
    eyebrow: "News & Events",
    metaTitle: "Event Calendar | CONC",
    metaDescription: "Upcoming dates, sessions, and planning milestones for CONC events and activities.",
    canonicalUrl: "https://conc.example/event-calendar",
    intro:
      "The event calendar can present upcoming public sessions, forums, workshops, and special activities in a single reference point for visitors and participants.",
    sections: [
      {
        title: "Upcoming Dates",
        body: "Use this space to show scheduled events, registration periods, and milestone dates so visitors can plan participation with minimal friction.",
      },
      {
        title: "Program Timing",
        body: "Calendar entries can clarify duration, delivery format, and whether each activity is public, invitation-only, or partner-specific.",
      },
      {
        title: "Planning Reference",
        body: "A visible event calendar helps organizations and participants coordinate attendance, staffing, and follow-up preparation more effectively.",
      },
    ],
  }),
  "event-programs": buildInfoPage({
    id: 13,
    slug: "event-programs",
    title: "Event Programs",
    eyebrow: "News & Events",
    metaTitle: "Event Programs | CONC",
    metaDescription: "Special event programs, speaker sessions, and themed series managed in the CONC backend.",
    canonicalUrl: "https://conc.example/event-programs",
    intro:
      "This page can summarize special event programs, speaker sessions, themed series, and public-facing activities beyond the standard consulting and learning catalog.",
    sections: [
      {
        title: "Special Sessions",
        body: "Event programs may include keynote talks, invited expert sessions, thematic panels, and short-format learning experiences built for broader audiences.",
      },
      {
        title: "Series Design",
        body: "When activities are part of a recurring series, this page can show the structure, themes, and progression across multiple sessions or cohorts.",
      },
      {
        title: "Participation Details",
        body: "Program descriptions can make expectations clear by outlining audience fit, format, and any registration or attendance requirements.",
      },
    ],
  }),
  "life-long-learning": buildInfoPage({
    id: 14,
    slug: "life-long-learning",
    title: "Life Long Learning",
    eyebrow: "Life Long Learning",
    metaTitle: "Life Long Learning | CONC",
    metaDescription: "Continuing-learning formats, forums, and knowledge-sharing experiences from CONC.",
    canonicalUrl: "https://conc.example/life-long-learning",
    intro:
      "CONC extends learning beyond single programs through recurring forums, knowledge-sharing formats, and observation-based experiences that help participants keep developing over time.",
    sections: [
      {
        title: "Forum-Based Exchange",
        body: "Public and partner forums create space for leaders, faculty, and professionals to examine emerging issues through structured discussion and applied reflection.",
      },
      {
        title: "Knowledge Resources",
        body: "Learning is reinforced through curated content, practical insights, and follow-on materials that participants can use after formal sessions end.",
      },
      {
        title: "Observation and Practice",
        body: "Selected formats allow participants to learn by observing instruction, facilitation, and decision-making processes in realistic academic and professional settings.",
      },
    ],
  }),
  "conc-thammasat-forum": buildInfoPage({
    id: 15,
    slug: "conc-thammasat-forum",
    title: "CONC Thammasat Forum",
    eyebrow: "Life Long Learning",
    metaTitle: "CONC Thammasat Forum | CONC",
    metaDescription: "Cross-sector forum content for current management, communication, and organizational topics.",
    canonicalUrl: "https://conc.example/life-long-learning/conc-thammasat-forum",
    intro:
      "The CONC Thammasat Forum convenes leaders, experts, and participants around current management, communication, and organizational topics that benefit from cross-sector discussion.",
    sections: [
      {
        title: "Current Issues",
        body: "Forum sessions focus on timely questions in leadership, transformation, communication, and strategic execution so participants can compare ideas against current realities.",
      },
      {
        title: "Cross-Sector Dialogue",
        body: "The format encourages exchange between academic, public, and private-sector perspectives to sharpen judgment and reveal practical constraints.",
      },
      {
        title: "Continuing Engagement",
        body: "Each forum acts as a continuing-learning touchpoint that extends relationships beyond one-off courses and supports long-term professional development.",
      },
    ],
  }),
  "past-conc-thammasat-forum": buildInfoPage({
    id: 16,
    slug: "past-conc-thammasat-forum",
    title: "Past CONC Thammasat Forum",
    eyebrow: "Life Long Learning",
    metaTitle: "Past CONC Thammasat Forum | CONC",
    metaDescription: "Archived forum themes, speakers, and continuing-education topics from previous CONC sessions.",
    canonicalUrl: "https://conc.example/life-long-learning/past-conc-thammasat-forum",
    intro:
      "Past forum sessions can be archived here to document themes, speakers, and discussion topics that have shaped the center's continuing-education activity.",
    sections: [
      {
        title: "Session Archive",
        body: "This section can present previous forum topics, dates, and thematic summaries so visitors can understand the scope and continuity of the initiative.",
      },
      {
        title: "Speaker Highlights",
        body: "Past contributors may be highlighted to show the range of expertise and institutional voices involved in forum conversations.",
      },
      {
        title: "Learning Themes",
        body: "Archived sessions can also reveal recurring concerns across leadership, communication, and capability development over time.",
      },
    ],
  }),
  "conc-knowledge": buildInfoPage({
    id: 17,
    slug: "conc-knowledge",
    title: "CONC Knowledge",
    eyebrow: "Life Long Learning",
    metaTitle: "CONC Knowledge | CONC",
    metaDescription: "Knowledge resources, frameworks, and practical references for continuing learning.",
    canonicalUrl: "https://conc.example/life-long-learning/conc-knowledge",
    intro:
      "CONC Knowledge organizes practical insight, academic perspective, and working tools into a format that can support ongoing learning between programs and engagements.",
    sections: [
      {
        title: "Applied Articles",
        body: "Short-form knowledge pieces can translate academic ideas and field experience into practical guidance for leaders, teams, and partner organizations.",
      },
      {
        title: "Frameworks and Tools",
        body: "Resources may include planning models, communication structures, and workshop artifacts that help users apply ideas more consistently in real work.",
      },
      {
        title: "Shared Reference Base",
        body: "A visible knowledge archive strengthens continuity across forums, training programs, and consulting work by giving participants a common reference point.",
      },
    ],
  }),
  "class-observation": buildInfoPage({
    id: 18,
    slug: "class-observation",
    title: "Class Observation",
    eyebrow: "Life Long Learning",
    metaTitle: "Class Observation | CONC",
    metaDescription: "Observation-based learning focused on teaching, facilitation, and applied reflection.",
    canonicalUrl: "https://conc.example/life-long-learning/class-observation",
    intro:
      "Class observation creates learning value by allowing participants to watch teaching, facilitation, and discussion design in action, then reflect on what makes those formats effective.",
    sections: [
      {
        title: "Observe Practice in Context",
        body: "Participants can study how instructors frame problems, guide discussion, and manage participation instead of learning those techniques only in abstract form.",
      },
      {
        title: "Reflection After Observation",
        body: "Observation works best when paired with structured debriefs that clarify what was intentional, what constraints were present, and what can be adapted elsewhere.",
      },
      {
        title: "Transfer to Professional Use",
        body: "The format helps leaders, facilitators, and educators bring stronger design choices into their own classrooms, workshops, and organizational learning settings.",
      },
    ],
  }),
  "service-field": buildInfoPage({
    id: 19,
    slug: "service-field",
    title: "Service Field",
    eyebrow: "Consulting Service",
    metaTitle: "Service Field | CONC",
    metaDescription: "Consulting work across strategy, capability, communication, and implementation design.",
    canonicalUrl: "https://conc.example/services/service-field",
    intro:
      "CONC supports consulting work across strategy, organizational capability, communication, and implementation design with an emphasis on practical decisions and structured delivery.",
    sections: [
      {
        title: "Strategic Communication",
        body: "We help teams clarify positioning, executive messaging, and stakeholder communication structures that can support business, academic, and institutional goals.",
      },
      {
        title: "Capability Development",
        body: "Programs combine consulting and learning design to strengthen leadership practice, team operating rhythms, and project execution across changing environments.",
      },
      {
        title: "Transformation Support",
        body: "The center advises on service design, content operations, and implementation planning so organizations can move from abstract goals to workable operating models.",
      },
    ],
  }),
  "case-method-learning": buildInfoPage({
    id: 20,
    slug: "case-method-learning",
    title: "Case Method Learning",
    eyebrow: "Consulting Service",
    metaTitle: "Case Method Learning | CONC",
    metaDescription: "Case-based learning content for executive development, facilitation, and applied judgment.",
    canonicalUrl: "https://conc.example/services/case-method-learning",
    intro:
      "Case-based learning is used to connect strategic analysis with managerial judgment, giving participants a disciplined way to evaluate tradeoffs, context, and execution choices.",
    sections: [
      {
        title: "Decision-Focused Discussion",
        body: "Sessions are structured around realistic decision points so participants practice diagnosing constraints, comparing options, and defending a course of action.",
      },
      {
        title: "Applied Reflection",
        body: "Case work is paired with facilitated reflection to help teams connect lessons from discussion back to their own operating realities and leadership behaviors.",
      },
      {
        title: "Executive and Team Formats",
        body: "The method can be adapted for executive briefings, management programs, and team-based workshops where judgment quality matters as much as technical skill.",
      },
    ],
  }),
  "client-list": buildInfoPage({
    id: 21,
    slug: "client-list",
    title: "Client List",
    eyebrow: "Consulting Service",
    metaTitle: "Client List | CONC",
    metaDescription: "Example client categories and partnership contexts supported by CONC.",
    canonicalUrl: "https://conc.example/services/client-list",
    intro:
      "CONC works with organizations that need a combination of advisory support, executive development, and applied learning formats. Public examples can be listed here as institutional approval allows.",
    sections: [
      {
        title: "Public Sector",
        body: "Engagements may include leadership capability development, communication design, and advisory support for programs that require stakeholder alignment and structured delivery.",
      },
      {
        title: "Private Sector",
        body: "The center can support business teams with executive workshops, service strategy, and implementation-oriented consulting for communication and organizational effectiveness.",
      },
      {
        title: "Academic and Institutional Partners",
        body: "Partnerships may extend across universities, learning organizations, and mission-driven institutions that benefit from academic rigor combined with practical facilitation.",
      },
    ],
  }),
  "past-project": buildInfoPage({
    id: 22,
    slug: "past-project",
    title: "Past Project",
    eyebrow: "Consulting Service",
    metaTitle: "Past Project | CONC",
    metaDescription: "Selected consulting, coaching, and learning initiatives from previous CONC engagements.",
    canonicalUrl: "https://conc.example/services/past-project",
    intro:
      "Selected past projects can be summarized here to show the range of consulting, coaching, and learning initiatives delivered by the center.",
    sections: [
      {
        title: "Leadership Programs",
        body: "Past work may include executive learning series, coaching engagements, and cross-functional workshops designed to improve leadership communication and decision quality.",
      },
      {
        title: "Consulting Initiatives",
        body: "Projects can span service design, communication frameworks, organizational capability planning, and implementation roadmaps tailored to partner needs.",
      },
      {
        title: "Integrated Delivery",
        body: "Many engagements combine advisory work, facilitation, and follow-through support so recommendations are translated into usable tools, routines, and next-step actions.",
      },
    ],
  }),
  "privacy-policy": buildInfoPage({
    id: 23,
    slug: "privacy-policy",
    title: "Privacy Policy",
    eyebrow: "About Us",
    metaTitle: "Privacy Policy | CONC",
    metaDescription: "How CONC handles registration, inquiry, and website operation data.",
    canonicalUrl: "https://conc.example/privacy-policy",
    intro:
      "This website collects only the information required to respond to inquiries, process program registrations, and maintain reliable site operations. Personal data is handled with reasonable safeguards and limited to legitimate operational use.",
    sections: [
      {
        title: "Information We Collect",
        body: "Information submitted through contact and registration forms may include names, email addresses, phone numbers, organizational details, and any message content provided by the user.",
      },
      {
        title: "How Information Is Used",
        body: "Submitted information is used to respond to requests, evaluate registration eligibility, coordinate services, and maintain records necessary for program delivery and follow-up communication.",
      },
      {
        title: "Retention and Access",
        body: "Information is retained only as long as needed for operational, academic, or compliance purposes. Access is limited to personnel and authorized collaborators who require it to perform their duties.",
      },
    ],
  }),
  sitemap: buildInfoPage({
    id: 24,
    slug: "sitemap",
    title: "Sitemap",
    eyebrow: "About Us",
    metaTitle: "Sitemap | CONC",
    metaDescription: "A quick reference to the public website structure and key content areas.",
    canonicalUrl: "https://conc.example/sitemap",
    intro: "A quick reference for the main public sections of the CONC website.",
    sections: [
      {
        title: "Main Pages",
        body: "Home, About, Services, Programs, Projects, News, and Contact provide the primary public navigation experience across the site.",
      },
      {
        title: "About Us",
        body: "Philosophy, Executive, Facilities, Sitemap, and Privacy Policy are grouped under About Us for institutional information and public reference material.",
      },
      {
        title: "Program and Content Detail Pages",
        body: "The site also includes generated detail pages for individual services, programs, projects, news articles, and program registration flows.",
      },
    ],
  }),
  "customized-training": buildInfoPage({
    id: 25,
    slug: "customized-training",
    title: "Customized Training",
    eyebrow: "Training Service",
    metaTitle: "Customized Training | CONC",
    metaDescription: "In-house and partner-specific training programs designed around organizational needs.",
    canonicalUrl: "https://conc.example/training-service/customized-training",
    intro:
      "This page can be used to describe in-house or partner-specific training programs designed around an organization's goals, participant profile, and delivery constraints.",
    sections: [
      {
        title: "Needs-Based Design",
        body: "Customized training can be scoped from specific business challenges, capability gaps, or leadership objectives instead of forcing teams into a fixed public curriculum.",
      },
      {
        title: "Flexible Delivery",
        body: "Programs may be delivered on campus, on site, or in blended format with timing, activities, and facilitation adjusted to the audience and operating context.",
      },
      {
        title: "Coordination Process",
        body: "This page can outline how clients submit a brief, define outcomes, and coordinate content, speakers, scheduling, and participant support with the CONC team.",
      },
    ],
  }),
  "e-documents": buildInfoPage({
    id: 26,
    slug: "e-documents",
    title: "E-Documents",
    eyebrow: "Training Service",
    metaTitle: "E-Documents | CONC",
    metaDescription: "Downloadable forms, schedules, and operational documents for training workflows.",
    canonicalUrl: "https://conc.example/training-service/e-documents",
    intro:
      "This page can centralize downloadable forms, registration materials, invoices, schedules, and participant documents required across training workflows.",
    sections: [
      {
        title: "Registration Documents",
        body: "Forms, requirement lists, and supporting documents for enrollment can be organized here so participants have one clear source of truth.",
      },
      {
        title: "Operational References",
        body: "The section can also include payment instructions, attendance policies, training schedules, and post-program reference materials.",
      },
      {
        title: "Version Control",
        body: "Publishing documents in one place makes it easier to keep the latest approved versions visible and reduce confusion caused by outdated files.",
      },
    ],
  }),
  "come-teach-with-us": buildInfoPage({
    id: 27,
    slug: "come-teach-with-us",
    title: "Come teach with us",
    eyebrow: "Training Service",
    metaTitle: "Come teach with us | CONC",
    metaDescription: "Instructor collaboration information for open-enrollment and customized training programs.",
    canonicalUrl: "https://conc.example/training-service/come-teach-with-us",
    intro:
      "This page can invite instructors, facilitators, and subject-matter experts to collaborate with CONC on open-enrollment or customized training programs.",
    sections: [
      {
        title: "Instructor Profile",
        body: "Potential teaching partners can review the center's focus areas, participant audiences, and delivery formats before proposing a topic or teaching role.",
      },
      {
        title: "Submission Guidelines",
        body: "The page can explain what information to submit, such as teaching background, expertise, sample topics, preferred formats, and availability.",
      },
      {
        title: "Collaboration Path",
        body: "A clear process for screening, curriculum alignment, and scheduling helps external instructors understand how to move from interest to confirmed delivery.",
      },
    ],
  }),
  "upload-your-pay-in-slip": buildInfoPage({
    id: 28,
    slug: "upload-your-pay-in-slip",
    title: "Upload your pay-in-slip",
    eyebrow: "Training Service",
    metaTitle: "Upload your pay-in-slip | CONC",
    metaDescription: "Payment confirmation submission content for finance and registration workflows.",
    canonicalUrl: "https://conc.example/training-service/upload-your-pay-in-slip",
    intro:
      "This page can be used to collect payment confirmation files from participants after registration so finance and operations teams can verify enrollment efficiently.",
    sections: [
      {
        title: "Accepted Submission Details",
        body: "Participants can be instructed on the required file format, reference number, program name, and contact details needed for payment matching.",
      },
      {
        title: "Verification Workflow",
        body: "The upload step can support a clear handoff from participant payment to internal review, confirmation, and final registration approval.",
      },
      {
        title: "Support and Follow-up",
        body: "This page can also clarify expected verification time and where participants should contact the team if a payment cannot be matched immediately.",
      },
    ],
  }),
};

export const fallbackContent = {
  siteSetting,
  pages,
  services,
  projects,
  programs,
  newsEntries,
  knowledgeArticles,
  galleryEntries,
  projectList: projects.map<ProjectListItem>(({ id, title, slug, summary, clientName, completedDate, featured, showOnConsultingProject, order }) => ({
    id,
    title,
    slug,
    summary,
    clientName,
    completedDate,
    featured,
    showOnConsultingProject,
    order,
  })),
  newsList: newsEntries.map<NewsListItem>(({ id, title, slug, content, publishedDate }) => ({
    id,
    title,
    slug,
    content,
    publishedDate,
  })),
  knowledgeArticleList: knowledgeArticles.map<KnowledgeArticleListItem>(
    ({ id, title, slug, summary, content, category, publishedDate, featured, order }) => ({
      id,
      title,
      slug,
      summary,
      content,
      category,
      publishedDate,
      featured,
      order,
    }),
  ),
};
