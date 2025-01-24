import blueHeart from "@/assets/GIFs/blue-heart.gif";
import robotHead from "@/assets/GIFs/robot-head.gif";
import landingAgent from "@/assets/images/landing-agent.webp";
import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { H2, H6 } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex h-svh w-full flex-col items-center overflow-hidden px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
      <header className="flex h-[72px] max-h-[72px] min-h-[72px] w-full items-center justify-between border-b">
        <Logo />
        <div className="flex space-x-6">
          <Button variant={"ghost"}>
            <Image
              src={blueHeart.src}
              width={27}
              height={27}
              alt=""
              className="hidden md:block"
            />
            Github
          </Button>
          <Button variant={"ghost"}>
            <Image
              src={robotHead.src}
              width={27}
              height={27}
              alt=""
              className="hidden md:block"
            />
            Docs
          </Button>
        </div>
      </header>
      <main className="flex w-full flex-grow flex-col items-center justify-center space-x-10 xl:flex-row xl:justify-between">
        <div className="w-full max-w-[802px]">
          <div className="flex flex-col">
            <H2 className="whitespace-normal text-left font-logo text-xl uppercase leading-relaxed sm:text-[24px] md:text-center md:text-[28px] lg:text-[32px] xl:whitespace-nowrap xl:text-left xl:text-[36px] 2xl:text-[40px]">
              your smart ai agent for
            </H2>
            <H2 className="whitespace-normal text-left font-logo text-xl uppercase leading-relaxed text-[#3FCBFA] sm:text-[24px] md:text-center md:text-[28px] lg:text-[32px] xl:whitespace-nowrap xl:text-left xl:text-[36px] 2xl:text-[40px]">
              automated trading
            </H2>
            <H6 className="mt-4 text-left text-base leading-7 md:text-center lg:text-lg xl:text-left xl:text-xl">
              With personalize meme coin strategies
            </H6>
          </div>
          <div className="mt-8 flex w-full justify-center gap-4 xl:justify-start">
            <Link
              href={"/platform"}
              target="_blank"
              aria-disabled>
              <Button
                variant={"outline"}
                className="border border-[#3FCBFA80] bg-gradient-to-r from-[#3FCBFA80] via-[#A7E9FF] to-[#3FCBFA] bg-clip-text text-transparent hover:text-transparent hover:shadow hover:shadow-[#3FCBFA80]">
                Launch App
              </Button>
            </Link>
            <Button variant={"default"}>Become Partner</Button>
          </div>
        </div>
        <Image
          src={landingAgent.src}
          alt="landing agent"
          width={844}
          height={844}
          className="mt-14"
        />
      </main>
    </div>
  );
}
