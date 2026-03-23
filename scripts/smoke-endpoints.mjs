const configuredBaseUrl = process.env.PUBLIC_STRAPI_URL || "http://127.0.0.1:1338/api";
const baseUrl = configuredBaseUrl.replace(/\/+$/, "");

const checks = [
  { name: "home", path: "/pages/home", type: "object" },
  { name: "about", path: "/pages/by-slug/about", type: "object" },
  { name: "contact", path: "/pages/by-slug/contact", type: "object" },
  { name: "site-setting", path: "/site-setting/global", type: "object" },
  { name: "services-list", path: "/services?sort[0]=order:asc&sort[1]=name:asc", type: "array" },
  { name: "service-detail", path: "/services/by-slug/web-design", type: "object" },
  { name: "projects-list", path: "/projects?sort[0]=order:asc&sort[1]=completedDate:desc", type: "array" },
  { name: "project-detail", path: "/projects/by-slug/conc-website-relaunch", type: "object" },
  { name: "programs-list", path: "/programs?sort[0]=dateLabel:asc&sort[1]=title:asc", type: "array" },
  { name: "program-detail", path: "/programs/by-slug/strategic-content-operations-bootcamp", type: "object" },
  { name: "news-list", path: "/news?sort[0]=publishedDate:desc&sort[1]=createdAt:desc", type: "array" },
  { name: "news-detail", path: "/news/by-slug/project-spotlight-headless-content-for-a-service-brand", type: "object" },
];

const closedProgramSlug = "executive-communication-design-for-digital-teams";

function describeData(data) {
  if (Array.isArray(data)) {
    return `array(${data.length})`;
  }

  if (data && typeof data === "object") {
    const keys = Object.keys(data).slice(0, 5).join(", ");
    return `object(${keys || "no-keys"})`;
  }

  return typeof data;
}

async function fetchCheck(check) {
  const response = await fetch(`${baseUrl}${check.path}`);
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${text.slice(0, 200)}`);
  }

  let payload;

  try {
    payload = JSON.parse(text);
  } catch (error) {
    throw new Error(`invalid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }

  const data = payload?.data;
  const isExpectedType =
    check.type === "array"
      ? Array.isArray(data)
      : Boolean(data) && !Array.isArray(data) && typeof data === "object";

  if (!isExpectedType) {
    throw new Error(`unexpected data shape: ${describeData(data)}`);
  }

  return describeData(data);
}

async function assertClosedProgramRegistration() {
  const detailResponse = await fetch(`${baseUrl}/programs/by-slug/${closedProgramSlug}`);
  const detailPayload = await detailResponse.json().catch(() => null);
  const detailData = detailPayload?.data;

  if (!detailResponse.ok || !detailData || typeof detailData !== "object") {
    throw new Error("closed program detail is unavailable");
  }

  if (detailData.registrationEnabled !== false) {
    throw new Error("closed program detail did not expose registrationEnabled=false");
  }

  const registrationPayload = {
    data: {
      programSlug: closedProgramSlug,
      fullName: "Smoke Test",
      email: "smoke.closed@example.com",
      phone: "0800000000",
      organization: "Smoke Test Org",
      goal: "Verify closed registration handling",
      consent: true,
    },
  };

  const registrationResponse = await fetch(`${baseUrl}/program-registrations/public`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registrationPayload),
  });

  const registrationText = await registrationResponse.text();
  const registrationJson = JSON.parse(registrationText || "{}");
  const message =
    registrationJson?.error?.message ||
    registrationJson?.message ||
    registrationText ||
    "unknown registration error";

  if (registrationResponse.ok) {
    throw new Error("closed program registration unexpectedly succeeded");
  }

  if (!String(message).includes("Registration is closed")) {
    throw new Error(`unexpected closed registration error: ${message}`);
  }

  return "registration rejected";
}

console.log(`Smoke testing Strapi endpoints against ${baseUrl}`);

let failed = false;

for (const check of checks) {
  try {
    const shape = await fetchCheck(check);
    console.log(`PASS ${check.name}: ${shape}`);
  } catch (error) {
    failed = true;
    console.error(`FAIL ${check.name}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

try {
  const result = await assertClosedProgramRegistration();
  console.log(`PASS closed-program-registration: ${result}`);
} catch (error) {
  failed = true;
  console.error(`FAIL closed-program-registration: ${error instanceof Error ? error.message : String(error)}`);
}

if (failed) {
  process.exit(1);
}
