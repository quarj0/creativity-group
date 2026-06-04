export type Program = {
  id?: number;
  icon: string;
  title: string;
  description: string;
  color: string;
};

export type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  team: string;
  year: string;
  image: string;
  accent: string;
};

export type Event = {
  id: number;
  date: string;
  title: string;
  type: string;
  location: string;
  description: string;
  spots: string;
  accent: string;
};

type BackendListResponse<T> = T[] | { results?: T[] };
type BackendFormResponse = {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
};

const DEFAULT_BACKEND_URL = "http://127.0.0.1:8000";
const FORM_TIMEOUT_MS = 10000;

function getBackendBaseUrl() {
  const url =
    process.env.BACKEND_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "production" ? "" : DEFAULT_BACKEND_URL);

  if (!url) {
    throw new Error("BACKEND_API_URL is required in production.");
  }

  return url.replace(/\/$/, "");
}

function backendUrl(path: string) {
  return `${getBackendBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

function unpackList<T>(payload: BackendListResponse<T>): T[] {
  if (Array.isArray(payload)) return payload;
  return Array.isArray(payload.results) ? payload.results : [];
}

async function fetchBackendList<T>(path: string): Promise<T[]> {
  const response = await fetch(backendUrl(path), {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status}`);
  }

  return unpackList((await response.json()) as BackendListResponse<T>);
}

async function fetchBackendDetail<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(backendUrl(path), { next: { revalidate: 300 } });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try { return await fetchBackendList<Project>("/api/projects/"); } catch { return []; }
}

export async function getProject(id: number): Promise<Project | null> {
  return fetchBackendDetail<Project>(`/api/projects/${id}/`);
}

export async function getAllEvents(): Promise<Event[]> {
  try { return await fetchBackendList<Event>("/api/events/"); } catch { return []; }
}

export async function getEvent(id: number): Promise<Event | null> {
  return fetchBackendDetail<Event>(`/api/events/${id}/`);
}

export async function getHomepageData() {
  const [programs, projects, events] = await Promise.allSettled([
    fetchBackendList<Program>("/api/programs/"),
    fetchBackendList<Project>("/api/projects/?featured=true"),
    fetchBackendList<Event>("/api/events/"),
  ]);

  return {
    programs: programs.status === "fulfilled" ? programs.value : [],
    projects: projects.status === "fulfilled" ? projects.value : [],
    events: events.status === "fulfilled" ? events.value : [],
  };
}

export async function forwardBackendPost(path: string, payload: unknown) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FORM_TIMEOUT_MS);

  try {
    const response = await fetch(backendUrl(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });

    const data = (await response
      .json()
      .catch(() => ({}))) as BackendFormResponse;
    return Response.json(
      {
        success: response.ok && data.success !== false,
        message:
          typeof data.message === "string"
            ? data.message
            : response.ok
              ? "Submitted successfully."
              : "Submission failed. Please try again.",
        ...data,
      },
      { status: response.status },
    );
  } catch {
    return Response.json(
      {
        success: false,
        message: "Service unavailable right now. Please try again shortly.",
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
