import { useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from 'framer-motion';

const listaPokemons = [
  { id: 4, nome: 'Charmander', tipo: 'Fogo', cor: 'from-orange-400/80 to-red-600/80' },
  { id: 7, nome: 'Squirtle', tipo: 'Água', cor: 'from-cyan-400/80 to-blue-600/80' },
  { id: 37, nome: 'Vulpix', tipo: 'Fogo', cor: 'from-orange-300/80 to-rose-600/80' },
  { id: 54, nome: 'Psyduck', tipo: 'Água', cor: 'from-sky-300/80 to-blue-500/80' },
  { id: 58, nome: 'Growlithe', tipo: 'Fogo', cor: 'from-amber-400/80 to-red-500/80' },
  { id: 61, nome: 'Poliwag', tipo: 'Água', cor: 'from-cyan-300/80 to-indigo-500/80' },
  { id: 77, nome: 'Ponyta', tipo: 'Fogo', cor: 'from-yellow-400/80 to-orange-600/80' },
  { id: 90, nome: 'Shellder', tipo: 'Água', cor: 'from-teal-300/80 to-blue-600/80' },
  { id: 126, nome: 'Magmar', tipo: 'Fogo', cor: 'from-red-400/80 to-orange-700/80' },
  { id: 129, nome: 'Magikarp', tipo: 'Água', cor: 'from-blue-300/80 to-cyan-600/80' },
  { id: 133, nome: 'Eevee', tipo: 'Normal', cor: 'from-amber-200/80 to-stone-500/80' },
  { id: 137, nome: 'Porygon', tipo: 'Normal', cor: 'from-slate-200/80 to-gray-600/80' },
  { id: 143, nome: 'Snorlax', tipo: 'Normal', cor: 'from-slate-200/80 to-gray-600/80' },
  { id: 155, nome: 'Cyndaquil', tipo: 'Fogo', cor: 'from-orange-400/80 to-red-600/80' },
  { id: 158, nome: 'Totodile', tipo: 'Água', cor: 'from-cyan-400/80 to-blue-600/80' },
  { id: 192, nome: 'Sunflora', tipo: 'Planta', cor: 'from-yellow-400/80 to-amber-600/80' },
  { id: 194, nome: 'Wooper', tipo: 'Água', cor: 'from-sky-300/80 to-blue-500/80' },
  { id: 218, nome: 'Slugma', tipo: 'Fogo', cor: 'from-red-400/80 to-orange-700/80' },
  { id: 258, nome: 'Mudkip', tipo: 'Água', cor: 'from-cyan-400/80 to-blue-600/80' },
  { id: 270, nome: 'Lotad', tipo: 'Água', cor: 'from-teal-300/80 to-cyan-600/80' },
  { id: 322, nome: 'Numel', tipo: 'Fogo', cor: 'from-orange-400/80 to-red-600/80' },
  { id: 363, nome: 'Spheal', tipo: 'Água', cor: 'from-sky-300/80 to-blue-500/80' },
  { id: 387, nome: 'Turtwig', tipo: 'Planta', cor: 'from-green-400/80 to-lime-600/80' },
  { id: 390, nome: 'Chimchar', tipo: 'Fogo', cor: 'from-orange-400/80 to-red-600/80' },
  { id: 393, nome: 'Piplup', tipo: 'Água', cor: 'from-cyan-400/80 to-blue-600/80' },
  { id: 495, nome: 'Snivy', tipo: 'Planta', cor: 'from-green-400/80 to-lime-600/80' },
  { id: 498, nome: 'Tepig', tipo: 'Fogo', cor: 'from-orange-400/80 to-red-600/80' },
  { id: 501, nome: 'Oshawott', tipo: 'Água', cor: 'from-cyan-400/80 to-blue-600/80' },
  { id: 650, nome: 'Chespin', tipo: 'Planta', cor: 'from-green-400/80 to-lime-600/80' },
  { id: 653, nome: 'Fennekin', tipo: 'Fogo', cor: 'from-orange-400/80 to-red-600/80' },
  { id: 656, nome: 'Froakie', tipo: 'Água', cor: 'from-cyan-400/80 to-blue-600/80' },
  { id: 659, nome: 'Fletchling', tipo: 'Fogo', cor: 'from-orange-400/80 to-red-600/80' },
];

const LARGURA_CARTA = 150;
const ALTURA_CARTA = 200;
const PERSPECTIVA = 1200;
const ESCALA_FRENTE_ALVO = 1.3;

export default function GaleriaPokemon() {
  const [filtro, setFiltro] = useState('Todos');

  const cartas = useMemo(() => {
    const base = listaPokemons.filter((pokemon) => filtro === 'Todos' || pokemon.tipo === filtro);
    const origem = base.length ? base : listaPokemons;

    const minimoVagas = 8;
    const repeticoes = Math.max(1, Math.ceil(minimoVagas / origem.length));
    const vagas: typeof listaPokemons = [];
    for (let volta = 0; volta < repeticoes; volta++) vagas.push(...origem);
    return vagas;
  }, [filtro]);

  const totalVagas = cartas.length;
  const passoAngulo = 360 / totalVagas;

  // O raio cresce para acomodar mais cartas sem sobreposição.
  const raio = Math.min(
    Math.max(240, 210 / (2 * Math.sin(Math.PI / totalVagas))),
    PERSPECTIVA * 0.82
  );

  // Normalização: mantém o tamanho da carta frontal constante
  const escalaFrente = PERSPECTIVA / (PERSPECTIVA - raio);
  const normalizacao = Math.min(1.1, ESCALA_FRENTE_ALVO / escalaFrente);

  const rotacao = useMotionValue(0);
  const pausado = useRef(false);

  useAnimationFrame((_, intervalo) => {
    if (!pausado.current) {
      rotacao.set(rotacao.get() + (intervalo / 1000) * 10);
    }
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center overflow-hidden text-white">
      <div className="w-full max-w-6xl px-6 py-8">
        <header className="mb-5 text-center">
          <h1 className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
            Pokémon Cards 3D
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Carrossel 3D em perspectiva de cards pokémon com Framer Motion
          </p>
        </header>

        {/* Filtros */}
        <div className="mb-7 flex flex-wrap justify-center gap-3">
          {['Todos', 'Fogo', 'Água', 'Normal', 'Planta'].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFiltro(tipo)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                filtro === tipo
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_50px_rgba(59,130,246,0.35)]'
                  : 'bg-white/5 text-slate-200 backdrop-blur hover:bg-white/10'
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>

        {/* Palco 3D */}
        <div
          className="relative mx-auto h-[420px] w-full"
          style={{ perspective: `${PERSPECTIVA}px` }}
          onPointerEnter={() => (pausado.current = true)}
          onPointerLeave={() => (pausado.current = false)}
        >
          {/* Halo decorativo */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.20)_0%,transparent_70%)] blur-3xl" />

          {/* Escala responsiva do palco */}
          <div className="absolute inset-0 [transform:scale(0.62)] [transform-style:preserve-3d] sm:[transform:scale(0.82)] md:[transform:scale(1)]">
            {/* Normalização: mantém o tamanho da carta frontal constante */}
            <div
              className="absolute inset-0 [transform-style:preserve-3d]"
              style={{ transform: `scale(${normalizacao})` }}
            >
              <motion.div
                className="absolute left-1/2 top-1/2 -ml-[75px] -mt-[100px] [transform-style:preserve-3d]"
                style={{ rotateY: rotacao, width: LARGURA_CARTA, height: ALTURA_CARTA }}
              >
                <AnimatePresence>
                  {cartas.map((pokemon, indice) => {
                    const angulo = passoAngulo * indice;

                    return (
                      <motion.div
                        key={`${pokemon.id}-${indice}`}
                        className="absolute inset-0 [transform-style:preserve-3d]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        style={{
                          transform: `rotateY(${angulo}deg) translateZ(${raio}px)`,
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <motion.div
                          className={`relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br ${pokemon.cor} p-4 text-center shadow-[0_30px_60px_-25px_rgba(56,189,248,0.55)] backdrop-blur`}
                          style={{ backfaceVisibility: 'hidden' }}
                          initial={{ scale: 0.6 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.08, y: -8 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                        >
                          {/* Brilho superior */}
                          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent" />
                          {/* Borda inferior em relevo (efeito 3D) */}
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-black/25" />

                          <motion.img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                            alt={pokemon.nome}
                            className="relative z-10 h-24 w-24 drop-shadow-[0_20px_35px_rgba(14,165,233,0.45)]"
                            whileHover={{ rotate: [0, -8, 8, -6, 6, 0], scale: 1.12 }}
                            transition={{ duration: 0.8 }}
                          />
                          <div className="relative z-10">
                            <p className="text-base font-bold leading-tight">{pokemon.nome}</p>
                            <p className="text-[10px] uppercase tracking-[0.35em] text-white/70">
                              {pokemon.tipo}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Sombra/plataforma sob o carrossel */}
          <div className="pointer-events-none absolute bottom-6 left-1/2 h-10 w-64 -translate-x-1/2 rounded-full bg-black/50 blur-2xl" />
        </div>
      </div>
    </div>
  );
}
