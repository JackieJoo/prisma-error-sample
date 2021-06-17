export default function errorLog(error)
{
  if(error.graphQLErrors?.length >= 1)
  {
    console.error('Exception:', error.graphQLErrors[ 0 ].extensions?.exception);
    console.error('Locations:', error.graphQLErrors[ 0 ].locations);
    console.error('Path:', error.graphQLErrors[ 0 ].path);
  }

  if(error.networkError)
  console.error('NetworkError:', error.networkError.result?.errors);

  console.error('ERROR: ', error)
}
