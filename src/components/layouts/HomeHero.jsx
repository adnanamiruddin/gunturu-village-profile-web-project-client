import Image from "next/image";
import MotionDiv from "./MotionDiv";

export default function HomeHero() {
  return (
    <div className="relative min-h-screen w-full">
      <Image
        priority
        src="/image-home-hero.jpg"
        alt="Home Hero Image"
        width={1920}
        height={1080}
        className="brightness-75 w-full h-screen md:h-[110vh] object-cover"
      />

      <div className="absolute inset-0 md:bg-gradient-to-b from-transparent to-white from-90% z-10"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center w-11/12 md:w-1/2 md:top-[40%]">
        <MotionDiv y={-100} delay={1}>
          {/* Mobile View START */}
          <h1 className="md:hidden text-2xl font-bold drop-shadow-xl">
            Selamat Datang di Website Resmi Desa Gunturu
          </h1>
          {/* Mobile View END */}

          {/* Desktop View START */}
          <h1 className="hidden md:inline text-5xl font-bold tracking-wide drop-shadow-xl">
            <p> Selamat Datang</p>
            <p className="mt-2"> di Website Resmi Desa Gunturu</p>
          </h1>
          {/* Desktop View END */}
        </MotionDiv>

        <MotionDiv y={100} delay={1}>
          <p className="mt-4 md:text-2xl">Desa Gunturu, Kabupaten Bulukumba</p>
        </MotionDiv>
      </div>
    </div>
  );
}
