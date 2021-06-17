import { pcQuery } from '../prismaClientQuery';

export const Post = {
  author: pcQuery('post', 'author')
};
