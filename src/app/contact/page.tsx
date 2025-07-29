import Link from "next/link";
import { Instagram} from "lucide-react";

export default function ContactPage() {
    return (
        <div className="justify-center w-full bg-section px-20">
          <h1 className="text-3xl font-bold mb-6 text-center">CONTACT ME</h1>
          <form className="space-y-5">
            <div className="flex space-x-5">
              <div>
                  <label className="block text-sm font-medium mb-1 px-2 select-none" htmlFor="name">
                    名字
                  </label>
                  <input
                    type="text"
                    id="name"
                    autoComplete="off"
                    className="w-full px-4 py-2 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
              </div>
              <div className="flex-1">
                  <label className="block text-sm font-medium mb-1 px-2 select-none" htmlFor="email">
                    電子信箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="off"
                    className="w-full px-4 py-2 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                  />
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-medium mb-1 px-2 select-none" htmlFor="message">
                留言內容
              </label>
              <textarea
                id="message"
                rows={5}
                autoComplete="off"
                className="w-full px-4 py-2 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>
  
            <div className="flex justify-between">
                <Link 
                    href={"https://www.instagram.com"} 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <Instagram className="w-10 h-10"/>
                </Link>
                <button
                  type="submit"
                  className="w-20 py-2 px-4 bg-primary text-ground rounded-xl hover:bg-primary-hover hover:scale-105 transition"
                >
                  傳送
                </button>
            </div>
          </form>
        </div>
    );
  }
  