import prisma from '$lib/prisma';
import redirectIfNotLoggedIn from '$lib/redirect.js';

export async function load(event) {
	redirectIfNotLoggedIn(event);

	const tweetId = parseInt(event.params.tweetId);

	return {
		tweets: (
			await prisma.$queryRaw`
    WITH RECURSIVE TweetHierarchy AS (
      SELECT *
      FROM "Tweet"
      WHERE id = ${tweetId}
      UNION ALL
      SELECT t.*
      FROM "Tweet" t
      INNER JOIN TweetHierarchy th ON t.id = th."parentTweetId"
    )
    SELECT t.*, u.name FROM (
      SELECT * FROM TweetHierarchy th
      UNION ALL
      SELECT * FROM "Tweet"
      WHERE "parentTweetId" = ${tweetId} 
    ) t
    INNER JOIN "User" u ON t."userId" = u.id
    ORDER BY "creationTime";
  `
		).map((tweet) => ({
			id: tweet.id,
			text: tweet.text,
			creationTime: tweet.creationTime,
			parentTweetId: tweet.parentTweetId,
			user: {
				id: tweet.userId,
				name: tweet.name
			}
		}))
	};
}
