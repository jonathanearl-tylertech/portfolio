import { renderMarkdown } from './markdown';
import { parseYaml } from './yaml';

export interface IProject {
  metadata: IProjectMetadata;
  content: string;
}

export interface IProjectMetadata {
  name: string;
  index: number;
  published: string;
  url: string;
  tags: string[];
  media: string[];
}

export interface IProjectList {
  projects: IProjectMetadata[]
}

export const listProjects = async () => {
  const res = await fetch('/src/assets/projects/projectlist.yaml');
  const data = await res.text();
  const list: IProjectList = parseYaml(data);
  console.log(list);
  const projectList = list.projects
    .sort((a, b) => (Date.parse(a.published) - Date.parse(b.published)))
  console.log(projectList);
  return projectList;
}

export const getProject = async (projectUrl: string) => {
  if (!projectUrl)
    return null;
  const res = await fetch(`${projectUrl}`);
  const data = await res.text();
  const headerData = data.split('---')[1];
  const mdData = data.split('---')[2];
  const md = renderMarkdown(mdData);
  const metadata: IProjectMetadata = parseYaml(headerData);
  const content: string = renderMarkdown(mdData);
  return {
    metadata,
    content
  } as IProject
}
