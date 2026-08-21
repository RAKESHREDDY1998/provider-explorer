import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="page-container">
      <header>
        <h1>Provider Directory Explorer</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
