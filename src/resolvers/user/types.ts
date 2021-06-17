import { pcQuery } from '../prismaClientQuery';

export const User = {
  posts: pcQuery('user', 'posts'),
  profile: pcQuery('user', 'profile')
};
