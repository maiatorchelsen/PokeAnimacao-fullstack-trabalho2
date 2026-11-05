# Pokémon Cards 3D

Galeria de Pokémon com um carrossel 3D em forma de anel, construído com **React**, **TypeScript**, **Vite**, **Tailwind CSS** e **Framer Motion**.

As cartas giram continuamente em perspectiva, cada uma com o sprite oficial do Pokémon obtido da [PokeAPI](https://pokeapi.co/), e podem ser filtradas por tipo.

## Funcionalidades

- **Carrossel 3D em anel**: as cartas são posicionadas em círculo com `rotateY` + `translateZ`, criando profundidade e perspectiva reais.
- **Normalização de perspectiva**: o anel é reescalado automaticamente para que a carta da frente mantenha sempre o mesmo tamanho na tela, mesmo adicionando mais Pokémon.
- **Sem textos espelhados**: `backface-visibility` oculta as cartas que viram de costas, evitando nomes e imagens invertidos.
- **Filtros por tipo**: `Todos`, `Fogo`, `Água`, `Normal` e `Planta`. Os filtros com poucas cartas são repetidos para manter o anel cheio e sem espaços vazios.
- **Interação**: a rotação pausa ao passar o mouse e as cartas dão zoom/inclinação no hover.
- **Layout compacto e responsivo**: conteúdo centralizado, cartas próximas aos filtros e escala adaptada para telas menores.

## Tecnologias

| Tecnologia     | Uso                          |
| -------------- | ---------------------------- |
| React 19       | Interface e componentes      |
| TypeScript     | Tipagem estática             |
| Vite           | Build e servidor de dev      |
| Tailwind CSS 3 | Estilização                  |
| Framer Motion  | Animações e movimento 3D     |

## Como executar

```bash
# instalar dependências
npm install

# rodar em modo de desenvolvimento
npm run dev

# gerar build de produção
npm run build

# visualizar o build
npm run preview
```

Depois de `npm run dev`, abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## Estrutura do projeto

```
PokeAnimations/
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig*.json
├── .gitignore
├── README.md
└── src/
    ├── App.tsx        # Galeria, carrossel 3D e filtros
    ├── index.css      # Tailwind + fundo da página
    ├── main.tsx       # Ponto de entrada do React
    └── vite-env.d.ts
```

## Como funciona o carrossel

1. A lista de Pokémon é filtrada pelo tipo selecionado.
2. Cada carta recebe um ângulo (`passoAngulo * indice`) e é posicionada com
   `rotateY(ângulo) translateZ(raio)`.
3. O grupo inteiro gira continuamente via `useAnimationFrame` e `useMotionValue`.
4. O raio cresce com a quantidade de cartas para evitar sobreposição, e uma escala
   de normalização compensa o efeito de perspectiva, mantendo o tamanho visual
   constante.
5. As cartas que passam de 90° ficam com a face traseira virada para o usuário e
   são escondidas com `backface-visibility: hidden`.

## Dados dos Pokémon

Os sprites são carregados diretamente do repositório oficial de imagens da PokeAPI:

```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png
```
