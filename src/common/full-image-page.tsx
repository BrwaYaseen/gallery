import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { DeleteImage, getImage } from "~/server/queries";


export default async function ImagePageView(props: {id: number})
    {
   
    const image = await getImage(props.id)
    
    
    const uploaderInfo = await clerkClient.users.getUser(image.userId)
    return (
        <div className=" flex h-full w-full min-w-0">
            <div className="flex flex-shrink justify-center items-center">
             <img src={image.url} className=" flex-shrink object-contain" />
             </div>

             <div className=" flex w-48 flex-col flex-shrink-0 border-l">
                <div className=" text-lg border-b text-center p-2">
                    {image.name}
                </div>
                <div className=" flex flex-col p-2 text-center border-b">
                    <span>Uploaded By: </span>
                    <span> {uploaderInfo.fullName}</span>
                </div>
                <div className=" flex flex-col p-2 text-center">
                    <span>Published On: </span>
                    <span> {new Date(image.createdAt).toLocaleDateString()}</span>
                </div>
                <div className=" p-4 text-center">
                    <form action={async()=> {
                        "use server";

                       await DeleteImage(props.id)

                     
                    }} >

                    <Button type="submit" variant="destructive">Delete</Button>
                    </form>
                </div>
             </div>
        </div>
           
    )
    
}