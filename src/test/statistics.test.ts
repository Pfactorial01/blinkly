/**
 * @jest-environment node
 */
//@ts-nocheck
import { getStatistics } from '@blinkly/app/api/statistics/[shortUrl]/statistics';
import { InMemoryDatabase } from '@blinkly/services/database';
import { NextRequest } from "next/server";

describe('/api/encode', () => {

  it('should return a successful response', async () => {
    const db = InMemoryDatabase.getInstance()
    const knownKey = "yfejfr"
    db.set(knownKey, {
        longUrl: "indicina.co",
        createdAt: new Date("2023-10-16T18:19:24.032Z"),
        visited: 2
    })
    const req = new NextRequest(`http://localhost:3000/api/statistics/${knownKey}`, {method: "GET"})
    const result = await getStatistics(req, {params: { shortLink: knownKey }});
    const data = await result.json()
    expect(result.status).toEqual(200)
    expect(data.visited).toEqual(2)
  });

  it('should return a Link not found error', async () => {
    const unknownKey = "bd523ss"
    const req = new NextRequest(`http://localhost:3000/api/statistics/${unknownKey}`, {method: "GET"})
    const result = await getStatistics(req, {params: { shortLink: unknownKey }});
    const data = await result.json()
    expect(result.status).toEqual(404)
    expect(data.message).toStrictEqual("Link not found")
  });
});