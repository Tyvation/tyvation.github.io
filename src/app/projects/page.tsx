"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
    image: "/images/zz.png",
    link: "https://your-invest-site.com",
  },
];

export default function ProjectSlider() {
  return (
    <div className="py-4">
      <div className="w-full max-w-4xl mx-auto rounded-3xl bg-transparent overflow-hidden transition">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 1,
          }}
          autoplay={{ delay: 55551000 }}
          spaceBetween={10}
          slidesPerView={1}
        >
          {projects.map((project, index) => (//
            <SwiperSlide key={index}>
              <div className="relative h-[400px] rounded-3xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-5 z-10 bg-foreground">
                  <h2 className="text-xl font-bold mb-1 text-background bg-transparent">{project.title}</h2>
                  <p className="text-neutral-400 mb-4 bg-transparent">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 text-white font-semibold bg-primary hover:bg-primary-hover hover:scale-105 rounded-2xl transition"
                  >
                    查看專案
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
