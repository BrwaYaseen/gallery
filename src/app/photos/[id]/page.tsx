import { clerkClient } from "@clerk/nextjs/server";
import { DeleteImage, getImage } from "~/server/queries";
import Image from "next/image";
import { Button } from "~/components/ui/button";

interface Props {
  params: {
    id: string;
  };
}

export default async function FullImageView({ params }: Props) {
  const imageId = parseInt(params.id, 10);
  const image = await getImage(imageId);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="grid h-full w-full min-w-0 grid-cols-1 md:grid-cols-4">
      <div className="col-span-1 flex items-center justify-center p-4 md:col-span-3 md:h-full">
        <div className="relative h-screen w-full md:h-full">
          <Image
            src={image.url}
            alt={image.name}
            layout="fill"
            objectFit="contain"
            className="rounded-md shadow-md"
          />
        </div>
      </div>
      <div className="col-span-1 flex w-full flex-shrink-0 flex-col border-t md:border-l md:border-t-0">
        <div className="border-b p-4 text-center text-lg font-semibold">
          {image.name}
        </div>
        <div className="flex flex-col border-b p-4 text-center">
          <span className="font-medium">Uploaded By:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col border-b p-4 text-center">
          <span className="font-medium">Published On:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="p-4 text-center">
          <form
            action={async () => {
              "use server";
              await DeleteImage(imageId);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
