import React from 'react';
import Showcase from '../components/Showcase';

const sourceData = [
  {
    name: 'appsAdmin',
    alias: 'Apps Admin',
    description: 'Admins have full control over all other users',
  },
  { name: 'dev', alias: 'Developer', description: 'Developers have unrestricted access' },
  {
    name: 'protocolStatus',
    alias: 'Protocol Status User',
    description: 'Users can view, create, and update the requests in the Protocol Status app',
  },
];

const UserGroups = () => {
  const data = sourceData.map(o => ({
    itemId: o.name,
    primary: o.alias,
    secondary: o.description,
  }));
  return (
    <Showcase icon="group" title="User Groups Types" basename="/type/user-groups" data={data} />
  );
};

export default UserGroups;
