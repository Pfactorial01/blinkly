/**
 * @jest-environment node
 */
//@ts-nocheck

import { encodeUrl } from '@blinkly/app/api/encode/encodeUrl';
import { NextRequest } from "next/server";

describe('/api/encode', () => {

  it('should return a successful response', async () => {
    const req = new NextRequest('http://localhost:3000/api/encode', {method: "POST", body: JSON.stringify({url: "indicina.co"})})
    const result = await encodeUrl(req);
    const data = await result.json()
    expect(result.status).toEqual(200)
    expect(Object.keys(data)).toStrictEqual(["shortenedUrl"])
  });

  it('should return a Url is required error', async () => {
    const req = new NextRequest('http://localhost:3000/api/encode', {method: "POST", body: JSON.stringify({})})
    const result = await encodeUrl(req);
    const data = await result.json()
    expect(result.status).toEqual(400)
    expect(data.message).toStrictEqual("Url is required")
  });
});