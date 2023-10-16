/**
 * @jest-environment node
 */
//@ts-nocheck


import { decodeUrl } from '@blinkly/app/api/decode/decodeUrl';
import { InMemoryDatabase } from '@blinkly/services/database';
import { NextRequest } from "next/server";

describe('/api/decode', () => {

  it('should return a successful response', async () => {
    const db = InMemoryDatabase.getInstance()
    const knownKey = "yfejfr"
    db.set(knownKey, {
        longUrl: "indicina.co",
        createdAt: new Date(),
        visited: 0
    })
    const req = new NextRequest('http://localhost:3000/api/decode', {method: "POST", body: JSON.stringify(knownKey)})
    const result = await decodeUrl(req);
    const data = await result.json()
    expect(result.status).toEqual(200)
    expect(data.longUrl).toStrictEqual("indicina.co")
  });

  it('should return a Url is required error', async () => {
    const req = new NextRequest('http://localhost:3000/api/decode', {method: "POST", body: JSON.stringify({})})
    const result = await decodeUrl(req);
    const data = await result.json()
    expect(result.status).toEqual(400)
    expect(data.message).toStrictEqual("Short Link is required")
  });

  it('should return a Link not found error', async () => {
    const unknownKey = "bfe632"
    const req = new NextRequest('http://localhost:3000/api/decode', {method: "POST", body: JSON.stringify({shortUrl: unknownKey})})
    const result = await decodeUrl(req);
    const data = await result.json()
    expect(result.status).toEqual(404)
    expect(data.message).toStrictEqual("Link not found")
  });
});