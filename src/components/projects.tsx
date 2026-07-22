import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 border-t border-border"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
        <SectionHeading
          eyebrow="Featured projects"
          id="projects-heading"
          title="Things I'm building and experimenting with"
          description="Side projects exploring history, games, recommendations, and the edges of AI-assisted product ideas."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
