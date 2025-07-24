import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  ExternalLink,
  Heart,
  Code,
  Palette,
  Zap,
  Globe,
  Package,
} from "lucide-react";
import exampleImage from "figma:asset/93a943ae833a24da8595ccc251ab9d29bb5ecea6.png";

export function CreditsPage() {
  const coreLibraries = [
    {
      name: "React",
      version: "18.x",
      description: "A JavaScript library for building user interfaces",
      category: "Framework",
      website: "https://react.dev",
      license: "MIT",
    },
    {
      name: "React Router",
      version: "6.x",
      description: "Declarative routing for React applications",
      category: "Routing",
      website: "https://reactrouter.com",
      license: "MIT",
    },
    {
      name: "TypeScript",
      version: "5.x",
      description:
        "Typed superset of JavaScript that compiles to plain JavaScript",
      category: "Language",
      website: "https://www.typescriptlang.org",
      license: "Apache-2.0",
    },
  ];

  const uiLibraries = [
    {
      name: "Tailwind CSS",
      version: "4.0",
      description:
        "A utility-first CSS framework for rapidly building custom designs",
      category: "Styling",
      website: "https://tailwindcss.com",
      license: "MIT",
    },
    {
      name: "shadcn/ui",
      version: "Latest",
      description:
        "Beautifully designed components built with Radix UI and Tailwind CSS",
      category: "UI Components",
      website: "https://ui.shadcn.com",
      license: "MIT",
    },
    {
      name: "Radix UI",
      version: "Latest",
      description: "Low-level UI primitives with a focus on accessibility",
      category: "UI Primitives",
      website: "https://www.radix-ui.com",
      license: "MIT",
    },
    {
      name: "Lucide React",
      version: "Latest",
      description: "Beautiful & consistent icon toolkit made by the community",
      category: "Icons",
      website: "https://lucide.dev",
      license: "ISC",
    },
  ];

  const utilityLibraries = [
    {
      name: "Sonner",
      version: "2.0.3",
      description: "An opinionated toast component for React",
      category: "Notifications",
      website: "https://sonner.emilkowal.ski",
      license: "MIT",
    },
    {
      name: "React Hook Form",
      version: "7.55.0",
      description:
        "Performant, flexible and extensible forms with easy validation",
      category: "Forms",
      website: "https://react-hook-form.com",
      license: "MIT",
    },
    {
      name: "class-variance-authority",
      version: "Latest",
      description: "CVA - Class Variance Authority for component variants",
      category: "Utilities",
      website: "https://cva.style",
      license: "Apache-2.0",
    },
    {
      name: "clsx",
      version: "Latest",
      description:
        "A tiny utility for constructing className strings conditionally",
      category: "Utilities",
      website: "https://github.com/lukeed/clsx",
      license: "MIT",
    },
    {
      name: "tailwind-merge",
      version: "Latest",
      description: "Merge Tailwind CSS classes without style conflicts",
      category: "Utilities",
      website: "https://github.com/dcastil/tailwind-merge",
      license: "MIT",
    },
  ];

  const designAssets = [
    {
      name: "Unsplash",
      description: "Beautiful, free photos and images",
      category: "Images",
      website: "https://unsplash.com",
      license: "Unsplash License",
    },
    {
      name: "DiceBear Avatars",
      description: "Avatar library for designers and developers",
      category: "Avatars",
      website: "https://avatars.dicebear.com",
      license: "MIT",
    },
  ];

  const developmentTools = [
    {
      name: "Vite",
      description: "Next generation frontend tooling",
      category: "Build Tool",
      website: "https://vitejs.dev",
      license: "MIT",
    },
    {
      name: "ESLint",
      description: "Pluggable JavaScript linter",
      category: "Linting",
      website: "https://eslint.org",
      license: "MIT",
    },
    {
      name: "Prettier",
      description: "Opinionated code formatter",
      category: "Formatting",
      website: "https://prettier.io",
      license: "MIT",
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "framework":
      case "language":
        return <Code className="w-4 h-4" />;
      case "styling":
      case "ui components":
      case "ui primitives":
        return <Palette className="w-4 h-4" />;
      case "build tool":
      case "utilities":
        return <Zap className="w-4 h-4" />;
      case "images":
      case "avatars":
        return <Globe className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const LibraryCard = ({
    library,
    showVersion = true,
  }: {
    library: any;
    showVersion?: boolean;
  }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getCategoryIcon(library.category)}
            <h4 className="text-base">{library.name}</h4>
            {showVersion && library.version && (
              <Badge variant="secondary" className="text-xs">
                {library.version}
              </Badge>
            )}
          </div>
          <Button size="sm" variant="ghost" asChild>
            <a
              href={library.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${library.name} website`}
              title={`Visit ${library.name} website`}
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {library.description}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {library.category}
          </Badge>
          {library.license && (
            <span className="text-xs text-muted-foreground">
              {library.license}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img
            src={"https://api.dicebear.com/7.x/avataaars/svg?seed=social"}
            alt="CoverBook"
            className="w-12 h-12"
          />
          <h1 className="text-3xl">Credits & Acknowledgments</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          CoverBook is built on the shoulders of giants. We're grateful to the
          open-source community and the amazing developers who created these
          incredible libraries and tools.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500 fill-current" />
          <span>using open source technologies</span>
        </div>
      </div>

      {/* Core Framework */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            Core Framework
          </CardTitle>
          <CardDescription>
            The foundational technologies that power CoverBook
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreLibraries.map((library, index) => (
              <LibraryCard key={index} library={library} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* UI & Styling */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            UI & Styling
          </CardTitle>
          <CardDescription>
            Beautiful components and styling solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uiLibraries.map((library, index) => (
              <LibraryCard key={index} library={library} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Utility Libraries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Utilities & Tools
          </CardTitle>
          <CardDescription>
            Helper libraries that enhance functionality and developer experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {utilityLibraries.map((library, index) => (
              <LibraryCard key={index} library={library} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Design Assets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Design Assets
          </CardTitle>
          <CardDescription>
            Beautiful images and design resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designAssets.map((asset, index) => (
              <LibraryCard key={index} library={asset} showVersion={false} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Development Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Development Tools
          </CardTitle>
          <CardDescription>
            Tools that help us build and maintain high-quality code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {developmentTools.map((tool, index) => (
              <LibraryCard key={index} library={tool} showVersion={false} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Footer */}
      <div className="text-center space-y-4">
        <h3 className="text-lg">Special Thanks</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We extend our heartfelt gratitude to all the maintainers,
          contributors, and communities behind these projects. Your dedication
          to open source makes projects like CoverBook possible.
        </p>

        <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto">
          <h4 className="mb-2">License Information</h4>
          <p className="text-sm text-muted-foreground">
            This project is built using various open-source libraries, each with
            their own licenses. Please refer to each library's individual
            license for specific terms and conditions. Most libraries listed
            here are released under MIT, Apache-2.0, or similar permissive
            licenses.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button variant="outline" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Code className="w-4 h-4 mr-2" />
              View on GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/attributions" target="_blank" rel="noopener noreferrer">
              <Package className="w-4 h-4 mr-2" />
              Full Attribution List
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
