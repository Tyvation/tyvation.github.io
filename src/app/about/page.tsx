/* eslint-disable react/no-unescaped-entities */
import XLogo from "/public/icons/x-logo.svg";
import Insta from "/public/icons/instagram-logo.svg";
export default function About(){
    return (
        <div className="py-8 space-y-4 liquid-glass rounded-2xl mx-2 text-foreground">
            <div className="mx-8">   
                <h1 className="text-3xl font-bold">Hi, I'm Tyvation 👋</h1>
                <p className="py-4">
                    I'm a
                    <span className="text-accent transform-colors duration-500"> Computer Science</span> and 
                    <span className="text-accent transform-colors duration-500"> Information Engineering</span> Student, 
                    who loves minimal design and building beautiful things on the web. <br></br>
                    This is my portfolio built with Next.js 15 and Tailwind CSS. 
                </p>
                <div className="flex space-x-4">
                    <XLogo className="text-accent text-4xl transform-colors duration-500"/>
                    <Insta className="text-accent text-4xl transform-colors duration-500"/>
                </div>
            </div>
            
        </div>
    );
}