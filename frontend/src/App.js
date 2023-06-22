import { useState } from 'react';
import { 
  useQuery,
  useLazyQuery, 
  useMutation, 
  gql 
} from '@apollo/client';

const GET_USERS = gql`
  query Query {
    users {
      ...on UserSuccessfulResult {
        result {
          id,
          firstName,
          lastName
        }
      }
      ...on UserErrorResult {
        errorId,
        errorMessage
      }
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
  }
}
`;

function App() {
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userSex, setUserSex] = useState(null);
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [ getUsers, {error: lazyError, loading: lazyLoading, data: lazyData}] = useLazyQuery(GET_USERS);
  const [createUser, { data: createUserDataResult}] = useMutation(CREATE_USER, {
    variables: {
      input: {
        firstName: userFirstName,
        lastName: userLastName,
        sex: userSex
      }
    },
  });

  const renderListUser = (userResult) => {
    return userResult?.users.result.map(({ id, firstName, lastName }) => (
      <div key={id}>
        <h3>{`ID: ${id} - lastName: ${firstName} - lastName: ${lastName}`}</h3>
        <br />
      </div>
    ));
  }

  return (
    <>
      <h1>Apollo Client Example</h1>
      <h2>useMutation</h2>
      <input placeholder='First Name' onChange={(e) => setUserFirstName(e.target.value)}/>
      <input placeholder='Last Name' onChange={(e) => setUserLastName(e.target.value)}/>
      <input placeholder='Sex'  onChange={(e) => setUserSex(e.target.value)}/>
      <button onClick={() => createUser()}>Create New User</button>
      {JSON.stringify(createUserDataResult)}
      <h2>useQuery</h2>
      {renderListUser(data)} 
      {loading && <p>Loading...</p>}
      {error && <p>Error : {error.errorMessage}</p>}
      <button onClick={() => refetch()}>Refresh</button>

      <h2>useLazyQuery</h2>
      {lazyLoading && <p>Lazy Loading...</p>}
      {lazyError && <p>Error : {lazyError.errorMessage}</p>}
      {renderListUser(lazyData)} 
      <button onClick={() => getUsers()}>Get Lazy Users</button>
    </>
  )
 
}

export default App;
