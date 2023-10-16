import { AdminComponent } from "@blinkly/app/admin/admin.component";
import { getAllEndpoints } from "@blinkly/services/getAllEndpoints";

export type linksList = [shortLink: string, {
    longUrl: string;
    createdAt: Date;
    visited: number;
}][]

export const revalidate = 0;

export default async function AdminPage(props: {searchParams: { page?: string | null | undefined}}) {
    const {searchParams} = props
    const page = searchParams?.page ? parseInt(searchParams.page) : 1;
    const {numPages, mapArr} = await getAllEndpoints(page)
    return (<AdminComponent links={mapArr} numPages={numPages} page={page} />)
}