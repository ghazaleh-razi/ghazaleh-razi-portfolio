export type PublishedProject = {
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  featured: boolean;
};

// FlowOps, PulseBoard, and NexusDesk are planned, not completed work samples.
// Add an entry only when the implementation and its case-study route exist.
export const publishedProjects: readonly PublishedProject[] = [];
