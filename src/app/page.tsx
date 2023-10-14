"use client"

import { useForm } from "react-hook-form"
import { useState, useTransition } from "react";
import { encodeUrl } from "@blinkly/services/urls";

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
        console.log(response)
      }
      const {data: { shortenedUrl }} = response
      setShortenedLink(shortenedUrl)
    });
  }
  return (
    <div className="container flex flex-col items-center justify-center mx-auto h-full px-6">
      <h1>Blinkly</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input
         className={`border focus: outline-none ${errors.url && `border-red-500`}`}
         type="text"
         {...register("url", {
          required: true,
          pattern: {
            value: /^((https?|ftp):\/\/)?([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})(:[0-9]{1,5})?(\/.*)?$/i,
            message: "Invalid URL",
          },
        })}
          />
        {errors.url && <p>{errors.url.message}</p>}
        <button type="submit">{isPending ? "Loading.." : "Shorten Link"}</button>
      </form>
      {shortenedLink && 
        <div>
          Here is your shortenedLink: {shortenedLink}
        </div>
      }
    </div>
  )
}
