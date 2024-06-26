import React from "react";
import { Github, BookOpen } from "lucide-react";

export const Navbar = ({ framework }: { framework: string }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background z-20 bg-gradient-to-r from-gray-900 to-black">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-white">
            Capsule SDK Demo for {framework}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/capsule-org/react-integration-examples"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <Github size={24} />
          </a>
          <a
            href="https://docs.usecapsule.com/"
            className="text-white hover:text-gray-300"
          >
            <BookOpen size={24} />
          </a>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <a
              href="https://usecapsule.com/beta"
              target="_blank"
              className="relative px-7 py-2 bg-black rounded-lg leading-none flex items-center"
            >
              <span className="text-gray-100 group-hover:text-white transition duration-200">
                Get Access
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
