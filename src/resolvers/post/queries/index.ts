export function post (_, args, ctx) {
  return ctx.prisma.post.findUnique({ where: args.where });
}

export function posts (_, args, ctx) {
  return ctx.prisma.post.findMany({});
}
