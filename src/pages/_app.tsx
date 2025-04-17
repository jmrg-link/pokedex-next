import "../styles/globals.css";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import Layout from "../components/Layout";
import { FilterProvider, SearchProvider } from "../contexts/main";

/**
 * Componente raíz de la aplicación Next.js.
 *
 * @param {object} props
 * @param {React.ComponentType} props.Component - Componente de página.
 * @param {unknown} props.pageProps - Props específicas de la página.
 * @returns {JSX.Element}
 */
const MyApp: AppType = ({ Component, pageProps }) => (
  <FilterProvider>
    <SearchProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SearchProvider>
  </FilterProvider>
);

export default trpc.withTRPC(MyApp);
