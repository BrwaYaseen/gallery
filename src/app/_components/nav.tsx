import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import React from "react"

export const Nav = () => {
    return(
      <nav className=" flex items-center justify-between w-full text-xl border-b font-semibold p-4">
        <div>Gallery</div>

        <SignedOut>
          <SignInButton/>
        </SignedOut>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </nav>
    )
  }

  