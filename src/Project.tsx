import { Component, createEffect, createSignal, For, Show } from 'solid-js';
import { FaSolidX, FaSolidArrowRight, FaSolidArrowLeft } from "solid-icons/fa";
import MarkdownIt from 'markdown-it';
import dog from './assets/dog.jpg';
import { listProjects, getProject, IProjectMetadata, IProject } from './utils/project';

const md = new MarkdownIt();


const Project: Component = () => {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [projectList, setProjectList] = createSignal([] as IProjectMetadata[]);
  const [selectedProject, setSelectedProject] = createSignal(null as IProject | null)

  createEffect(async () => {
    const projects = await listProjects();
    setProjectList(projects);
  });

  const selectNextProject = () => {
    const project = selectedProject();
    if (!project)
      return;
    const currentIndex = projectList().findIndex(p => p.id === project.metadata.id);
    selectProject(currentIndex + 1);
  }

  const selectPreviousProject = () => {
    const project = selectedProject();
    if (!project)
      return;
    const currentIndex = projectList().findIndex(p => p.id === project.metadata.id);
    selectProject(currentIndex - 1);
  }

  const selectProject = async (index: number) => {
    const url = projectList()[index]?.url;
    if (!url)
      return;
    const data = await getProject(url);
    if (!data)
      return;
    setSelectedProject(data);
    setCurrentIndex(index);
  }

  const deselectProject = (e: MouseEvent) => {
    const modal = document.querySelector('#modal');
    if (modal && e.composedPath().includes(modal))
      return;
    setSelectedProject(null);
  }

  return (
    <div class="mx-auto">
      <Show when={selectedProject()}>
        <div class="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black opacity-90"></div>
        <div
          class="absolute flex justify-center items-center w-screen h-screen left-0 top-0"
          onclick={deselectProject}
        >
          <div
            id="modal" 
            class="flex"
          >
            <img class="max-w-[764px] h-[764px] object-contain bg-black" src={dog} />
            <div class="w-[500px] bg-white">
              <header>
                <h1>{selectedProject()?.metadata.name}</h1>
              </header>
              <div innerHTML={md.render(selectedProject()?.content as string)}></div>
            </div>
          </div>
        </div>
        <button
          class="absolute top-[24px] right-[24px] bg-white rounded-full cursor-pointer p-2"
          onclick={deselectProject}
        >
          <FaSolidX />
        </button>
        <Show when={currentIndex() !== projectList().length - 1}>
          <button
            id="prev-button"
            class="absolute right-[24px] top-1/2 translate-y-1/2  bg-white rounded-full p-2 cursor-pointer z-50"
            onclick={selectNextProject}
          >
            <FaSolidArrowRight />
          </button>
        </Show>
        <Show when={currentIndex() !== 0}>
          <button
            id="next-button"
            class="absolute left-[24px] top-1/2 translate-y-1/2 bg-white rounded-full p-2 cursor-pointer z-50"
            onclick={selectPreviousProject}
          >
            <FaSolidArrowLeft />
          </button>
        </Show>
      </Show>
      <div class="text-[18px] leading-[24px] font-bold mt-[16px] mb-[24px] px-[20px]">Projects</div>
      <div class="px-[20px] w-[935px] grid grid-cols-3 gap-[28px]">
        <For each={projectList()}>{(project, i) =>
          <img class="h-[293px] w-[293px] object-cover cursor-pointer"
            src={project.media[0]}
            onclick={() => selectProject(i())}
          />
        }</For>
      </div>
    </div >
  );
};

export default Project;
