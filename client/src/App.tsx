import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import ProductDetail from "@/pages/ProductDetail";
import BlogDetail from "@/pages/BlogDetail";
import MarketDetail from "@/pages/MarketDetail";
import SectionDetail from "@/pages/SectionDetail";
import ArticleDetail from "@/pages/ArticleDetail";
import Products from "@/pages/Products";
import SearchResults from "@/pages/SearchResults";
import Contact from "@/pages/Contact";
import CommerceGateway from "@/pages/CommerceGateway";
import BrandDetail from "@/pages/BrandDetail";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Blog from "./pages/Blog";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/:lang/sections/:slug"} component={SectionDetail} />
      <Route path={"/:lang/article/:slug"} component={ArticleDetail} />
      <Route path={"/:lang/blog"} component={Blog} />
      <Route path={"/:lang/blog/:slug"} component={BlogDetail} />
      <Route path={"/products"} component={Products} />
      <Route path={"/:lang/products"} component={Products} />
      <Route path={"/products/:slug"} component={ProductDetail} />
      <Route path={"/:lang/product/:slug"} component={ProductDetail} />
      <Route path={"/brands/:slug"} component={BrandDetail} />
      <Route path={"/:lang/brands/:slug"} component={BrandDetail} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/blog/:slug"} component={BlogDetail} />
      <Route path={"/markets/:slug"} component={MarketDetail} />
      <Route path={"/search"} component={SearchResults} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/marketplace"} component={CommerceGateway} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
