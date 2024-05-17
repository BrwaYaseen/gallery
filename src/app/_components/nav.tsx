"use client"

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import React from "react"
import { UploadButton } from "~/utils/uploadthing"

export const Nav = () => {
  const router = useRouter()
    return(
      <nav className=" flex items-center justify-between w-full text-xl border-b font-semibold p-4">
        <div>Gallery</div>

        <div className=" flex flex-row">
        <SignedOut>
          <SignInButton/>
        </SignedOut>
        <SignedIn>
        <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={() => {
          router.refresh()
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(`ERROR! ${error.message}`);
        }}
      />
          <UserButton/>
        </SignedIn>
        </div>
      </nav>
    )
  }

  