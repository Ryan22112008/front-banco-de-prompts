import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import PromptDetail from './pages/PromptDetail'
import Glossario from './pages/Glossario'
import FichaSistemaIA from './pages/FichaSistemaIA'
import GuiaIAPage from './pages/GuiaIAPage'
import NotFound from './pages/NotFound'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prompts/:id" element={<PromptDetail />} />
          <Route path="/glossario" element={<Glossario />} />
          <Route path="/ficha-sistema-ia" element={<FichaSistemaIA />} />
          <Route path="/guia-ia" element={<GuiaIAPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
