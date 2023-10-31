import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_USERS = gql`
  query {
    users {
      id
      username
    }
  }
`;

function ReportsComponent() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReportsComponent;
