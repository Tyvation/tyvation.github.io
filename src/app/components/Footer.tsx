export default function Footer() {
    return (
      <footer className="fixed bottom-0.5 left-1/2 -translate-x-1/2 mt-24 text-center text-sm text-gray-500 select-none">
        © {new Date().getFullYear()} Tyvation. All rights reserved.
      </footer>
    );
  }
  