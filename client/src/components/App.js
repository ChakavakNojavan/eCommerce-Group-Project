import { useState, useEffect } from 'react';

function App() {
  const [bacon, setBacon] = useState(null);

  useEffect(() => {
    fetch('/bacon')
      .then(res => res.json())
      .then(data => setBacon(data));
  }, []);

  return <div>{bacon ? bacon : `...where's my stuff?...`}</div>;
}

//this is jon 

export default App;
