"use client"

import { useForm } from "react-hook-form"
import { useState, useTransition } from "react";
import { encodeUrl } from "@blinkly/services/urls";
import { toast } from "react-toastify";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const dynamic = "force-dynamic";
export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [shortenedLink, setShortenedLink] = useState<string>("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{url: string}>()

  const onSubmit = ({url}: {url: string}) => {
    startTransition(async () => {
      const response = await encodeUrl({url})
      if (response.message === "error") {
        toast.error(response.message)
      }
      const {data: { shortenedUrl }} = response
      setShortenedLink(shortenedUrl)
    });
  }

  return (
    <div className="flex flex-col gap-5 md:gap-8 items-center justify-center bg-teal-700 rounded-md md:rounded-3xl shadow-2xl p-3 md:py-20">
      <h1 className="text-4xl md:text-9xl font-extrabold">Blinkly</h1>
      <form className="flex flex-col items-center justify-center gap-5 md:gap-8" onSubmit={handleSubmit(onSubmit)}>
        <input
         className={`border mx-2 md:mx-80 rounded-md py-1 px-3 w-80 md:w-[700px] focus: outline-none ${errors.url && `border-red-500`}`}
         type="text"
         placeholder="Insert your link here"
         {...register("url", {
          required: true,
          pattern: {
            value: /^((https?|ftp):\/\/)?([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})(:[0-9]{1,5})?(\/.*)?$/i,
            message: "Invalid URL",
          },
        })}
          />
        <button 
          className="border md:border-[2px] border-slate-950 bg-yellow-100 shadow-2xl rounded-md w-32 md:w-40" 
          type="submit" 
          onClick={()=> {if (errors.url) toast.error(errors.url.message)}}
          disabled={isPending}
          >{isPending ? "Loading.." : "Shorten Link"}
        </button>
      </form>
      {isPending===false && shortenedLink && 
        <div className="flex flex-col">
          <div className="flex flex-row md:mr-3 p-1">
            <h1>Here is your shortened link:</h1>
          </div>
           <div className="bg-white rounded-sm flex items-center justify-center">
              <h1 className="mr-3">{shortenedLink}</h1>
              <CopyToClipboard
                text={shortenedLink}
                onCopy={() => toast.success("Copied")}>
                  <ClipboardIcon className="hover:cursor-pointer h-4 w-4" title="copy" />
              </CopyToClipboard>
            </div>
        </div>
      }
    </div>
  )
}
