import React from 'react';
import config from '../config.json';
import Showcase from '../components/Showcase';

const sourceData = [
  { avatar: config.app.userDefaultProfileImg, name: 'Daniel Lennox', csuId: 830126214 },
  { avatar: config.app.userDefaultProfileImg, name: 'Daniel Lennox', csuId: 830126215 },
];

const Users = () => {
  const data = sourceData.map(o => ({
    avatar: o.avatar,
    itemId: o.csuId,
    primary: o.name,
    secondary: o.csuId,
  }));
  return <Showcase icon="person" title="Users" basename="/users" data={data} />;
};

export default Users;
