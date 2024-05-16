/* eslint-disable @next/next/no-img-element */

import { db } from "~/server/db";

export const dynamic = "force-dynamic"


const mockUrls = [
  "https://utfs.io/f/bdd656d1-9bf8-4a5b-86cc-fcd992eea79f-fvxwhl.jpg",
  "https://utfs.io/f/b1438875-3c04-462b-8bdb-371654981faf-gi2no9.jpg",
  "https://utfs.io/f/e584f2cd-64f0-4a28-be4e-944ec733b951-e60hl3.jpg",
  "https://utfs.io/f/160be6fb-205a-484b-90be-85f3c5392000-59p783.jpg"
];

const mockImages = mockUrls.map((url, index)=> ({
  id:index + 1,
  url,
}))
export default async function HomePage() {

  const posts = await db.query.posts.findMany()
  

  return (
    <main className="">
     <div className=" flex flex-wrap gap-4 mt-5">
      {posts.map((post)=>(
        <div key={post.id}>{post.name}</div>
      ))}
      {[...mockImages,...mockImages,...mockImages].map((image, index)=>(
        <div key={image.id + "-" + index} className="w-48">
          <img src={image.url}  alt="Images"/> 
        </div>
      ))}
     </div>
    </main>
  );
}
