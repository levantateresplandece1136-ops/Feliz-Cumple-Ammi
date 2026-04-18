/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, 
  Map as MapIcon, 
  Users, 
  Volume2, 
  VolumeX,
  ChevronRight, 
  Sparkles, 
  AlertCircle,
  Database,
  Search,
  CheckCircle2,
  Lock,
  MessageSquare,
  Music
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { WORLDS, World } from './constants';

// --- CONFIGURABLE CONSTANTS ---
const VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; 
const AMBIENT_URL = "https://assets.mixkit.co/active_storage/sfx/2381/2381-preview.mp3"; // Loopable ambient
const BEEP_URL = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"; // System beep

// --- TYPES ---
type Scene = 'INTRO' | 'MAP' | 'WORLD' | 'CLIMAX' | 'REVEAL' | 'FINAL';

// --- HELPERS ---

const playSystemBeep = () => {
  const audio = new Audio(BEEP_URL);
  audio.volume = 0.2;
  audio.play().catch(() => {});
};

const speak = (text: string, onEnd?: () => void) => {
  // Cancel previous speech
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.rate = 1.1; // Slightly faster
  utterance.pitch = 0.8; 
  
  // Find a female voice if possible
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(v => v.lang.startsWith('es') && v.name.includes('Google')) || 
                        voices.find(v => v.lang.startsWith('es'));
  
  if (preferredVoice) utterance.voice = preferredVoice;
  
  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
};

// --- COMPONENTS ---

const StarBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2e1065_0%,_transparent_70%)] opacity-30" />
      <div className="stars-container absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              width: Math.random() * 3,
              height: Math.random() * 3 
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const Typewriter = ({ text, onComplete, speed = 25 }: { text: string; onComplete?: () => void; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, speed, onComplete]);

  return <span>{displayedText}</span>;
};

const GlitchText = ({ text, active = false }: { text: string; active?: boolean }) => {
  return (
    <div className={`relative ${active ? 'animate-pulse' : ''}`}>
      <span className="relative z-10">{text}</span>
      {active && (
        <>
          <span className="absolute left-0 top-0 -z-10 animate-glitch-1 text-cyan-500 opacity-70">{text}</span>
          <span className="absolute left-0 top-0 -z-10 animate-glitch-2 text-magenta-500 opacity-70">{text}</span>
        </>
      )}
    </div>
  );
};

export default function App() {
  const [scene, setScene] = useState<Scene>('INTRO');
  const [rescuers, setRescuers] = useState<number[]>([]);
  const [currentWorldIndex, setCurrentWorldIndex] = useState<number>(0);
  const [decisions, setDecisions] = useState<{ worldId: number; choice: string }[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAmbientOn, setIsAmbientOn] = useState(false);
  
  const ambientRef = useRef<HTMLAudioElement | null>(null);

  const currentWorld = WORLDS[currentWorldIndex];
  const progress = (rescuers.length / WORLDS.length) * 100;

  useEffect(() => {
    ambientRef.current = new Audio(AMBIENT_URL);
    ambientRef.current.loop = true;
    ambientRef.current.volume = 0.2;

    return () => {
      ambientRef.current?.pause();
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleAmbient = () => {
    if (isAmbientOn) {
      ambientRef.current?.pause();
    } else {
      ambientRef.current?.play().catch(() => console.log("User must interact first"));
    }
    setIsAmbientOn(!isAmbientOn);
  };

  const handleSpeak = (text: string) => {
    setIsSpeaking(true);
    speak(text, () => setIsSpeaking(false));
  };

  const handleRescue = (choice: string = "auto") => {
    playSystemBeep();
    setDecisions(prev => [...prev, { worldId: currentWorld.id, choice }]);
    setRescuers(prev => [...prev, currentWorld.id]);
    
    // Auto-advance if it's the last world, otherwise go to MAP to trigger next
    setTimeout(() => {
      if (rescuers.length + 1 === WORLDS.length) {
        setScene('CLIMAX');
      } else {
        // Find if the next world is a crisis
        const nextIdx = currentWorldIndex + 1;
        if (nextIdx < WORLDS.length && WORLDS[nextIdx].isCrisis) {
          // INTERWEAVE: Jump straight to next crisis without map stop
          setCurrentWorldIndex(nextIdx);
          setScene('WORLD');
        } else {
          setScene('MAP');
        }
      }
    }, currentWorld.isCrisis ? 3000 : 1500);
  };

  useEffect(() => {
    if (scene === 'WORLD' && currentWorld.isCrisis) {
      handleSpeak(`Alerta de sistema. ${currentWorld.name}. ${currentWorld.narrative}. Identidad procesada.`);
      // Auto-resolve crisis after some time
      const timer = setTimeout(() => handleRescue("crisis-resolved"), 6000);
      return () => clearTimeout(timer);
    }
  }, [scene, currentWorldIndex]);

  useEffect(() => {
    if (scene === 'CLIMAX') {
      const timer = setTimeout(() => setScene('REVEAL'), 4000);
      return () => clearTimeout(timer);
    }
    if (scene === 'FINAL') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#ec4899', '#3b82f6']
      });
    }
    playSystemBeep();
  }, [scene]);

  return (
    <div className="min-h-screen font-sans text-white selection:bg-purple-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono&display=swap');
        
        :root {
          --color-primary: #8b5cf6;
          --color-primary-dark: #2e1065;
          --font-display: 'Space Grotesk', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }

        body {
          background-color: black;
          font-family: var(--font-display);
          cursor: crosshair;
        }

        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(139, 92, 246, 0.3); border-radius: 10px; }

        @keyframes glitch-1 {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes glitch-2 {
          0% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
          100% { transform: translate(0); }
        }
      `}</style>

      <StarBackground />

      {/* Persistence Controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-4">
        <button 
          onClick={toggleAmbient}
          className={`p-3 rounded-full border transition-all ${isAmbientOn ? 'bg-purple-600 border-purple-400 text-white' : 'bg-black/50 border-white/10 text-white/40'}`}
          title="Sonido de ambiente"
        >
          {isAmbientOn ? <Music size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center p-6 min-h-screen max-w-2xl mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          
          {/* SCENE: INTRO */}
          {scene === 'INTRO' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              className="space-y-8 text-center"
            >
              <div className="flex justify-center mb-8">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    y: [0, -10, 10, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="p-6 rounded-full bg-purple-500/10 border border-purple-500/30"
                >
                  <Rocket size={64} className="text-purple-400" />
                </motion.div>
              </div>

              <div className="space-y-4 font-mono text-sm tracking-widest text-purple-300/80 uppercase">
                <p className="animate-pulse">[ Sistema de emergencia activado ]</p>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                <Typewriter text="Capitana Ammi... necesitamos tu ayuda." speed={30} />
              </h1>

              <div className="space-y-6 text-lg text-gray-400 font-light max-w-md mx-auto">
                <p>15 vidas están atrapadas en diferentes dimensiones.</p>
                <p>Eres la única capaz de cruzar los umbrales y traerlas de vuelta.</p>
              </div>

              <div className="flex flex-col gap-4 mt-12">
                <button 
                  onClick={() => handleSpeak("Capitana Ammi, necesitamos tu ayuda. Quince vidas están atrapadas en diferentes dimensiones. Eres la única capaz de cruzar los umbrales y traerlas de vuelta.")}
                  className={`flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-colors ${isSpeaking ? 'text-cyan-400' : 'text-purple-400 hover:text-white'}`}
                >
                  <Volume2 size={16} className={isSpeaking ? 'animate-bounce' : ''} />
                  <span>{isSpeaking ? 'Sintonizando...' : 'Escuchar mensaje'}</span>
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setScene('MAP')}
                  className="px-10 py-4 bg-purple-600 rounded-full font-bold text-lg uppercase tracking-widest hover:bg-purple-50 shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all"
                >
                  Iniciar Misión
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* SCENE: MAP */}
          {scene === 'MAP' && (
            <motion.div 
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col h-full max-h-[80vh]"
            >
              <header className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-sm font-mono text-purple-400 uppercase tracking-widest mb-1">Mapa Galáctico</h2>
                  <p className="text-3xl font-bold">Progreso de Rescate</p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-mono font-bold text-purple-500">{rescuers.length}</span>
                  <span className="text-gray-500 text-sm ml-1">/ {WORLDS.length}</span>
                </div>
              </header>

              <div className="mb-8 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-500"
                />
              </div>

              <div className="grid grid-cols-5 gap-3 mb-10 overflow-y-auto pr-2 custom-scrollbar">
                {WORLDS.map((world, idx) => {
                  const isRescued = rescuers.includes(world.id);
                  const isAvailable = idx === rescuers.length;
                  
                  return (
                    <motion.button
                      key={world.id}
                      whileHover={isAvailable ? { scale: 1.1 } : {}}
                      onClick={() => {
                        if (isAvailable) {
                          setCurrentWorldIndex(idx);
                          setScene('WORLD');
                        }
                      }}
                      className={`
                        aspect-square rounded-xl border flex items-center justify-center relative transition-all overflow-hidden
                        ${isRescued ? 'bg-purple-500/20 border-purple-500' : 
                          isAvailable ? 'bg-gray-800 border-purple-400 animate-pulse cursor-pointer' : 
                          'bg-gray-900/50 border-gray-800 opacity-40 cursor-not-allowed'}
                      `}
                    >
                      {isRescued ? (
                        <CheckCircle2 className="text-purple-400" size={20} />
                      ) : isAvailable ? (
                        <div className="flex flex-col items-center">
                          <Rocket size={16} className="text-purple-400 mb-1" />
                          <span className="text-[10px] uppercase font-bold text-purple-400">{world.id}</span>
                        </div>
                      ) : (
                        <Lock size={16} className="text-gray-700" />
                      )}
                      {isAvailable && (
                        <motion.div 
                          className="absolute inset-0 bg-purple-500/10"
                          animate={{ opacity: [0, 0.3, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {rescuers.length < WORLDS.length && (
                <div className="mt-auto p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-500/20">
                    <MessageSquare size={20} className="text-blue-400" />
                  </div>
                  <p className="text-sm text-gray-300 italic">
                    "{rescuers.length % 3 === 0 ? "Capitana... no todos ven lo que tú ves..." : 
                      rescuers.length % 3 === 1 ? "Tus decisiones revelan más de lo que crees..." : 
                      "Hay patrones en los rescates..."}"
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* SCENE: WORLD */}
          {scene === 'WORLD' && (
            <motion.div 
              key="world"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
              className="w-full space-y-8"
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className={`px-3 py-1 border text-xs font-mono uppercase rounded-full ${currentWorld.isCrisis ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' : 'bg-purple-500/20 border-purple-500 text-purple-400'}`}>
                  {currentWorld.isCrisis ? '[ FALLA DEL SISTEMA ]' : `Mundo ${currentWorld.id} / 15`}
                </span>
                {!currentWorld.isCrisis && (
                  <button 
                    onClick={() => handleSpeak(`${currentWorld.name}. ${currentWorld.narrative}. ${currentWorld.question}`)}
                    className={`flex items-center gap-2 p-2 px-4 rounded-full transition-all border ${isSpeaking ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/10 text-purple-400 hover:bg-white/10'}`}
                  >
                    <Volume2 size={18} className={isSpeaking ? 'animate-pulse' : ''} />
                    <span className="text-xs uppercase tracking-widest font-bold">Relato</span>
                  </button>
                )}
              </div>

              <header>
                <h2 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${currentWorld.isCrisis ? 'text-red-500 font-mono' : 'text-white'}`}>
                  {currentWorld.name}
                </h2>
                <div className={`h-0.5 w-20 ${currentWorld.isCrisis ? 'bg-red-500' : 'bg-purple-500'}`} />
              </header>

              <div className={`p-6 rounded-3xl border relative overflow-hidden group ${currentWorld.isCrisis ? 'bg-red-500/5 border-red-500/20' : 'bg-white/5 border-white/10'}`}>
                {currentWorld.isCrisis && (
                  <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
                )}
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {currentWorld.isCrisis ? <AlertCircle size={80} className="text-red-500" /> : <Sparkles size={80} className="text-purple-400" />}
                </div>
                <p className={`text-xl leading-relaxed font-light ${currentWorld.isCrisis ? 'text-red-200' : 'text-gray-200'}`}>
                  {currentWorld.narrative}
                </p>
              </div>

              {!currentWorld.isCrisis ? (
                <div className="space-y-6">
                  <div className="flex gap-2 items-center text-purple-300 font-medium font-mono text-sm">
                    <AlertCircle size={18} />
                    <h3>[ ENTRADA REQUERIDA ]: {currentWorld.question}</h3>
                  </div>

                  <div className="grid gap-3">
                    {currentWorld.options?.map((option, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRescue(option.value)}
                        className="p-5 text-left rounded-2xl bg-gray-900 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all flex justify-between items-center group"
                      >
                        <span className="text-gray-300 group-hover:text-white transition-colors">{option.label}</span>
                        <ChevronRight size={18} className="text-gray-600 group-hover:text-purple-500" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center p-8 bg-black/40 rounded-3xl border border-red-500/20">
                     <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-16 h-16 rounded-full border-4 border-red-500 border-t-transparent animate-spin mb-4"
                     />
                     <p className="text-red-400 font-mono text-sm animate-pulse">AUTOPROCESANDO CRISIS...</p>
                     <p className="text-gray-500 text-xs mt-2">La voluntad de Ammi está resolviendo el problema técnico.</p>
                  </div>
                </div>
              )}

              {/* Feedback toast shown after selection */}
              {decisions.length > currentWorldIndex && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className={`${currentWorld.isCrisis ? 'bg-red-500/20 border-red-500/50' : 'bg-purple-600/20 border-purple-500/50'} p-4 rounded-xl text-center`}
                >
                  <p className={`${currentWorld.isCrisis ? 'text-red-400' : 'text-purple-300'} mb-2 font-mono text-sm`}>
                    {currentWorld.isCrisis ? '[ SISTEMA RESTAURADO ]' : 'Interesante elección, capitana...'}
                  </p>
                  <p className="font-bold text-lg text-white font-mono uppercase tracking-[0.2em]">{currentWorld.quality}</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* SCENE: CLIMAX */}
          {scene === 'CLIMAX' && (
            <motion.div 
              key="climax"
              className="text-center space-y-12"
              initial={{ filter: 'brightness(1)' }}
              animate={{ 
                filter: ['brightness(1)', 'brightness(2)', 'brightness(0.5)', 'brightness(1.5)', 'brightness(1)'],
                transition: { duration: 0.2, repeat: 10 }
              }}
            >
              <div className="animate-pulse">
                <Database size={80} className="mx-auto text-cyan-400 mb-4" />
                <h2 className="text-xl font-mono text-cyan-500 tracking-[0.3em] uppercase">Análisis Completo...</h2>
              </div>

              <div className="space-y-4 font-mono">
                <p className="text-gray-500">Procesando identidades rescatadas...</p>
                <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden max-w-xs mx-auto">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3 }}
                    className="h-full bg-cyan-500"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.5 }}
                >
                  <p className="text-white text-3xl font-bold mt-8">
                    <GlitchText text="COINCIDENCIA DETECTADA: 100%" active />
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* SCENE: REVEAL */}
          {scene === 'REVEAL' && (
            <motion.div 
              key="reveal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-8"
            >
              <div className="mb-12">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="w-40 h-40 rounded-full border-4 border-dashed border-purple-500 mx-auto flex items-center justify-center"
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 shadow-[0_0_50px_rgba(168,85,247,0.5)]" />
                </motion.div>
              </div>

              <h2 className="text-5xl font-bold tracking-tighter">
                Capitana Ammi...
              </h2>

              <div className="space-y-8 text-2xl font-light text-gray-300 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  No estabas rescatando a 15 personas diferentes.
                </motion.p>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 3 }}
                  className="text-white font-medium"
                >
                  Estabas recuperando <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold">15 partes de ti misma.</span>
                </motion.p>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6 }}
                onClick={() => setScene('FINAL')}
                className="mt-8 px-8 py-3 rounded-full border border-white/20 hover:border-white/50 transition-all text-sm uppercase tracking-widest text-gray-400 hover:text-white"
              >
                Recibir Mensaje Final
              </motion.button>
            </motion.div>
          )}

          {/* SCENE: FINAL */}
          {scene === 'FINAL' && (
            <motion.div 
              key="final"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full text-center space-y-12"
            >
              <div className="space-y-6 max-w-lg mx-auto p-8 rounded-[40px] bg-gradient-to-b from-purple-900/40 to-transparent border border-white/10 backdrop-blur-xl relative">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 p-4 bg-purple-600 rounded-2xl shadow-xl shadow-purple-900/50">
                  <Sparkles size={32} />
                </div>

                <div className="space-y-6 pt-4 text-xl md:text-2xl font-light text-white leading-tight italic">
                  <p>“Hija… lo que ves como debilidad… es parte del diseño que Dios puso en ti.”</p>
                  <p>“No estás incompleta… estás en proceso.”</p>
                  <p className="text-3xl not-italic font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-purple-400">“Y nunca has estado sola.”</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                 <button 
                  onClick={() => handleSpeak("Hija. Lo que ves como debilidad, es parte del diseño que Dios puso en ti. No estás incompleta, estás en proceso. Y nunca has estado sola.")}
                  className={`flex items-center justify-center gap-2 text-sm uppercase tracking-widest transition-colors ${isSpeaking ? 'text-cyan-400' : 'text-white/60 hover:text-white'}`}
                >
                  <Volume2 size={20} className={isSpeaking ? 'animate-bounce' : ''} />
                  <span>{isSpeaking ? 'Voz del sistema activa...' : '🔊 Escuchar mensaje final'}</span>
                </button>

                <div className="p-4 bg-white rounded-2xl shadow-2xl">
                  <QRCodeSVG value={VIDEO_URL} size={150} />
                </div>
                <div className="space-y-2">
                  <p className="text-purple-400 font-bold tracking-widest uppercase">Misión Completada</p>
                  <p className="text-xs text-gray-500">Escanea para ver el mensaje final</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => window.location.reload()}
                className="text-xs text-gray-600 hover:text-gray-300 transition-colors uppercase tracking-[0.3em]"
              >
                Reiniciar Simulación
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Progress Footer for WORLD scene */}
      {scene === 'WORLD' && (
        <div className="fixed bottom-0 left-0 w-full p-4 z-20 pointer-events-none">
          <div className="max-w-md mx-auto h-1 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
                className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
                animate={{ width: `${progress}%` }}
             />
          </div>
        </div>
      )}
    </div>
  );
}
