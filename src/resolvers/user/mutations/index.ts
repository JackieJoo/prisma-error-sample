export function createUser (_, args, ctx) {
  if(args.data.post)
  return ctx.prisma.user.create({
    data: {
      name: args.data.name,
      email: args.data.email,
      posts: {
        create: args.data.post
      }
    }
  });

  return ctx.prisma.user.create({ data: args.data });
}

export function addPostToUser (_, args, ctx) {
  return ctx.prisma.user.update({ where: args.where, data: args.data });
}
