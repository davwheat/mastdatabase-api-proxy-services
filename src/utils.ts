import type { FastifyRequest } from 'fastify';

export function getResponsibleProxyHeaders(request: FastifyRequest): Record<string, string> {
  return {
    'User-Agent': 'mastdatabase.co.uk proxy',
    'X-Abuse-Contact': 'david@davwheat.dev',
    'X-Forwarded-For': request.ip,
    'X-Upstream-User-Agent': request.headers['user-agent'] ?? 'not provided',
    'X-Upstream-Referer': request.headers.referer ?? 'not provided',
  };
}
