"use client"

import Link from "next/link";

export type linksList = {links: [string, {
    longUrl: string;
    createdAt: Date;
    visited: number;
}][]}

export function AdminComponent({links}: linksList) {
    
    return (
        <div className="flex flex-col items-center justify-center">
            <div>Existing Endpoints</div>
            {links.length > 0 ? links.map((linkData, index) => {
                const shortLink = `http://localhost:3000/${linkData[0]}`
                const longLink = linkData[1].longUrl
                const createdAt = new Date(linkData[1].createdAt)
                const visited = linkData[1].visited
                return (
                <div key={index} className="rounded-xl w-60 md:w-1/2 mb-2 p-2 border-[2px] border-slate-950">
                    <h1>Shortened Link: <Link href={shortLink}>{shortLink}</Link></h1>
                    <h1>Long Link: <Link href={longLink}>{longLink.substring(0,40)}</Link></h1>
                    <h1>Created At: {`${createdAt.toLocaleDateString()}, ${createdAt.toLocaleTimeString()}`}</h1>
                    <h1>Visited: {visited}</h1>
                </div>
                )
            }) : <div><h1>No Shortened Links found</h1></div>}
        </div>
    )
}