import type { PageServerLoad } from "./$types";
import fs from 'node:fs/promises';
const folderPath = `${process.cwd()}/src/lib/markdown/`;
const files = await fs.readdir(folderPath);
console.log({files});

export const load: PageServerLoad = async () => {

}
