import { NextApiRequest, NextApiResponse } from 'next'

export default async function Addons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await import('@jsons/addons__200.json')

  res.statusCode = 200
  res.json(data)
}
