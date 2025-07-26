/* eslint-disable react/no-unescaped-entities */
import XLogo from "/public/icons/x-logo.svg";
import Insta from "/public/icons/instagram-logo.svg";
export default function About(){
    return (
        <div className="py-4 space-y-4 bg-background">
            <h1 className="text-3xl font-bold text-foreground">Hi, I'm Tyvation 👋</h1>
            <p className="text-foreground">
            I'm a web developer who loves minimal design and building beautiful things on the web. 
            This is my portfolio built with Next.js 15 and Tailwind CSS.
            </p>
            <div className="flex space-x-4">
                <XLogo className="text-foreground text-4xl transform-colors duration-500"/>
                <Insta className="text-foreground text-4xl transform-colors duration-500"/>
            </div>
        </div>
    );
}