export function pcQuery(model: string, field: string) {
  return async (parent, _, ctx) => {
    return ctx.prisma[model].findUnique({
      where: {
        id: parent.id
      }
    })[field]();
  }
}