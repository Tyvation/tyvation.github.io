"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const projects = [
  {
    title: "AI 寵物辨識系統",
    description: "使用 TensorFlow 與 Flutter 製作的智慧寵物辨識平台。",
    image: "/images/ww.jpg",
    link: "https://github.com/your-project1",
  },
  {
    title: "魔法魂系遊戲",
    description: "用 Unreal Engine 製作的魂系奇幻 RPG。",
    image: "/images/xx.jpg",
    link: "https://yourgame.com",
  },
  {
    title: "個人投資助手",
    description: "幫助你追蹤台股與美股的個人投資儀表板。",
    image: "/images/zz.jpg",
    link: "https://your-invest-site.com",
  },
];

export default function ProjectSlider() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 51111000 }}
        spaceBetween={10}
        slidesPerView={1}
      >
        {projects.map((project, index) => (//  
          <SwiperSlide key={index}>
            <div className="relative h-[400px] bg-black rounded-3xl overflow-hidden"> 
              <Image 
                src={project.image} 
                alt={project.title} 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-35% from-black to-50%">
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5 z-10 ">
                <h2 className="text-xl font-bold mb-1">{project.title}</h2>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                >
                  查看專案
                </a> 
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
