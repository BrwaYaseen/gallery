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