"use server"

const baseUrl = "http://localhost:3000/api"
export const encodeUrl = async ({url}: {url: string}) => {
    const response = await fetch(`${baseUrl}/encode`, {
        method: 'POST',
        body: JSON.stringify(url)
    });
    const result = await response.json()
    return {
        message: "success",
        data: result
    }
}