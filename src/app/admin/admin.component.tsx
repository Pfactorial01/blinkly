"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";

export type linksList = [string, {
    longUrl: string;
    createdAt: Date;
    visited: number;
}][]

export function AdminComponent({links, numPages, page}: {links:linksList, numPages: number, page:number}) {
    const router = useRouter()
    const pagination = []
    let i = 1
    while (i <= numPages) {
      pagination.push(i)
      i ++
    }
    return (
        <div className="flex flex-col gap-5 md:gap-8 items-center justify-center md:h-[700px] bg-teal-700 rounded-md md:rounded-3xl shadow-2xl px-3 md:py-14">
            <h1 className="text-4xl md:text-7xl font-extrabold">Blinkly</h1>
            <h1 className="text-2xl">Existing Endpoints</h1>
            {links.length > 0 ? links.map((linkData, index) => {
                const shortLink = `http://localhost:3000/${linkData[0]}`
                const longLink = linkData[1].longUrl
                const createdAt = new Date(linkData[1].createdAt)
                const visited = linkData[1].visited
                return (
                <div key={index} className="mx-2 flex flex-col md:flex-row gap-2 md:mx-80 rounded-md py-1 px-3 w-80 md:w-[700px]  border-[2px] border-slate-950">
                    <div>
                        <h1>Shortened Link: <Link href={shortLink}>{shortLink}</Link></h1>
                        <h1>Long Link: <Link href={longLink}>{longLink.substring(0,25)}</Link></h1>
                    </div>
                    <div>
                        <h1>Created At: {`${createdAt.toLocaleDateString()}, ${createdAt.toLocaleTimeString()}`}</h1>
                        <h1>Visited: {visited}</h1>
                    </div>
                </div>
                )
            }) : <div className="flex justify-center mx-2 md:mx-80 rounded-md py-1 px-3 w-80 md:w-[700px]"><h1>No Shortened Links found</h1></div>}
            {links.length > 0 && pagination.length > 0 && 
            <div className="flex gap-2">
                {page > 1 && <button 
                className="border p-0.5 border-black"
                onClick={() => router.push(`?page=${page-1}`)}
                >
                     Prev
                </button>}
                {page < numPages && 
                <button 
                  className="border p-0.5 border-black"
                  onClick={() => router.push(`?page=${page+1}`)}
                  >
                     Next
                </button>}
                {pagination.map((value, index) => {
                  return (
                    <button 
                      key={index} 
                      className="border p-0.5 w-4 border-black"
                      disabled={page === value}
                      onClick={() => router.push(`?page=${value}`)}
                      >
                      {value}
                    </button>  
                  )
                })}      
            </div>
            }
        </div>
    )
}