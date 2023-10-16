import { InMemoryDatabase } from "@blinkly/services/database";

export async function getAllEndpoints(page: number) {
    const db = InMemoryDatabase.getInstance()
    const mapArr = Array.from(db["hashMap"])
    const total = mapArr.length
    const numPages = Math.ceil(total/5)
    let result = {numPages, mapArr: mapArr.slice(0,4)}
    if (numPages === 1 || page < 1 || page > numPages) return result
    const end = (page * 5)
    const begin = end - 5
    result = {numPages, mapArr:mapArr.slice(begin, end)}      
    return result
}