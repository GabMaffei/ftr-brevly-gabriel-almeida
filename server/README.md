## Descrição do Projeto

O **<span style="color: #8e44ad;">Brev.ly</span>** é uma aplicação FullStack desenvolvida como parte do desafio da pós-graduação Tech Developer 360, da Faculdade de Tecnologia Rocketseat (FTR), com o objetivo de criar um encurtador de URLs moderno e eficiente. O sistema permite cadastrar, listar e remover links encurtados, além de gerar relatórios detalhados sobre os acessos de cada link e realizar o redirecionamento automático das URLs encurtadas para seus destinos originais.

Este projeto proporciona experiência prática nas áreas de Frontend, Backend e DevOps, integrando conceitos essenciais para o desenvolvimento de aplicações web completas. A interface e os fluxos do sistema seguem o design proposto pelo curso.

## Funcionalidades Principais

- [x] Deve ser possível criar um link

  - [x] Não deve ser possível criar um link com URL encurtada mal formatada
  - [x] Não deve ser possível criar um link com URL encurtada já existente

- [x] Deve ser possível deletar um link

- [x] Deve ser possível obter a URL original por meio de uma URL encurtada

- [x] Deve ser possível listar todas as URL’s cadastradas

- [x] Deve ser possível incrementar a quantidade de acessos de um link

## Exportação de Dados

- [x] Deve ser possível exportar os links criados em um CSV
  - [x] Deve ser possível acessar o CSV por meio de uma CDN (Amazon S3, Cloudflare R2, etc)
  - [x] Deve ser gerado um nome aleatório e único para o arquivo
  - [x] Deve ser possível realizar a listagem de forma performática
  - [x] O CSV deve ter campos como: URL original, URL encurtada, contagem de acessos e data de criação.
