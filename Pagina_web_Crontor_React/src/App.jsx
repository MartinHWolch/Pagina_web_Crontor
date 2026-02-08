import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Terms from './pages/Terms';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import PaymentPending from './pages/PaymentPending';

function App() {
    return (
        <AuthProvider>
            <Router>
                <AnimatedBackground />
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/payment/success" element={<PaymentSuccess />} />
                    <Route path="/payment/failure" element={<PaymentFailure />} />
                    <Route path="/payment/pending" element={<PaymentPending />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
}

export default App;
