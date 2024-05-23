import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";
import Image from 'next/image';

export default async function ImagePageViewModal(props: { id: number }) {
    const image = await getImage(props.id);
    const uploaderInfo = await clerkClient.users.getUser(image.userId);
    
    return (
        <div className="flex h-full w-full min-w-0">
            <div className="flex justify-center items-center w-full h-full">
                <div className="relative w-full h-full">
                    <Image 
                        src={image.url} 
                        alt={image.name} 
                        layout="fill" 
                        objectFit="contain"
                    />
                </div>
            </div>
            <div className="flex w-48 flex-col flex-shrink-0 border-l">
                <div className="text-lg border-b text-center p-2">
                    {image.name}
                </div>
                <div className="flex flex-col p-2 text-center border-b">
                    <span>Uploaded By: </span>
                    <span>{uploaderInfo.fullName}</span>
                </div>
                <div className="flex flex-col p-2 text-center">
                    <span>Published On: </span>
                    <span>{new Date(image.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}