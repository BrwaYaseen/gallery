import "server-only"
import { db } from "./db"
import { auth } from "@clerk/nextjs/server"


export const getUserImages = async () =>{
    const user = auth();

    if(!user.userId) throw new Error("UnAuthorized")

    const images = await db.query.Images.findMany({
        where: (img, {eq}) => eq(img.userId, user.userId),
        orderBy: (img , {desc}) => desc(img.id)
      })
      return images
}

export const getImage = async (id: number) =>{
  const user = auth();

  if(!user.userId) throw new Error("UnAuthorized")

  const image = await db.query.Images.findFirst({
      where: (img, {eq}) => eq(img.id, id),
    });

    if(!image) throw new Error("Image Not Found")
    
    if(image.userId !== user.userId) throw new Error("UnAuthorized")

    return image
}

