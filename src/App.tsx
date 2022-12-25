import { Route, Routes, A } from '@solidjs/router';
import { Component, createSignal, For } from 'solid-js';
import { FaSolidDiagramProject, FaSolidHouseChimney, FaSolidUserNinja } from "solid-icons/fa";
import Home from './Home';
import Project from './Project';

const App: Component = () => {  
  const [links] = createSignal([
    // { name: 'home', href: '/', icon: FaSolidHouseChimney },
    // { name: 'about', href: '/about', icon: FaSolidUserNinja },
    { name: 'projects', href: '/', icon: FaSolidDiagramProject },
  ]);

  return (
    <div class="flex h-full relative">
      <div class="flex flex-col w-[245px] px-[12px] border-black-200 border-r-[1px]">
        <div class="py-[30px] px-[12px] text-[29px]">
          Jonathan Earl
        </div>
        <nav class="flex flex-col gap-2">
          <For each={links()}>{(link) =>
            <A class="flex capitalize p-[12px] my-[8px]" href={link.href}>
              <link.icon class="mr-[16px]" size={24} />
              <span class="leading-[24px] text-[16px]">{link.name}</span>
            </A>
          }</For>
        </nav>
      </div>
      <Routes>
        {/* <Route path="/" component={Home} /> */}
        {/* <Route path="/about" element={<div>This site was made with Solid</div>} /> */}
        <Route path="/" component={Project} />
      </Routes>
    </div>
  );
};

export default App;