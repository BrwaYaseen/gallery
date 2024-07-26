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
  const imageId = parseInt(params.id, 10); // Convert id to a number
  const image = await getImage(imageId);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative h-full w-full">
          <Image
            src={image.url}
            alt={image.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="flex w-48 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>
        <div className="flex flex-col border-b p-2 text-center">
          <span>Uploaded By: </span>
          <span>{uploaderInfo.fullName}</span>
        </div>
        <div className="flex flex-col border-b p-2 text-center">
          <span>Published On: </span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
        <div className=" p-4 text-center">
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
