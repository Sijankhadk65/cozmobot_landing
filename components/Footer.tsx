import { Bot } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
              <div className="w-6 h-6 bg-[#1a5fb4] rounded-md flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              CozmoBot
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Autonomous industrial robotics. End-to-end AI welding automation
              for the modern factory floor.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
              Platform
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              {["Solution", "Features", "Architecture", "Industries"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="hover:text-gray-900 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">
              Company
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              {["About", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-gray-900 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © 2026 CozmoBot. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Industrial autonomy without complexity.
          </p>
        </div>
      </div>
    </footer>
  );
}
