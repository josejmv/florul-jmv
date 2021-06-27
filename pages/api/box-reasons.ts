import { NextApiRequest, NextApiResponse } from 'next'

export default async function Reasons(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await import('@jsons/reasons__200.json')

  res.statusCode = 200
  res.json(data)
}
