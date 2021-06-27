import { NextApiRequest, NextApiResponse } from 'next'

export default async function Volumes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await import('@jsons/Volume__200.json')

  res.statusCode = 200
  res.json(data)
}
