import { AdminComponent } from "@blinkly/app/admin/admin.component";
import { getAllEndpoints } from "@blinkly/app/api/getAllEndpoints/getAllEndpoints"

export type linksList = [shortLink: string, {
    longUrl: string;
    createdAt: Date;
    visited: number;
}][]

export const revalidate = 0;

export default async function AdminPage() {
    const urlData = await getAllEndpoints()
    const links = await urlData.json() as linksList
    return (<AdminComponent links={links} /> )
}