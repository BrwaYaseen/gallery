
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getUserImages } from "~/server/queries";


export const dynamic = "force-dynamic"



export default async function HomePage() {

  const Images = async() =>{

    const images = await getUserImages()

    return(

      <div className=" flex flex-wrap gap-4 p-4 mt-5 justify-center">
      {images.map((image)=>(
        <div key={image.id} className="w-48 flex flex-col">
          <Link href={`/photos/${image.id}`}>
          <Image src={image.url} style={{objectFit: "contain"}}
          height={194} width={194}  alt="Images"/> 
          </Link>
          <div>{image.name}</div>
        </div>
      ))}
     </div>

    )
  }

  
  

  return (
    <main className="">
      <SignedOut>
        <div className=" h-full w-full text-center text-2xl p-4"> Please Sign in</div>
      </SignedOut>
      <SignedIn>
        <Images/>
      </SignedIn>
     
    </main>
  );
}
