import { NextApiRequest, NextApiResponse } from 'next'

export default async function Soaks(req: NextApiRequest, res: NextApiResponse) {
  const { data } = await import('@jsons/soaks__200.json')

  res.statusCode = 200
  res.json(data)
}
