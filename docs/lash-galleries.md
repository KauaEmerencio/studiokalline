# Fotos dos modelos de cílios

As cinco listas ficam em `src/data/site.ts`, em `LASH_STYLES.models[].photos`.
A primeira foto é a capa do cartão e a foto inicial do modal. Cada lista é
independente; a galeria geral `GALLERY_IMAGES` não participa dessas listas.

## Mapeamento dos originais

| Modelo | Arquivos, na ordem de exibição |
| --- | --- |
| Fox Eyes | `Modelofox.jpeg`, `ModeloFox2.jpeg`, `modelofox3.jpeg` |
| Volume Brasileiro | `VolumeBrasileiro.jpeg`, `VolumeBrasileiro2.jpeg` |
| Volume Class | `VolumeClass.jpeg`, `VolumeClass2.jpg` |
| Volume Egípcio | `VolumeEgipcio.jpeg`, `VolumeEgipcio2.jpeg`, `VolumeEgipcio3.jpg` |
| Volume Glamour | `VolumeGlamuor.jpeg`, `VolumeGlamuor2.jpeg`, `VolumeGlamour3.jpg` |

Preserve maiúsculas, minúsculas e extensões. `VolumeClass.jpeg`,
`VolumeClass2.jpg` e `VolumeGlamour3.jpg` contêm HEIC, apesar das extensões.
O navegador recebe WebP; os arquivos originais são preservados.

## Adicionar uma foto

1. Salve o original em `src/assets/gallery/`, com nome único.
2. Com Pillow e pillow-heif disponíveis, execute a ferramenta existente:

   ```powershell
   python scripts/optimize-lash-images.py --source "ModeloFox4.jpeg" --name fox-eyes-4 --widths 480 1920
   ```

   Se o decodificador estiver em um diretório separado, use `--decoder-path`.
   A ferramenta informa as dimensões e os caminhos gerados, aplica a orientação
   EXIF e limita cada largura à resolução original. Fotos menores não são ampliadas;
   larguras repetidas geram somente um arquivo.

3. Importe os WebPs em `src/data/site.ts` e acrescente um objeto ao array `photos`
   do modelo correto:

   ```ts
   {
     id: "fox-eyes-4",           // estável e único
     source: "ModeloFox4.jpeg",  // nome real do original, para conferência
     alt: "Extensão de cílios no estilo Fox Eyes — foto 4",
     src: fox4Preview,
     width: 480,                 // dimensões reais da prévia gerada
     height: 853,
     fullSrc: fox4Full,
     fullWidth: 1920,            // use os valores informados pela ferramenta
     fullHeight: 3413,
   }
   ```

   Se houver apenas uma versão, omita `fullSrc`, `fullWidth` e `fullHeight`.
   `srcSet` e `objectPosition` são opcionais. Para uma nova capa, ajuste o
   `objectPosition` após conferir o enquadramento 4:3.

4. Execute `npm run build` e `npm run lint` e confira o cartão e o modal.

O contador é calculado pela lista, sem ajuste manual. Uma lista vazia mantém o
espaço reservado sem botão; uma única foto dispensa as setas. O modal carrega
somente a foto atual, sem reprodução automática ou pré-carregamento das demais.
