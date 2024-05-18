import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { SimpleUploadButton } from "./upload-button"

export const Nav = () => {
    return(
      <nav className=" flex items-center justify-between w-full text-xl border-b font-semibold p-4">
        <div>Gallery</div>

        <div className=" flex flex-row gap-4 items-center">
        <SignedOut>
          <SignInButton/>
        </SignedOut>
        <SignedIn>
        <SimpleUploadButton/>
          <UserButton/>
        </SignedIn>
        </div>
      </nav>
    )
  }

  