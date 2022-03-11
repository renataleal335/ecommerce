# ecommerce

Necessário Node.js instalado em sua máquina.

## Instalação

# instale as dependẽncias do projeto

```
$ npm install
```

# entre na pasta do front-end

$ cd ecommerce

#instale as dependẽncias do front-end
$npm install

# Inicie o servidor front-end

$npm run serve

Agora teremos o front-end rodando na porta : 8080

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Funcionalidades do projeto
Lista de todos os produtos disponíveis para compra;
Filtro que possibilita visualizar os itens da lista de acordo com sua categoria;
Adicionar ou remover quantidade do mesmo item no carrinho de compras;
Valor total da compra;

## Como funciona
O front-end da aplicação foi desenvolvido em Vue.js (framework JavaScript). O projeto foi construído com o Vue CLI, que facilita a configuração e geração da aplicação Vue.js, Este rodando na porta 8080 (http://localhost:8080).

A aplicação mencionada, é composta por 5 componentes:

<TheHeader.vue />: Cabeçalho com endereços do usuário e número total de itens adicionados para compra;
<ProductsList />: Página que contém a lista de produtos disponíveis para compra;
<ModalProduct />: Modal responsável pelo controle de quantidades de itens que serão adicionados para compra;
<Checkout/> : Página que contém a listagem do total de itens adicionados ao carrinho de compras, nele também é possível controlar a quantidade de itens adicionados para compra;  (adicionar ou remover) e finalizar compra;
<Busca/> : Componente figurativo para representar busca de produtos;

Os componentes mencionados a cima são renderizados no "App.vue", que seria o componente raiz da aplicação. Ele define o template da nossa página. Essa aplicação foi construída sem utilizar comunicação com uma API, os itens cadastrados são armazenados utilizando a funcionalidade do localStorage, que consiste em salvar, adicionar, recuperar ou excluir dados localmente no próprio navegador do usuário.

O framework BootstrapVue, foi usado para fazer a resposividade e estilização dos elementos da aplicação.

## Tecnologias
Abaixo estão as tecnologias e depêndencias utilizadas no desenvolvimento do projeto.

Vue.js: Framework JavaScript Progressivo, usado para desenvolver interfaces de usuário dinâmicas com HMTL, CSS e JS.
BootstrapVue: Framework front-end com uma grande coleção de códigos CSS, foi usado no projeto para fazer a estilização e responsividade.
Node.js: Ambiente JavaScript no lado do servidor.
