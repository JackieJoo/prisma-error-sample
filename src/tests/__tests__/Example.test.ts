
import { gql } from '@apollo/client';
import { client } from '../utils/ApolloClient';
import resetDevDb from '../utils/ResetDevDb';
import errorLog from '../utils/ErrorLog';

const vars = {
  user: {
    name: 'name',
    email: 'email',
    post: { title: 'title' }
  },
  post: {
    title: 'title#2',
  }
}

describe('Create User & Query User & Create Post & Query Post', () => {

  jest.setTimeout(30000)

  beforeAll(async () => {
    await resetDevDb();
  });

  afterAll(async () => {
    client.stop();
    await resetDevDb();
  });

  /* tests */

  test('Create User', async () => {

    const CREATE_USER = gql`
    mutation Mutation($createUserData: UserCreateInput!) {
      createUser(data: $createUserData) {
        name
        email
        posts {
          title
        }
      }
    }
    `;

    const expected = {
      data: {
        createUser: {
          __typename: 'User',
          email: vars.user.email,
          name: vars.user.name,
          posts: [ { __typename: 'Post', ...vars.user.post } ]
        }
      }
    }

    let result;
    try {
      result = await client.mutate({
        mutation: CREATE_USER,
        variables: {
          createUserData: vars.user
        }
      })
    } catch (error) {
      errorLog(error)
    }

    expect(result).toEqual(expected);
  });

  /* - */

  test('Query User', async () => {

    const USER = gql`
    query Query($userWhere: UserWhereUniqueInput!) {
      user(where: $userWhere) {
        name
        email
        posts {
          title
        }
      }
    }
    `;

    const expected = {
      data: {
        user: {
          __typename: 'User',
          email: vars.user.email,
          name: vars.user.name,
          posts: [ { __typename: 'Post', ...vars.user.post } ]
        }
      }
    }

    let result;
    try {
      result = await client.query({
        query: USER,
        variables: {
          userWhere: { email: vars.user.email }
        }
      })
    } catch (error) {
      errorLog(error)
    }

    expect(result.data).toEqual(expected.data);
  });

  /* - */

  test('Create Post', async () => {

    const CREATE_POST = gql`
    mutation Mutation($createPostData: PostCreateInput!) {
      createPost(data: $createPostData) {
        title
        author {
          name
        }
      }
    }
    `;

    const expected = {
      data: {
        createPost: {
          __typename: 'Post',
          title: vars.post.title,
          author: {
            __typename: 'User',
            name: vars.user.name
          }
        }
      }
    }

    let result;
    try {
      result = await client.mutate({
        mutation: CREATE_POST,
        variables: {
          createPostData: {
            title: vars.post.title,
            author: { email: vars.user.email }
          }
        }
      })
    } catch (error) {
      errorLog(error)
    }

    expect(result).toEqual(expected);
  });

  /* - */

  test('Query Post', async () => {

    const POST = gql`
    query Query($postWhere: PostWhereUniqueInput!) {
      post(where: $postWhere) {
        title
        author {
          name
        }
      }
    }
    `;

    const expected = {
      data: {
        post: {
          __typename: 'Post',
          title: vars.post.title,
          author: {
            __typename: 'User',
            name: vars.user.name
          }
        }
      }
    }

    let result;
    try {
      result = await client.query({
        query: POST,
        variables: {
          postWhere: {
            title: vars.post.title
          }
        }
      })
    } catch (error) {
      errorLog(error)
    }

    expect(result.data).toEqual(expected.data);
  });

});