import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getUserImages } from "~/server/queries";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const Images = async () => {
    const images = await getUserImages();

    return (
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="after:content shadow-highlight after:shadow-highlight relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white after:pointer-events-none after:absolute after:inset-0 after:rounded-lg lg:pt-0">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="flex max-h-full max-w-full items-center justify-center">
              <Image src="/Gallery.jpg" fill alt="Initial Image" />
            </span>
            <span className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
          </div>

          <h1 className="mb-4 mt-8 text-base font-bold uppercase tracking-widest">
            My Gallery (Beta)
          </h1>
          <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
            This Website Was Created Using The power of Nextjs, Uploadthing,
            Drizzle ORM and Server Actions!
          </p>
          <a
            className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
            href="https://brwayseen.site"
            target="_blank"
            rel="noreferrer"
          >
            My Portfolio
          </a>
        </div>
        {images.map((image) => (
          <AlertDialog key={image.id}>
            <AlertDialogTrigger asChild>
              <div className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-pointer after:pointer-events-none after:absolute after:inset-0 after:rounded-lg">
                <Image
                  src={image.url}
                  className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  width={720}
                  height={480}
                  sizes="(max-width: 640px) 100vw,
                   (max-width: 1280px) 50vw,
                   (max-width: 1536px) 33vw,
                   25vw"
                  alt={`Image ${image.id}`}
                />
              </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-3xl">
              <div className="relative aspect-video w-full">
                <Image
                  src={image.url}
                  alt={`Selected image ${image.id}`}
                  fill
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAI8wNPvd7POQAAAABJRU5ErkJggg=="
                />
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Close</Button>
                </AlertDialogTrigger>
                <Link href={`/photos/${image.id}`} passHref>
                  <Button asChild>
                    <p>View Full Page</p>
                  </Button>
                </Link>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        ))}
      </div>
    );
  };

  return (
    <main className="mx-auto max-w-[1960px] p-4">
      <SignedOut>
        <div className=" h-full w-full p-4 text-center text-2xl">
          {" "}
          Please Sign in
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
