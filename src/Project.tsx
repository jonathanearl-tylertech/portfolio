import { A } from '@solidjs/router';
import { Component, createSignal, For, Show } from 'solid-js';
import dog from './assets/dog.jpg';
import { FaSolidX, FaSolidArrowRight, FaSolidArrowLeft } from "solid-icons/fa";

// import Porfolio from './projects/Porfolio.mdx';

const Project: Component = () => {
  const [projects] = createSignal([
    { name: 'portfolio1', tags: ['terraform', 'javascript', 'front-end'], image: dog, },
    { name: 'portfolio2', tags: ['terraform', 'javascript', 'front-end'], image: dog, },
    { name: 'portfolio3', tags: ['terraform', 'javascript', 'front-end'], image: dog, },
  ]);
  const [count] = createSignal([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [selectedProject, setSelectedProject] = createSignal(0)
  const [show, setShow] = createSignal(false);

  return (
    <div class="mx-auto">
      <Show when={show()}>
        <div class="absolute flex justify-center items-center w-screen h-screen left-0 top-0 bg-black opacity-90"></div>
        <div class="absolute flex justify-center items-center w-screen h-screen left-0 top-0" onclick={() => setShow(false)}>
          <div class="flex opacity-100">
            <img class="max-w-[764px] h-[764px] object-contain bg-black" src={projects()[selectedProject()].image} />
            <div class="w-[500px] bg-white">
              <header>
                <h1>{projects()[selectedProject()].name}</h1>
              </header>
            </div>
          </div>
        </div>
        <div class="absolute flex justify-center items-center w-screen h-screen left-0 top-0  ">
          <button
            class="absolute right-[24px] top-[24px] bg-white rounded-full cursor-pointer p-2"
            onclick={() => setShow(false)}
          >
            <FaSolidX />
          </button>
          <button
            class="absolute right-[24px] bg-white rounded-full p-2 cursor-pointer z-50"
            onclick={(e) => { e.preventDefault(); setSelectedProject((selectedProject() + 1) % 3) }}
          >
            <FaSolidArrowRight />
          </button>
          <button
            class="absolute left-[24px] bg-white rounded-full p-2 cursor-pointer z-50"
            onclick={() => setSelectedProject((selectedProject() + 3 - 1) % 3)}
          >
            <FaSolidArrowLeft />
          </button>
        </div>
      </Show>
      <div class="text-[18px] leading-[24px] font-bold mt-[16px] mb-[24px] px-[20px]">Projects</div>
      <div class="px-[20px] w-[935px] grid grid-cols-3 gap-[28px]">
        <For each={count()}>{(i) =>
          <img src={projects()[i % 3].image} onclick={() => {
            setSelectedProject(i % 3);
            setShow(true);
          }} />
        }</For>
      </div>
    </div >
  );
};

export default Project;
