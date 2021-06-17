export function createPost (_, args, ctx) {
  if(args.data.author)
  return ctx.prisma.post.create({
    data: {
      title: args.data.title,
      author: {
        connect: { email: args.data.author.email }
      }
    }
  });

  return ctx.prisma.post.create({
    data: args.data
  });
}
