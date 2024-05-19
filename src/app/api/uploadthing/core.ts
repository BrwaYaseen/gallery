import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { Images } from "~/server/db/schema";
import { ratelimit } from "~/server/ratelimit";
 
const f = createUploadthing();
 

 
export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 35 } })
    .middleware(async ({  }) => {

      const user = auth();
 
      if (!user.userId) throw new UploadThingError("Unauthorized");

      const { success } = await ratelimit.limit(user.userId)

      if(!success) throw new UploadThingError("Ratelimited")
 
      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
    
      await db.insert(Images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      })
 
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;