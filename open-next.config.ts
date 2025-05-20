import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import r2IncrementalCache from '@opennextjs/cloudflare/dist/api/overrides/incremental-cache/r2-incremental-cache';
import doQueue from '@opennextjs/cloudflare/dist/api/overrides/queue/do-queue';
import d1NextTagCache from '@opennextjs/cloudflare/dist/api/overrides/tag-cache/d1-next-tag-cache';

export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
  // This is only required if you use On-demand revalidation
  tagCache: d1NextTagCache,
  // Disable this if you want to use PPR
  enableCacheInterception: true,
});
