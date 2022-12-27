import { parse } from 'yaml';

export const parseYaml = (yaml: string) => {
	return parse(yaml);
};
