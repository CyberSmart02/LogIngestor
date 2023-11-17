import React, { useState } from 'react';
import { EuiBasicTable, EuiFieldSearch, EuiButton } from '@elastic/eui';
import { useQuery } from 'react-query';

const fetchLogs = async ({ queryKey }) => {
  const [key, { search, filters }] = queryKey;
  const response = await fetch(`/search?query=${search}&filters=${JSON.stringify(filters)}`);
  const data = await response.json();
  return data;
};

function App() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});

  const { data, refetch } = useQuery(['logs', { search, filters }], fetchLogs, {
    enabled: false,
  });

  const onSearch = () => {
    refetch();
  };

  const columns = [
    // Add columns for each field in the log data
    { field: 'level', name: 'Level' },
    { field: 'message', name: 'Message' },
    { field: 'resourceId', name: 'Resource ID' },
    { field: 'timestamp', name: 'Timestamp' },
    { field: 'traceId', name: 'Trace ID' },
    { field: 'spanId', name: 'Span ID' },
    { field: 'commit', name: 'Commit' },
    { field: 'metadata.parentResourceId', name: 'Parent Resource ID' },
  ];

  return (
    <div className="App">
      <EuiFieldSearch
        placeholder="Search logs"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSearch={onSearch}
      />
      {/* Add UI elements for filters here */}
      <EuiButton onClick={onSearch}>Search</EuiButton>
      <EuiBasicTable items={data?.logs || []} columns={columns} />
    </div>
  );
}

export default App;

