import FooterColumn from "./FooterColumn";
import { data } from "./data";
import Logo from "../Logo/Logo";

export default function Footer() {
  return (
    <div className="bg-neutral-100 border-t flex flex-col justify-center items-center">
      <div className="w-full max-w-[1000px] px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <Logo size="h-10 w-10" withText />
            <div className="flex flex-col gap-3 max-w-md">
              <p className="text-neutral-600 italic">
                &ldquo;Rome wasn&apos;t built in a day, but they were laying bricks every hour.&rdquo;
              </p>
              <p className="text-neutral-600 italic">
                &ldquo;Every little bit helps. A penny saved is a penny earned.&rdquo;
              </p>
              <p className="text-neutral-600 italic">
                &ldquo;Slow and steady wins the race.&rdquo;
              </p>
              <p className="text-neutral-600 italic">
                &ldquo;It&apos;s the little things that make the big difference.&rdquo;
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            {data.map((section, index) => (
              <FooterColumn key={index} data={section} />
            ))}
          </div>
        </div>
        <p className="text-sm text-neutral-500 text-center border-t pt-6">
          © 2026 A Little Better. All rights reserved.
        </p>
      </div>
    </div>
  );
}
