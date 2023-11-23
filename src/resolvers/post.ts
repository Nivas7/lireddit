import { Post } from "src/entities/Post";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    hello() {
        return "Hello Bois!"
    }
}