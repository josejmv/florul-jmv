import { NextApiRequest, NextApiResponse } from 'next'

export default async function Flowers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await import('@jsons/flowers__200.json')

  res.statusCode = 200
  res.json(data)
}
