
import type { NextApiRequest, NextApiResponse } from 'next';
import { ICreateCommunity } from '../../src/@types';
const { SiteClient } = require('datocms-client');

export default async function createCommunities(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method == 'GET') {
    const TOKEN = process.env.TOKEN_READ_ONLY;
    const client = new SiteClient(TOKEN);

    const record = await client.items.all({
      itemType: 'community', // model ID created for datoCMS
      fields: {
        id: {},
        title: {},
        imageUrl: {},
        creatorSlug: {}
      }
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
