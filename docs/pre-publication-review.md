# Revisão técnica antes da publicação

Revisão local de 16/11/2026. Não foram feitos commit, push ou deploy.

## Escopo e preservação do trabalho

Foram lidos README, documentação das galerias, configurações e componentes.
Não foi encontrado AGENTS.md no checkout ou no diretório pai/raiz da unidade.
O Git já continha alterações em Hero.tsx, Footer.tsx, LashPhotoDialog.tsx e
site.ts. Elas foram preservadas; a correção anterior do modal não foi revertida.
Os 23 originais de fotografia conferidos mantiveram seus hashes SHA-256.
Nenhuma dependência foi adicionada, removida ou atualizada.

## Achados, impacto e tratamento

| Impacto | Evidência | Tratamento |
| --- | --- | --- |
| Médio: desempenho | A rede baixava os dois JPEGs do hero em todas as larguras, incluindo o arquivo oculto; 1.970.265 bytes. | Um picture seleciona a imagem correta. WebPs com a mesma resolução, prioridade alta e sem lazy loading. Originais preservados. |
| Médio: acessibilidade | Contraste mínimo do texto branco no gradiente rosa: 2,07:1. Texto secundário do rodapé também usava opacidade muito baixa. | Gradiente usa rose-600/700, mínimo de 5,02:1 sem brilho; brilho de hover reduzido a 5%. Rodapé usa cream/60. |
| Médio: acessibilidade | O carrossel se movia continuamente sem controle de pausa; autoplay continuava com movimento reduzido. | Controle de pausa/retomada na área de espaçamento existente; autoplay desativado com prefers-reduced-motion e fora da região visível. MotionConfig respeita a preferência nas animações React. |
| Médio: teclado e legibilidade | O menu executava blur ao abrir e não fechava com Esc. O cabeçalho transparente usava texto/logo escuros também sobre o rodapé escuro. | Foco preservado; Esc fecha e retorna ao acionador; associação aria-controls e nome da navegação. Fundo creme fora do hero garante leitura; a transparência sobre a foto do hero foi mantida. |
| Médio: texto ampliado | Em texto a 200%, os contatos do rodapé saíam da tela, um rótulo social transbordava, títulos dos diferenciais encostavam e os CTAs cortavam linhas ou usavam entrelinha insuficiente. | Contatos podem reorganizar-se; e-mail, rótulos e diferenciais quebram; CTAs usam altura mínima e entrelinha adequada e podem crescer. Dimensões normais preservadas. |
| Médio: robustez | A capa do cartão assumia que photos e src sempre existiam. | Leitura defensiva no cartão, coerente com o tratamento de dados ausentes do modal. |
| Baixo: semântica/documentação | H1 era seguido por H3 sem H2 nos diferenciais; README descrevia placeholders e fonte que já não correspondem ao projeto. | H2 invisível para o grupo; títulos de colunas do rodapé em H2 sem mudança de estilo; README atualizado. |
| Baixo: metadados | Espaçamento inconsistente no title e locale de compartilhamento ausente. | Title normalizado e og:locale pt_BR. Textos comerciais preservados. |

O controle de pausa atende à necessidade de interromper movimento automático
apresentado junto a outro conteúdo, conforme a
[orientação do W3C sobre pausa, parada e ocultação](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide).
Isso não constitui certificação completa de conformidade WCAG.

## Galerias e erro anterior

O contrato atual usa LASH_STYLES.models[].photos, e não model.image. A correção
anterior em LashPhotoDialog.tsx foi preservada e ganhou testes persistentes.
As 13 fotos continuam em cinco listas independentes, verificadas contra
docs/lash-galleries.md e contra os arquivos originais, inclusive a capitalização.
Nenhuma foto da galeria geral entra nessas listas.

O modal conserva dialog nativo na camada superior, foco contido, setas,
contador, gestos e mensagem de erro. Os testes verificam que o conteúdo principal
permanece montado, que a URL da foto corresponde ao modelo e índice selecionados,
e que fechar restaura foco, overflow, padding e posição vertical.

## Desempenho medido

Tamanhos em KB decimais. Os downloads do hero foram observados em contextos de
navegador novos. Gzip de JS/CSS foi calculado com o mesmo zlib antes e depois.

| Medida | Antes | Depois | Resultado |
| --- | ---: | ---: | --- |
| Hero baixado em 360, 390 e 768 px | 1.970,3 KB | 23,7 KB | Redução de 98,8%; uma imagem em vez de duas |
| Hero baixado em 1440 px | 1.970,3 KB | 95,3 KB | Redução de 95,2%; uma imagem em vez de duas |
| JavaScript minificado | 446,2 KB | 449,1 KB | +2,9 KB para os controles e tratamento de acessibilidade |
| JavaScript gzip | 143,2 KB | 144,1 KB | +0,9 KB; não houve alegação de redução de JS |
| CSS minificado | 29,46 KB | 29,51 KB | Praticamente estável |

As fotos ampliadas não são baixadas antes da abertura, e somente a foto atual
é carregada. As capas mantêm srcSet e WebPs existentes; imagens de seções
inferiores usam loading=lazy. Não houve recompressão das fotos dos cílios.

A análise de sourcemap em uma cópia local identificou React DOM, Motion e
Swiper como os principais grupos de código. Seus fontes antes da minificação
tinham aproximadamente 545, 479 e 206 KB, respectivamente; esses valores não são
parcelas exatas do bundle minificado. Todos são usados. Não houve troca de
biblioteca, divisão artificial em chunks ou memoização sem evidência.
Os sourcemaps da análise ficam em pasta ignorada, e não no dist final.

As medições locais de CLS ficaram próximas de zero nas navegações observadas.
LCP local sem limitação de rede não foi usado como prova de ganho de Core Web
Vitals. É necessário medir o ambiente público e usuários reais após publicar.

## Verificações de publicação, SEO e segurança

- Vite compila para dist; aplicação tem uma única rota pública, /, com navegação
  por fragmentos. Não existe router que justifique uma regra genérica de rewrite.
  Acesso direto a /#estilos e atualização da página são exercitados no navegador.
- Para Vercel, usar preset Vite, comando npm run build e saída dist. A
  [documentação oficial do Vite](https://vite.dev/guide/static-deploy#vercel)
  descreve a detecção automática. Não foi executado deploy nem validada uma conta
  Vercel ou sua configuração remota.
  O build local usou Node 20.19.2. Para a publicação, selecionar uma versão
  suportada na hospedagem e repetir o build nela; a Vercel documenta
  [Node 24 LTS para builds](https://vercel.com/changelog/node-js-24-lts-is-now-generally-available-for-builds-and-functions).
  A execução neste ambiente não certifica um build remoto em outra versão.
- Idioma pt-BR, título, descrição, favicon SVG, Open Graph title/description/type
  e locale presentes. Nenhum noindex foi encontrado no código ou HTML gerado.
- Não existem robots.txt, sitemap, canonical ou og:image configurados. A ausência
  foi registrada; nenhum domínio definitivo foi inventado. Preparar canonical,
  sitemap e imagem absoluta de compartilhamento quando o domínio for confirmado.
  Também conferir eventual X-Robots-Tag/proteção de acesso no ambiente publicado.
- Links externos usam noopener/noreferrer; não há dangerouslySetInnerHTML, eval,
  uso de variáveis VITE_* ou scripts de rastreamento no código da aplicação.
  VITE_* deve sempre ser tratado como público se vier a ser usado.
- A busca por padrões comuns de credenciais nos fontes e bundle não encontrou
  correspondências. Não foram encontrados arquivos .env no projeto. Essa busca
  não substitui uma auditoria completa de histórico Git ou de infraestrutura.
- Há requisições para Google Fonts. Não foi observado uso de cookies,
  localStorage ou sessionStorage pela aplicação nos fluxos testados. Não foram
  instalados banner, analytics ou novas integrações.
- npm audit --json retornou zero vulnerabilidades conhecidas para a árvore
  instalada no momento da consulta. Não foi usado audit fix nem --force.
- StickyCTA, GazeLine e PlaceholderPhoto não têm consumidores no fluxo atual e
  não aparecem no sourcemap do bundle. Foram mantidos como componentes de apoio;
  removê-los não reduziria o download atual. As dependências de produção são usadas.

## Comandos e reprodução

```text
npm run build
npm run lint
npm run check:integrity
npm test
npm audit --json
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
node scripts/test-production.cjs <caminho-ou-nome-do-playwright> http://127.0.0.1:4173
```

check:integrity valida os 81 imports locais de 20 arquivos de fonte, com
capitalização exata, e procura padrões comuns de credenciais sem imprimir valores.
npm test executa oito regressões sem adicionar bibliotecas: mapeamento das 13
fotos, contrato photos[], array/foto/URL ausentes, foto única e fallback da prévia.
Playwright é uma ferramenta opcional de QA, obtida da instalação já disponível
neste ambiente; não foi acrescentado às dependências do site.

O roteiro de produção cobre 360, 390, 768 e 1440 px, com inspeção de console e
rede; cinco galerias, 13 fotos, 15 aberturas por largura; botão/Esc/fundo;
setas, Tab/Shift+Tab, Enter, toque nos tamanhos móveis e foco/rolagem. Também
cobre 404 em cada um dos cinco modelos no desktop e celular, pausa/retomada e
parada fora da tela, movimento reduzido, reflow equivalente a 200% e ampliação
textual a 200%, âncoras, IDs, alt, links seguros e atualização da rota pública.

Capturas, métricas antes/depois e resultados detalhados ficam em
.landing-validation.local, ignorada pelo Git. A validação final é registrada
em .landing-validation.local/production-review/results.json.

Resultados obtidos: build/TypeScript e lint sem erros; 81 imports locais
conferidos; oito testes de regressão aprovados; 60 aberturas distribuídas nas
quatro larguras; dez falhas HTTP simuladas recuperadas sem desmontar a página;
testes de movimento reduzido, texto/reflow a 200% e acesso direto aprovados.
Nenhum erro inesperado de console, execução ou rede nos fluxos normais. As
respostas 404 provocadas no teste são intencionais. A revisão visual complementou
as asserções e identificou os ajustes finais de quebra e entrelinha.

## Arquivos desta revisão

- Hero.tsx, src/assets/optimized/hero-*.webp e scripts/optimize-hero-images.py:
  imagem responsiva e derivados reproduzíveis.
- Header.tsx, Gallery.tsx, main.tsx: teclado, movimento reduzido e controle do carrossel.
- CTAButton.tsx, Footer.tsx, SocialLinks.tsx e tailwind.config.js: contraste e texto ampliado.
- Benefits.tsx e index.html: semântica e metadados.
- LashStyles.tsx: proteção na leitura das capas.
- package.json e scripts/check-integrity.mjs, gallery-test-utils.cjs,
  lash-galleries.test.cjs e test-production.cjs: verificações reproduzíveis.
- README.md e este relatório: documentação atualizada.

site.ts e LashPhotoDialog.tsx aparecem modificados no Git por trabalho anterior;
não receberam novas alterações nesta etapa.

## Pendências e limites

1. Confirmar domínio definitivo e completar os metadados dependentes dele.
2. A imagem móvel original tem somente 302 × 533 px. Sua resolução foi mantida;
   uma foto original maior seria necessária para melhorar a nitidez em telas
   densas, sem ampliação artificial.
3. Testes foram feitos no Chromium local, com celular e zoom simulados. Não
   equivalem a testes físicos de iPhone/Safari, Android ou leitor de tela.
4. Destinos de agendamento, WhatsApp e redes sociais tiveram URLs e atributos
   verificados, mas não foi realizado agendamento real, envio de mensagens ou
   certificação dos serviços externos. Conferir o fluxo comercial manualmente.
5. DNS, HTTPS, cache/CDN, headers de resposta, indexação efetiva e métricas de
   campo dependem da publicação definitiva e permanecem fora desta etapa.
