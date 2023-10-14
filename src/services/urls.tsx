"use server"

const baseUrl = "http://localhost:3000/api"
export const encodeUrl = async ({url}: {url: string}) => {
    const response = await fetch(`${baseUrl}/encode`, {
        method: 'POST',
        body: JSON.stringify(url)
    });
    const result = await response.json()
    if (response.status !== 200) {
        return { message: "error", data: result }
    }
    return { message: "success", data: result }
}