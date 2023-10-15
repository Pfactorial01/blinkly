import { decodeUrl } from "@blinkly/services/urls";
import { notFound, permanentRedirect } from "next/navigation";

export default async function RedirectPage(props: {params: {shortLink: string;}}) {
    const { params: {shortLink}} = props;
    const result = await decodeUrl({shortLink})
    if (result.message === "error") {
        return notFound()
      }
    let {data: { longUrl }} = result
    if (!longUrl.includes('http')) {
      longUrl = `http://${longUrl}`
    }
    return permanentRedirect(longUrl)
}