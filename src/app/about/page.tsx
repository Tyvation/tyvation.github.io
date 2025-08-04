'use client';

import { useLocale } from "@/contexts/LocaleContext";
import { parseMarkdown } from "@/lib/markdown";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export default function About() {
    const { t } = useLocale();
    
    return (
        <div className="flex-auto py-8 px-10 h-128 liquid-glass border rounded-2xl text-foreground bg-red-400">
            <h1 className="text-3xl font-bold">{t("about.greeting")}</h1>
            <p className="py-4">
                {parseMarkdown(t("about.description"))}
                <br />
                {parseMarkdown(t("about.portfolio"))}
            </p>
            <div className="flex space-x-2 bg-green-400 text-accent">
                <a href="https://github.com/tyvation/" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="size-10"></FaGithub>
                </a>
                <a href="https://www.instagram.com/lixiaowei89/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="size-10"></FaInstagram>
                </a>
                <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
                    <FaSquareXTwitter className="size-10"></FaSquareXTwitter>
                </a>
                <a href="https://www.linkedin.com/in/mr-hat-067087342/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="size-10"></FaLinkedin>
                </a>
            </div>
        </div>
    );
}