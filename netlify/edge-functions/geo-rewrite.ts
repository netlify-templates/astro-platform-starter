import type { Config, Context } from '@netlify/edge-functions';
import { HTMLRewriter, type TextChunk } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

class ElementHandler {
  public buffer = '';

  constructor(private geo: Context['geo'] & { postalCode?: string }) {
    this.geo = geo;
  }

  text(text: TextChunk) {
    this.buffer += text.text;

    if (text.lastInTextNode) {
      const { city, country, subdivision, timezone, latitude, longitude, postalCode } = this.geo;

      const textToReplace = this.buffer
        .replace(/\[city\]/gi, city || '<unknown>')
        .replace(/\[country-code\]/gi, country?.code || '<unknown>')
        .replace(/\[country-name\]/gi, country?.name || '<unknown>')
        .replace(/\[subdivision-code\]/gi, subdivision?.code || '<unknown>')
        .replace(/\[subdivision-name\]/gi, subdivision?.name || '<unknown>')
        .replace(/\[timezone\]/gi, timezone || '<unknown>')
        .replace(/\[latitude\]/gi, latitude?.toString() || '<unknown>')
        .replace(/\[longitude\]/gi, longitude?.toString() || '<unknown>')
        .replace(/\[postal-code\]/gi, postalCode?.toString() || '<unknown>');

      text.replace(textToReplace, { html: true });
      this.buffer = '';
    } else {
      text.remove();
    }
  }
}

export default async (_request: Request, context: Context) => {
  const response = await context.next();
  return new HTMLRewriter().on('*', new ElementHandler(context.geo)).transform(response);
};

export const config: Config = {
  path: '/edge-functions',
  onError: 'bypass',
};
