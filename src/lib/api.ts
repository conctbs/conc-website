import { fallbackContent } from "./fallback-content";

const STRAPI_BASE_URL = import.meta.env.PUBLIC_STRAPI_URL ?? "http://127.0.0.1:1338/api";
const STRAPI_ORIGIN = STRAPI_BASE_URL.replace(/\/api\/?$/, "");
export const BACKEND_DISABLED = import.meta.env.PUBLIC_DISABLE_BACKEND === "true";
export const MEMBER_PORTAL_DISABLED =
  BACKEND_DISABLED || import.meta.env.PUBLIC_DISABLE_MEMBER_PORTAL === "true";
const FALLBACK_LOG_TTL_MS = 15_000;
const fallbackLogTimestamps = new Map<string, number>();
// Keep local dev usable with fallback content when Strapi is offline,
// but preserve strict failures for build/CI when explicitly enabled.
const STRAPI_STRICT_MODE =
  !BACKEND_DISABLED && import.meta.env.STRAPI_STRICT_MODE === "true" && !import.meta.env.DEV;

function isSandboxNetworkError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const record = error as { cause?: unknown };
  const cause =
    record.cause && typeof record.cause === "object" ? (record.cause as { code?: unknown }) : null;

  return cause?.code === "EPERM";
}

function getErrorCode(error: unknown) {
  if (!error || typeof error !== "object") {
    return null;
  }

  const record = error as { code?: unknown; cause?: unknown };
  if (typeof record.code === "string") {
    return record.code;
  }

  if (record.cause && typeof record.cause === "object") {
    const nestedCode = (record.cause as { code?: unknown }).code;
    return typeof nestedCode === "string" ? nestedCode : null;
  }

  return null;
}

function getFallbackLogKey(path: string, error: unknown) {
  return `${path}:${getErrorCode(error) ?? "unknown"}`;
}

function shouldLogFallback(path: string, error: unknown) {
  const key = getFallbackLogKey(path, error);
  const now = Date.now();
  const lastLoggedAt = fallbackLogTimestamps.get(key) ?? 0;

  if (now - lastLoggedAt < FALLBACK_LOG_TTL_MS) {
    return false;
  }

  fallbackLogTimestamps.set(key, now);
  return true;
}

function formatFallbackReason(error: unknown) {
  const code = getErrorCode(error);
  if (code === "ECONNREFUSED") {
    return `connection refused at ${STRAPI_BASE_URL}`;
  }

  if (code === "EPERM") {
    return `network access blocked for ${STRAPI_BASE_URL}`;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "unknown error";
}

function logFallback(path: string, error: unknown) {
  if (!import.meta.env.DEV || !shouldLogFallback(path, error)) {
    return;
  }

  console.warn(
    `[api] Falling back for ${path} because Strapi is unavailable: ${formatFallbackReason(error)}`,
  );
}

export type Media = {
  id: number | null;
  url: string | null;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  mime: string | null;
} | null;

export type Seo = {
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
  metaImage: Media;
} | null;

export type ProgramSpeaker = {
  id: number | null;
  name: string | null;
  role: string | null;
  organization: string | null;
  bio: string | null;
  photo: Media;
};

export type ProgramAgendaItem = {
  id: number | null;
  timeLabel: string | null;
  title: string | null;
  description: string | null;
  speakerName: string | null;
};

export type Service = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  order: number | null;
  seo?: Seo;
  icon: Media;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  clientName: string | null;
  completedDate: string | null;
  featured: boolean;
  order: number | null;
  seo: Seo;
  coverImage: Media;
  gallery: Media[];
  services: Service[];
};

export type ProjectListItem = {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  clientName: string | null;
  completedDate: string | null;
  featured: boolean;
  order: number | null;
};

export type NewsListItem = {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  publishedDate: string | null;
};

export type Program = {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  format: string | null;
  dateLabel: string | null;
  startsAt: string | null;
  duration: string | null;
  location: string | null;
  fee: string | null;
  audience: string | null;
  summary: string | null;
  tagline: string | null;
  overview: string[];
  outcomes: string[];
  seats: number | null;
  registrationEnabled: boolean;
  isForumEvent: boolean;
  forumSeriesLabel: string | null;
  registrationNote: string | null;
  coverImage: Media;
  gallery: Media[];
  speakers: ProgramSpeaker[];
  agendaItems: ProgramAgendaItem[];
  seo: Seo;
};

export type NewsEntry = {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  publishedDate: string | null;
  seo: Seo;
  coverImage: Media;
};

type Section =
  | {
      type: "hero";
      id: number;
      eyebrow: string | null;
      title: string | null;
      description: string | null;
      primaryButtonText: string | null;
      primaryButtonUrl: string | null;
      secondaryButtonText: string | null;
      secondaryButtonUrl: string | null;
      backgroundImage: Media;
    }
  | {
      type: "services-list";
      id: number;
      eyebrow: string | null;
      title: string | null;
      description: string | null;
      limit: number | null;
      viewAllText: string | null;
      viewAllUrl: string | null;
      services: Service[];
    }
  | {
      type: "projects-list";
      id: number;
      eyebrow: string | null;
      title: string | null;
      description: string | null;
      limit: number | null;
      viewAllText: string | null;
      viewAllUrl: string | null;
      projects: Project[];
    }
  | {
      type: "stats";
      id: number;
      eyebrow: string | null;
      title: string | null;
      description: string | null;
      items: Array<{
        id: number;
        value: string | null;
        suffix: string | null;
        label: string | null;
        description: string | null;
      }>;
    }
  | {
      type: "team";
      id: number;
      eyebrow: string | null;
      title: string | null;
      description: string | null;
      members: Array<{
        id: number;
        name: string | null;
        role: string | null;
        bio: string | null;
        linkedinUrl: string | null;
        email: string | null;
        photo: Media;
      }>;
    }
  | {
      type: "testimonial";
      id: number;
      eyebrow: string | null;
      title: string | null;
      description: string | null;
      items: Array<{
        id: number;
        quote: string | null;
        authorName: string | null;
        authorRole: string | null;
        authorCompany: string | null;
        authorAvatar: Media;
      }>;
    }
  | {
      type: "faq";
      id: number;
      eyebrow: string | null;
      title: string | null;
      description: string | null;
      items: Array<{
        id: number;
        question: string | null;
        answer: string | null;
      }>;
    }
  | {
      type: "news-list";
      id: number;
      eyebrow: string | null;
      title: string | null;
      description: string | null;
      limit: number | null;
      viewAllText: string | null;
      viewAllUrl: string | null;
      newsEntries: NewsEntry[];
    }
  | {
      type: "programs-list";
      id: number;
      eyebrow: string | null;
      title: string | null;
      description: string | null;
      limit: number | null;
      viewAllText: string | null;
      viewAllUrl: string | null;
      programs: Program[];
    }
  | {
      type: "gallery";
      id: number;
      eyebrow: string | null;
      title: string | null;
      description: string | null;
      layout: string | null;
      images: Media[];
    }
  | {
      type: "call-to-action";
      id: number;
      eyebrow: string | null;
      title: string | null;
      description: string | null;
      buttonText: string | null;
      buttonUrl: string | null;
      backgroundImage: Media;
    }
  | {
      type: "rich-text";
      id: number;
      eyebrow: string | null;
      title: string | null;
      description: string | null;
      body: string | null;
    };

export type PageDto = {
  id: number;
  slug: string;
  title: string;
  seo: Seo;
  sections: Section[];
};

export type SiteSettingDto = {
  id: number;
  siteName: string | null;
  siteDescription: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  paymentBankName: string | null;
  paymentAccountName: string | null;
  paymentAccountNumber: string | null;
  paymentPromptpayId: string | null;
  paymentInstructions: string | null;
  paymentScbQrEnabled: boolean;
  paymentScbQrInstructions: string | null;
  paymentScbQrPayloadTemplate: string | null;
  paymentScbQrImageUrlTemplate: string | null;
  address: string | null;
  facebookUrl: string | null;
  lineUrl: string | null;
  youtubeUrl: string | null;
  copyrightText: string | null;
  logo: Media;
};

function resolveMediaUrl(url: string | null | undefined) {
  if (!url) {
    return null;
  }

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${STRAPI_ORIGIN}${url}`;
  }

  return `${STRAPI_ORIGIN}/${url}`;
}

function normalizeMedia(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeMedia(item));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const record = value as Record<string, unknown>;
  const normalized = Object.fromEntries(
    Object.entries(record).map(([key, item]) => [key, normalizeMedia(item)]),
  );

  if ("url" in normalized && ("mime" in normalized || "width" in normalized || "height" in normalized)) {
    return {
      ...normalized,
      url: resolveMediaUrl(typeof normalized.url === "string" ? normalized.url : null),
    };
  }

  return normalized;
}

function parseProgramTimestamp(program: Pick<Program, "startsAt" | "dateLabel">) {
  if (program.startsAt) {
    const timestamp = Date.parse(program.startsAt);
    if (!Number.isNaN(timestamp)) {
      return timestamp;
    }
  }

  if (!program.dateLabel) {
    return Number.MAX_SAFE_INTEGER;
  }

  const match = program.dateLabel.match(/(\d{1,2})(?:\s*-\s*\d{1,2})?\s+([A-Za-z]+)\s+(\d{4})/);
  if (!match) {
    return Number.MAX_SAFE_INTEGER;
  }

  const [, day, month, year] = match;
  const timestamp = Date.parse(`${day} ${month} ${year}`);
  return Number.isNaN(timestamp) ? Number.MAX_SAFE_INTEGER : timestamp;
}

function getFallbackJson<T>(path: string): T | null {
  if (path === "/pages/home") {
    return fallbackContent.pages.home as T;
  }

  if (path.startsWith("/pages/by-slug/")) {
    const slug = path.slice("/pages/by-slug/".length);
    return (fallbackContent.pages[slug] ?? null) as T | null;
  }

  if (path === "/site-setting/global") {
    return fallbackContent.siteSetting as T;
  }

  if (path.startsWith("/programs/by-slug/")) {
    const slug = path.slice("/programs/by-slug/".length);
    return (fallbackContent.programs.find((program) => program.slug === slug) ?? null) as T | null;
  }

  if (path.startsWith("/services/by-slug/")) {
    const slug = path.slice("/services/by-slug/".length);
    return (fallbackContent.services.find((service) => service.slug === slug) ?? null) as T | null;
  }

  if (path.startsWith("/projects/by-slug/")) {
    const slug = path.slice("/projects/by-slug/".length);
    return (fallbackContent.projects.find((project) => project.slug === slug) ?? null) as T | null;
  }

  if (path.startsWith("/news/by-slug/")) {
    const slug = path.slice("/news/by-slug/".length);
    return (fallbackContent.newsEntries.find((entry) => entry.slug === slug) ?? null) as T | null;
  }

  return null;
}

function getFallbackCollection<T>(path: string): T[] {
  if (path.startsWith("/programs")) {
    return [...fallbackContent.programs] as T[];
  }

  if (path.startsWith("/services")) {
    return [...fallbackContent.services] as T[];
  }

  if (path.startsWith("/projects")) {
    return [...fallbackContent.projectList] as T[];
  }

  if (path.startsWith("/news")) {
    return [...fallbackContent.newsList] as T[];
  }

  return [];
}

async function fetchJson<T>(path: string): Promise<T | null> {
  if (BACKEND_DISABLED) {
    return getFallbackJson<T>(path);
  }

  try {
    const response = await fetch(`${STRAPI_BASE_URL}${path}`);

    if (!response.ok) {
      if (STRAPI_STRICT_MODE) {
        throw new Error(`Strapi request failed for ${path}: ${response.status} ${response.statusText}`);
      }
      return getFallbackJson<T>(path);
    }

    const json = await response.json();
    return normalizeMedia(json.data ?? null) as T | null;
  } catch (error) {
    if (STRAPI_STRICT_MODE && !isSandboxNetworkError(error)) {
      throw error;
    }
    logFallback(path, error);
    return getFallbackJson<T>(path);
  }
}

async function fetchCollection<T>(path: string): Promise<T[]> {
  if (BACKEND_DISABLED) {
    return getFallbackCollection<T>(path);
  }

  try {
    const response = await fetch(`${STRAPI_BASE_URL}${path}`);

    if (!response.ok) {
      if (STRAPI_STRICT_MODE) {
        throw new Error(`Strapi collection request failed for ${path}: ${response.status} ${response.statusText}`);
      }
      return getFallbackCollection<T>(path);
    }

    const json = await response.json();
    return Array.isArray(json.data) ? (normalizeMedia(json.data) as T[]) : [];
  } catch (error) {
    if (STRAPI_STRICT_MODE && !isSandboxNetworkError(error)) {
      throw error;
    }
    logFallback(path, error);
    return getFallbackCollection<T>(path);
  }
}

function extractSlug(entry: Record<string, unknown>): string | null {
  const directSlug = typeof entry.slug === "string" ? entry.slug : null;
  if (directSlug) {
    return directSlug;
  }

  const attributes = entry.attributes;
  if (attributes && typeof attributes === "object" && "slug" in attributes) {
    const nestedSlug = (attributes as { slug?: unknown }).slug;
    return typeof nestedSlug === "string" ? nestedSlug : null;
  }

  return null;
}

async function getCollectionSlugs(collection: "services" | "projects" | "news" | "programs"): Promise<string[]> {
  const entries = await fetchCollection<Record<string, unknown>>(
    `/${collection}?fields[0]=slug&pagination[pageSize]=100&sort[0]=slug:asc`,
  );

  const slugs = entries
    .map((entry) => extractSlug(entry))
    .filter((slug): slug is string => Boolean(slug));

  if (slugs.length > 0) {
    return slugs;
  }

  return getFallbackCollection<Record<string, unknown>>(`/${collection}`)
    .map((entry) => extractSlug(entry))
    .filter((slug): slug is string => Boolean(slug));
}

export async function getHomePage(): Promise<PageDto | null> {
  return fetchJson<PageDto>("/pages/home");
}

export async function getPageBySlug(slug: string): Promise<PageDto | null> {
  return fetchJson<PageDto>(`/pages/by-slug/${slug}`);
}

export async function getSiteSetting(): Promise<SiteSettingDto | null> {
  return fetchJson<SiteSettingDto>("/site-setting/global");
}

export async function getPrograms(): Promise<Program[]> {
  const programs = await fetchCollection<Program>("/programs?sort[0]=title:asc");
  return programs
    .filter((program) => !program.isForumEvent)
    .sort((left, right) => {
    const dateDiff = parseProgramTimestamp(left) - parseProgramTimestamp(right);
    if (dateDiff !== 0) {
      return dateDiff;
    }

    return left.title.localeCompare(right.title);
    });
}

export async function getForumPrograms(): Promise<Program[]> {
  const programs = await fetchCollection<Program>("/programs/forum");
  return programs.sort((left, right) => {
    const dateDiff = parseProgramTimestamp(left) - parseProgramTimestamp(right);
    if (dateDiff !== 0) {
      return dateDiff;
    }

    return left.title.localeCompare(right.title);
  });
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  return fetchJson<Program>(`/programs/by-slug/${slug}`);
}

export async function getServices(): Promise<Service[]> {
  return fetchCollection<Service>("/services?sort[0]=order:asc&sort[1]=name:asc");
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return fetchJson<Service>(`/services/by-slug/${slug}`);
}

export async function getProjects(): Promise<ProjectListItem[]> {
  return fetchCollection<ProjectListItem>("/projects?sort[0]=order:asc&sort[1]=completedDate:desc");
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return fetchJson<Project>(`/projects/by-slug/${slug}`);
}

export async function getNews(): Promise<NewsListItem[]> {
  return fetchCollection<NewsListItem>("/news?sort[0]=publishedDate:desc&sort[1]=createdAt:desc");
}

export async function getNewsBySlug(slug: string): Promise<NewsEntry | null> {
  return fetchJson<NewsEntry>(`/news/by-slug/${slug}`);
}

export async function getProgramSlugs(): Promise<string[]> {
  const [programs, forumPrograms] = await Promise.all([
    fetchCollection<Record<string, unknown>>("/programs?fields[0]=slug&pagination[pageSize]=100&sort[0]=slug:asc"),
    fetchCollection<Record<string, unknown>>("/programs/forum?fields[0]=slug&pagination[pageSize]=100&sort[0]=slug:asc"),
  ]);

  const slugs = [...programs, ...forumPrograms]
    .map((entry) => extractSlug(entry))
    .filter((slug): slug is string => Boolean(slug));

  if (slugs.length > 0) {
    return [...new Set(slugs)].sort((left, right) => left.localeCompare(right));
  }

  return getFallbackCollection<Record<string, unknown>>(`/programs`)
    .map((entry) => extractSlug(entry))
    .filter((slug): slug is string => Boolean(slug));
}

export async function getServiceSlugs(): Promise<string[]> {
  return getCollectionSlugs("services");
}

export async function getProjectSlugs(): Promise<string[]> {
  return getCollectionSlugs("projects");
}

export async function getNewsSlugs(): Promise<string[]> {
  return getCollectionSlugs("news");
}
