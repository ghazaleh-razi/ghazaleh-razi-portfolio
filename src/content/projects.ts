export type PublishedProject = {
  slug: string;
  name: string;
  subtitle: string;
  summary: string;
  featured: boolean;
};

export type PlannedProject = {
  name: string;
  direction: string;
};

export const plannedProjects: readonly PlannedProject[] = [
  { name: "FlowOps", direction: "Enterprise workflow and operations" },
  { name: "PulseBoard", direction: "Real-time analytics and monitoring" },
  { name: "NexusDesk", direction: "Modular project and team management" },
];

// FlowOps, PulseBoard, and NexusDesk are planned, not completed work samples.
// Add an entry only when the implementation and its case-study route exist.
export const publishedProjects: readonly PublishedProject[] = [];
