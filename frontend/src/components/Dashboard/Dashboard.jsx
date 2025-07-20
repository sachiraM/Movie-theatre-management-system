import React from 'react';
import { Image, Flex } from 'antd';
import './Dashboard.css';
import { ReorderList } from '../ConcessionManagement/components/ReorderList/ReorderList';


export default function Dashboard() {
  return (
    <div className="Dashboard" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="DashboardBackground">
        <div className="Logo">
          <Image src="https://raw.githubusercontent.com/nxdun/BlaBla/main/2.png" preview={false} height="200px" width="200px" />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: '100%', maxWidth: 1200, padding: 20 }}>
          <Flex wrap="wrap" gap="large" style={{ justifyContent: 'center' }}>
            <ReorderList />
          </Flex>
        </div>
      </div>
    </div>
  );
}
