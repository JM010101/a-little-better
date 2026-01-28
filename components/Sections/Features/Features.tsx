import { BoxIcon, Globe, Code, Palette, Zap, Shield, Rocket, Layers } from "lucide-react";
import CardFeature from "./CardFeature";

const features = [
  {
    imageSrc: "/products/fist.png",
    icon: <Globe className="h-4 w-4" />,
    title: "Web Development",
    description: "Modern, responsive websites built with cutting-edge technology.",
    href: "/"
  },
  {
    imageSrc: "/products/second.png",
    icon: <Code className="h-4 w-4" />,
    title: "Custom Software",
    description: "Tailored solutions designed to fit your unique business needs.",
    href: "/"
  },
  {
    imageSrc: "/products/third.png",
    icon: <Palette className="h-4 w-4" />,
    title: "UI/UX Design",
    description: "Beautiful interfaces that provide exceptional user experiences.",
    href: "/"
  },
  {
    imageSrc: "/products/forth.png",
    icon: <Zap className="h-4 w-4" />,
    title: "Performance Optimization",
    description: "Speed up your applications and improve user satisfaction.",
    href: "/"
  },
  {
    imageSrc: "/products/fifth.png",
    icon: <Shield className="h-4 w-4" />,
    title: "Security Solutions",
    description: "Protect your data with enterprise-grade security measures.",
    href: "/"
  },
  {
    imageSrc: "/products/sixth.png",
    icon: <Rocket className="h-4 w-4" />,
    title: "Digital Strategy",
    description: "Strategic planning to accelerate your digital transformation.",
    href: "/"
  },
  {
    imageSrc: "/products/seventh.png",
    icon: <Layers className="h-4 w-4" />,
    title: "Cloud Services",
    description: "Scalable cloud infrastructure for growing businesses.",
    href: "/"
  },
  {
    imageSrc: "/products/eighth.png",
    icon: <BoxIcon className="h-4 w-4" />,
    title: "Product Development",
    description: "From concept to launch, we bring your ideas to life.",
    href: "/"
  }
];

export default function Features() {
  return (
    <>
      <div className="mt-28 mb-20 flex flex-col justify-start items-center mx-6 md:mx-0 ">
        <div className="col-span-4 bg-white flex flex-col justify-center items-center">
          <p className="text-4xl font-medium text-center">
            Our Products
          </p>
          <p className="text-neutral-600 text-xl text-center max-w-[700px] mt-4">
            These are the products we've created. Please browse our website to find similar products and contact us.
          </p>
        </div>
        <div className="flex flex-col justify-start md:grid md:grid-cols-3 w-full max-w-[1000px] gap-4 mt-8">
          {features.map((card, index) => (
            <CardFeature key={index} {...card} />
          ))}
        </div>
      </div>
    </>
  );
}
