import ErrorBoundary from "@features/errorBoundary/ErrorBoundary";
import Search from "@features/search/Search";
import Layout from "@components/layouts/Layout";

function App() {
  return (
    <Layout>
      <ErrorBoundary>
        <Search />
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
