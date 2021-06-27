import { NextApiRequest, NextApiResponse } from 'next'

export default async function Sizes(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await import('@jsons/sizes__200.json')

  res.statusCode = 200
  res.json(data)
}
