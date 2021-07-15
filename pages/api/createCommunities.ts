
import type { NextApiRequest, NextApiResponse } from 'next';
import { ICreateCommunity } from '../../src/@types';
const { SiteClient } = require('datocms-client');

export default async function createCommunities(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method == 'POST') {
    const TOKEN = process.env.TOKEN_READ_WRITE;
    const client = new SiteClient(TOKEN);

    const data: ICreateCommunity = req.body;

    const record = await client.items.create({
      itemType: '967582', // model ID created for datoCMS
      ...data
    });

    res.json(
      record
    )
  } else {
    res.status(404).send({
      message: `the method ${req.method}, is not supported`
    })
  }


}
