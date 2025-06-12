import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './Routes'; // .tsx拡張子は省略可能

// root要素を取得し、nullチェックを行う
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// createRootでレンダリング
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);
