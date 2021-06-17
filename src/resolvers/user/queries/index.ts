export function user (_, args, ctx) {
  return ctx.prisma.user.findUnique({ where: args.where });
}

export function users (_, args, ctx) {
  return ctx.prisma.user.findMany({});
}
