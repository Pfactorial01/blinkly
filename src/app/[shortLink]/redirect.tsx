"use client"
import { useEffect } from "react";

export function RedirectClientPage({url}:{url: string}) {
    useEffect(() => {
        window.location.href = url;
      }, [url]);
    return (<></>)
}

