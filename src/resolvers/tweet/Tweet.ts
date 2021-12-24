import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import { Tweet } from "../../entity/Tweet";
import { MyContext } from "../../types/MyContext";

@Resolver(Tweet)
class TweetResolver {
    @Authorized()
    @Mutation(() => Tweet)
    async createTweet(
        @Arg("description") description: string,
        @Ctx() ctx: MyContext
    ): Promise<Tweet> {
        const tweet = await Tweet.create({
            description: description,
            published: true,
            user: ctx.req.user,
        }).save();

        return tweet;
    }
}

export { TweetResolver };
