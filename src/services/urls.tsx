"use server"

const baseUrl = "http://localhost:3000/api"

export const encodeUrl = async ({url}: {url: string}) => {
    const response = await fetch(`${baseUrl}/encode`, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(url)
    });
    const result = await response.json()
    if (response.status !== 200) {
        return { message: "error", data: result }
    }
    return { message: "success", data: result }
}

export const decodeUrl = async ({shortLink}: {shortLink: string}) => {
    const response = await fetch(`${baseUrl}/decode`, {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify(shortLink)
    });
    const result = await response.json()
    if (response.status !== 200) {
        return { message: "error", data: result }
    }
    return { message: "success", data: result }
}