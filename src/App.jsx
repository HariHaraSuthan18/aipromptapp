import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { UserProvider } from './context/UserContext'
import { PromptsProvider } from './context/PromptsContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

import Services from './pages/Services/Services'
import ServicesOverview from './pages/Services/ServicesOverview'
import PromptLibrary from './pages/Services/PromptLibrary'
import AiGenerator from './pages/Services/AiGenerator'
import Analytics from './pages/Services/Analytics'

import PromptsList from './pages/Prompts/PromptsList'
import PromptDetail from './pages/Prompts/PromptDetail'

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <PromptsProvider>
          <div className="app">
            <Navbar />

            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                {/* Nested Routing under /services */}
                <Route path="/services" element={<Services />}>
                  <Route index element={<ServicesOverview />} />
                  <Route path="library" element={<PromptLibrary />} />
                  <Route path="generator" element={<AiGenerator />} />
                  <Route path="analytics" element={<Analytics />} />
                </Route>

                <Route path="/prompts" element={<PromptsList />} />
                <Route path="/prompts/:id" element={<PromptDetail />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </PromptsProvider>
      </UserProvider>
    </ThemeProvider>
  )
}
