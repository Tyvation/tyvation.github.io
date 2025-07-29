export default function About() {
    return (
        <div className="py-8 space-y-4 liquid-glass border rounded-2xl mx-2 text-foreground">
            <div className="mx-8">   
                <h1 className="text-3xl font-bold">Hi, I&apos;m Tyvation 👋</h1>
                <p className="py-4">
                    I&apos;m a
                    <span className="text-accent transition-colors duration-500"> Computer Science</span> and 
                    <span className="text-accent transition-colors duration-500"> Information Engineering</span> Student, 
                    who loves minimal design and building beautiful things on the web.
                    <br />
                    This is my portfolio built with Next.js 15 and Tailwind CSS. 
                </p>
                <div className="flex space-x-4">
                    <div className="w-8 h-8 bg-accent rounded"></div>
                    <div className="w-8 h-8 bg-accent rounded"></div>
                </div>
            </div>
        </div>
    );
}