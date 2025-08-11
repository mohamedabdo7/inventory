import "./styles/global.css";
import AppRouter from "./AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { DirectionProvider } from "@radix-ui/react-direction";
import { useTranslation } from "react-i18next";
// import { useAuthStore } from "./store/authStore";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  const {
    i18n: { dir },
  } = useTranslation();

  // const { admin } = useAuthStore();

  return (
    <DirectionProvider dir={dir()}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer theme="dark" toastClassName="bg-gradient-cards-fill" />
        <AppRouter />
      </QueryClientProvider>
    </DirectionProvider>
  );
}

export default App;
