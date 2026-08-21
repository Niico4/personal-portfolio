import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

import { ServerEnvConfig } from '@/config/server-env.config';

interface WebhookPayload {
  _type: string;
}

export async function POST(request: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      request,
      ServerEnvConfig.sanity.revalidate_secret,
      true,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        {
          message: 'Invalid webhook signature',
        },
        {
          status: 401,
        },
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        {
          message: 'Missing document type',
        },
        {
          status: 400,
        },
      );
    }

    revalidateTag(body._type, 'max');

    return NextResponse.json({
      revalidated: true,
      tag: body._type,
    });
  } catch (error) {
    console.error('Sanity webhook revalidation failed:', error);

    return NextResponse.json(
      {
        message: 'Webhook revalidation failed',
      },
      {
        status: 500,
      },
    );
  }
}
