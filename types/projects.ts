export interface Project {
    id: string;
    title: string;
    description: string;
    date: string;
    gifUrl?:string;
    githubUrl?: string;
    visitUrl?: string;
    competitionUrl?: string;
    responsibility?: string;
    difficulties?: string;
    solution?: string;
    imageUrl: string;
    gallery?: string[];
    isComingSoon?: boolean;
    categories: string[];
    technologies: string[];
  }

export interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  key?: string | number;
}