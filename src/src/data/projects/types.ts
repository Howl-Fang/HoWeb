export interface Project {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  tags: string[];
  image?: string;
  link?: string;
  github?: string;
  demo?: string;
}
