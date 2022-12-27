import { Component, createEffect, createSignal, For, Show, onCleanup } from 'solid-js';
import { FaSolidX, FaSolidArrowRight, FaSolidArrowLeft } from "solid-icons/fa";
import { listProjects } from './utils/projects';
import Comments from './Comments';
import { IProject } from './interfaces/projects';

const Project: Component = () => {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [projectList, setProjectList] = createSignal([] as IProject[]);
  const [projectContent, setProjectContent] = createSignal(null as string | null)

  createEffect(async () => {
    const projects = await listProjects();
    setProjectList(projects);
    document.addEventListener('keyup', handleKeyUp);
  });

  onCleanup(async () => {
    document.removeEventListener('keyup', handleKeyUp)
  });

  const selectNextProject = () => {
    const project = projectContent();
    if (!project)
      return;
    selectProject(currentIndex() + 1);
  }

  const selectPreviousProject = () => {
    const project = projectContent();
    if (!project)
      return;
    selectProject(currentIndex() - 1);
  }

  const selectProject = async (index: number) => {
    const project = projectList()[index];
    if (!project)
      return;
    setProjectContent(project.content);
    setCurrentIndex(index);
  }

  const handleClickOff = (e: MouseEvent) => {
    const modal = document.querySelector('#modal');
    if (modal && e.composedPath().includes(modal))
      return;
    setProjectContent(null);
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (!projectContent())
      return;
    switch(e.key) {
      case 'ArrowLeft':
        selectPreviousProject();
        break;
      case 'ArrowRight':
        selectNextProject();
        break;
      case 'Escape':
        setProjectContent(null);
        break;
    }
  }

  return (
    <div class="mx-auto">
      <Show when={projectContent()}>
        <div class="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black opacity-90"></div>
        <div
          class="absolute flex justify-center items-center w-screen h-screen left-0 top-0"
          onclick={handleClickOff}
        >
          <div
            id="modal" 
            class="flex"
          >
            <div 
              class="markdown-body p-[24px] max-w-[764px] h-[764px]"
              innerHTML={projectContent() as string}
            />
            <div class="w-[500px] bg-white border-l-[1px]">
              <Comments />
            </div>
          </div>
        </div>
        <button
          class="absolute top-[24px] right-[24px] bg-white rounded-full cursor-pointer p-2"
          onclick={handleClickOff}
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
      <Show when={projectList()}>
        <div class="text-[18px] leading-[24px] font-bold mt-[16px] mb-[24px] px-[20px]">Projects</div>
        <div class="px-[20px] w-[935px] grid grid-cols-3 gap-[28px]">
          <For each={projectList()}>{(project, i) =>
            <img class="h-[293px] w-[293px] object-cover cursor-pointer"
              src={project.media}
              onclick={() => selectProject(i())}
            />
          }</For>
        </div>
      </Show>
    </div >
  );
};

export default Project;
