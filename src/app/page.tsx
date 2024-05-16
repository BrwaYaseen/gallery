/* eslint-disable @next/next/no-img-element */

import { db } from "~/server/db";

export const dynamic = "force-dynamic"



export default async function HomePage() {

  const images = await db.query.Images.findMany({
    orderBy: (model , {desc}) => desc(model.id)
  })
  

  return (
    <main className="">
     <div className=" flex flex-wrap gap-4 mt-5">
      {[...images,...images,...images].map((image, index)=>(
        <div key={image.id + "-" + index} className="w-48 flex flex-col">
          <img src={image.url}  alt="Images"/> 
          <div>{image.name}</div>
        </div>
      ))}
     </div>
    </main>
  );
}
