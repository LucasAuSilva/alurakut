
import type { NextApiRequest, NextApiResponse } from 'next';
import { ICreatePosts } from '../../src/@types';
const { SiteClient } = require('datocms-client');

export default async function createCommunities(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const modelId = process.env.MODEL_ID_POST;

  const client = new SiteClient(process.env.TOKEN_READ_WRITE);

  if (req.method == 'GET') {

    try {

      const record = await client.items.all({
        filter: {
          type: modelId
        }});

      res.send(record);

    } catch (error) {
      console.error(error);
    }

  } else if (req.method == 'POST') {
    const data: ICreatePosts = req.body;

    const record = await client.items.create({
      itemType: modelId, // model ID created for datoCMS
      ...data
    });

    res.json(
      record
    )
  } else {
    res.status(404).send({
      message: `Método ${req.method} não é suportado!!`,
      status: 404
    })
  }
}
