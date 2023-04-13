import { useState } from 'react'

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TabPanel from 'lib/TabPanel'
import TableFormatter from 'containers/TableFormatter'
import ImageFormatter from 'containers/ImageFormatter'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Table" {...a11yProps(0)} />
          <Tab label="Image" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <TableFormatter />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ImageFormatter />
      </TabPanel>
    </Box>
  );
}

export default App;
