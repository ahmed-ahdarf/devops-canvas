import { Terminal } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
        <Terminal size={14} className="text-primary" />
        <span>© {new Date().getFullYear()} Ahmed AHDARF</span>
      </div>
    </div>
  </footer>
);

export default Footer;
