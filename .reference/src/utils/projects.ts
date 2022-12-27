import { K8S_METADATA } from '../assets/projects/k8s/metadata';
import { PORTFOLIO_METADATA } from '../assets/projects/portfolio/metadata';

export const listProjects = async () => {
	const projects = [PORTFOLIO_METADATA, K8S_METADATA];
	return projects;
};
