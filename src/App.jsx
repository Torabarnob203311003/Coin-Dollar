import { useEffect, useRef } from "react";
import { ThemeProvider,  } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BG1 from "./assets/BG1.png";
import Marquee from "./components/Marquee";
import InfoBar from "./components/InfoBar";
import CardSection from "./components/CardSection";
import ContactForm from "./components/ContatcFrom";
import Footer from "./components/Footer";
import Scan from "./components/Scan";
import GridSection from "./components/GridSection";
import LineSection from "./components/lineSection";
import UseCasesCard from "./components/UseCasesCard";
import themeStyles from "./themeStyles"; // <-- import the theme styles
import Global from "./components/Global";

function App() {
  // Auto-refresh on screen size switch between mobile and desktop
  const lastType = useRef(window.innerWidth < 768 ? "mobile" : "desktop");
  useEffect(() => {
    const onResize = () => {
      const type = window.innerWidth < 768 ? "mobile" : "desktop";
      if (type !== lastType.current) {
        window.location.reload();
        lastType.current = type;
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <ThemeProvider>
      <ThemeConsumerApp />
    </ThemeProvider>
  );
}

// New component to consume theme context
function ThemeConsumerApp() {
  const { theme } = [];
  const isLight = theme === "light";
  const currentTheme = themeStyles[isLight ? "light" : "dark"];

  return (
    <>
      <div
        className="min-h-screen h-screen overflow-x-hidden w-full bg-cover bg-center transition-all duration-300"
        style={{
          backgroundImage: `url(${BG1})`,
          filter: currentTheme.bgFilter,
          backgroundColor: isLight ? "#fff" : currentTheme.bgColor,
        }}
      >
        <Navbar />
        <HeroSection />
        <InfoBar
          bgColor={currentTheme.bgColor}
          textColor={currentTheme.textColor}
          borderColor={currentTheme.borderColor}
          accent={currentTheme.accent}
        />
      </div>
     
        <CardSection
          bgColor={currentTheme.bgColor}
          textColor={currentTheme.textColor}
          borderColor={currentTheme.borderColor}
          accent={currentTheme.accent}
        />
    
    
        <UseCasesCard
          bgColor={currentTheme.bgColor}
          textColor={currentTheme.textColor}
          borderColor={currentTheme.borderColor}
          accent={currentTheme.accent}
        />
      
      
        <Scan
          bgColor={currentTheme.bgColor}
          textColor={currentTheme.textColor}
          borderColor={currentTheme.borderColor}
          accent={currentTheme.accent}
        />
    
      
        <LineSection
          bgColor={currentTheme.bgColor}
          textColor={currentTheme.textColor}
          borderColor={currentTheme.borderColor}
          accent={currentTheme.accent}
        />
   
      <div style={{ background: isLight ? "#fff" : undefined }}>
        <Global
          bgColor={currentTheme.bgColor}
          textColor={currentTheme.textColor}
          borderColor={currentTheme.borderColor}
          accent={currentTheme.accent}
        />
      </div>
      <Footer
        bgColor={currentTheme.bgColor}
        textColor={currentTheme.textColor}
        borderColor={currentTheme.borderColor}
        accent={currentTheme.accent}
      />
    </>
  );
}

export default App;