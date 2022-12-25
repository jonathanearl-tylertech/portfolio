import { Component, createEffect, createResource, createSignal, For, Show } from 'solid-js';
import { FaSolidX, FaSolidArrowRight, FaSolidArrowLeft } from "solid-icons/fa";
import MarkdownIt from 'markdown-it';
import dog from './assets/dog.jpg';
import { listProjects, getProject, IProjectMetadata, IProject } from './utils/project';

const md = new MarkdownIt();


const Project: Component = () => {
  // const [selectedProject, setSelectedProject] = createSignal(0)
  const [projectList, setProjectList] = createSignal([] as IProjectMetadata[]);
  const [selectedProject, setSelectedProject] = createSignal(null as IProject | null)

  createEffect(async () => {
    const projects = await listProjects();
    setProjectList(projects);
  });

  const selectNextProject = (project: IProject | null) => {
    console.log('project', project);
    if (!project)
      return;
    selectProject(project.metadata.index + 1);
  }

  const selectPreviousProject = (project: IProject | null) => {
    if (!project)
      return;
    selectProject(project.metadata.index - 1);
  }

  const selectProject = async (index: number) => {
    console.log('next', index)
    const url = projectList()[index]?.url;
    if (!url)
      return;
    const data = await getProject(url);
    console.log({data});
    if (!data)
      return;
    setSelectedProject(data);
  }

  const deselectProject = () => {
    setSelectedProject(null);
  }

  return (
    <div class="mx-auto">
      <Show when={selectedProject()}>
        <div class="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black opacity-90"></div>
        <div class="absolute flex justify-center items-center w-screen h-screen left-0 top-0" onclick={deselectProject}>
          <div class="flex opacity-100">
            <img class="max-w-[764px] h-[764px] object-contain bg-black" src={dog} />
            <div class="w-[500px] bg-white">
              <header>
                <h1>{selectedProject()?.metadata.name}</h1>
              </header>
              <div innerHTML={md.render(selectedProject()?.content as string)}></div>
            </div>
          </div>
        </div>
        <div class="absolute flex justify-center items-center w-screen h-screen left-0 top-0  ">
          <button
            class="absolute right-[24px] top-[24px] bg-white rounded-full cursor-pointer p-2"
            onclick={deselectProject}
          >
            <FaSolidX />
          </button>
          <button
            class="absolute right-[24px] bg-white rounded-full p-2 cursor-pointer z-50"
            onclick={(e) => { 
              e.preventDefault(); 
              console.log(selectedProject());
              selectNextProject(selectedProject())
            }}
          >
            <FaSolidArrowRight />
          </button>
          <button
            class="absolute left-[24px] bg-white rounded-full p-2 cursor-pointer z-50"
            onclick={() => {
              console.log(selectedProject());
              selectPreviousProject(selectedProject())
            }}
          >
            <FaSolidArrowLeft />
          </button>
        </div>
      </Show>
      <div class="text-[18px] leading-[24px] font-bold mt-[16px] mb-[24px] px-[20px]">Projects</div>
      <div class="px-[20px] w-[935px] grid grid-cols-3 gap-[28px]">
        <For each={projectList()}>{(project) =>
          <img class="h-[293px] w-[293px] object-cover" 
            src={project.media[0]} 
            onclick={() => selectProject(project.index)} 
          />
        }</For>
      </div>
    </div >
  );
};

export default Project;
