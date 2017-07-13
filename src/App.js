import React, {
  Component
} from 'react';

import UsersDashboard from './Users/Dashboard';
import UserGroupsDashboard from './UserGroups/Dashboard';

class App extends Component {
  render() {
    return (
      <main>
        <div className='row'>
          <div className='col-md-4'>
            <UsersDashboard />
          </div>
          <div className='col-md-4'>
            <UserGroupsDashboard />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
