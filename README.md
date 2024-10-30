# 🏬 Physical Store

Este projeto é uma aplicação em TypeScript para localizar lojas em um raio de 100 km a partir do CEP fornecido pelo cliente. Utiliza as APIs do ViaCEP e do Google Geocoding para transformar CEP em coordenadas e calcular a proximidade. A estrutura segue o padrão de **Clean Architecture**, garantindo uma organização modular, escalável e fácil de manter.

## ✨ Funcionalidades

- 🔍 **Busca de lojas próximas**: Encontre lojas em um raio de 100 km com base no CEP do cliente.
- 📍 **Geocodificação de Endereços**: Conversão de endereços em coordenadas usando a API do Google Geocoding.
- 📦 **Estrutura Modular**: Separação da lógica de negócios, camadas de infraestrutura e repositórios de dados.
- 🧩 **Independência de Banco de Dados e Frameworks**: Implementação de repositórios para diferentes bancos de dados (In-Memory, MongoDB e SQLite) sem uso de ORM.
- 🚀 **Documentação com Swagger**: API documentada para fácil navegação e teste de endpoints.

## 🚀 Tecnologias Utilizadas

- **Node-Fetch**
- **TypeScript**
- **TSX**
- **Express**
- **Vitest**
- **Winston**
- **DotEnv**
- **Zod**
- **APIs Externas**: ViaCEP, Google Geocoding
- **MongoDB e SQLite** (opcional, poderia ser substituído pelo modulo Net do proprio Node.js para realizar a conexão com o banco de dados)
- **Swagger** para documentação

## 📁 Estrutura do Projeto

```plaintext
src
├── domain
│   └── store
│       ├── store.entity.ts       # Entidade de Loja
│       └── store.repository.ts   # Interface do Repositório
├── application
│   └── store
│       ├── dto            # Objetos de Transferência de Dados (DTOs)
│       ├── use-case       # Casos de Uso, encapsulando a lógica de negócios
│       └── errors         # Erros personalizados para tratamento específico
├── infra
│   ├── config             # Configurações de ambiente e logger
│   ├── http
│   │   ├── controllers    # Controladores da API
│   │   ├── express        # Configuração do Express
│   │   ├── external       # Integrações com APIs externas
│   │   ├── middleware     # Middlewares, incluindo o tratador de erros
│   │   └── routes         # Definição das rotas
│   ├── repositories       # Implementações de repositórios (In-Memory, MongoDB, SQLite)
│   └── util               # Funções utilitárias, como cálculo de distância
└── README.md
```

## ⚙️ Pré-requisitos

- Node.js (v16 ou superior)
- TypeScript
- Conta no Google Cloud para acesso à API de Geocodificação
- MongoDB ou SQLite (opcional, dependendo da escolha do repositório)

## 🔧 Configuração

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/luisfelipe03/Prog-Bolsas-AGO24-Desafio-2.git
    cd Prog-Bolsas-AGO24-Desafio-2
    ```

2. **Instale as dependências**:

    ```bash
    npm install
    ```

3. **Configuração do ambiente**:

    Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente:

    ```plaintext
    NODE_ENV=development
    GOOGLE_GEOCODING_API_KEY=YOUR_GOOGLE_API_KEY
    DATABASE_URL=https://viacep.com.br/ws
    PORT=3000
    ```

4. **Documentação da API com Swagger**:

   Acesse o Swagger em `[http://localhost:3000/api-docs](http://localhost:3000/api-docs)` para ver a documentação dos endpoints.

## 📝 Principais Casos de Uso

- **Criação de Loja**: Endpoint para cadastrar uma nova loja.
- **Busca por Lojas Próximas**: Busca lojas em um raio de 100 km do CEP fornecido.
- **Busca por Loja Pelo ID**: Encontre uma loja específica pelo ID.
- **Busca Lojas em um Estado**: Encontre lojas em um estado específico.
- **Atualização e Exclusão de Lojas**: Gerencie as lojas existentes na aplicação.

### Exemplos de Requisições

#### 🔹 Buscar Lojas Próximas

**Endpoint**: `/stores/nearby/:cep`

```http
GET /stores/nearby/12345678
```

**Parâmetro**:
- `cep`: CEP do cliente que está realizando a busca.

#### 🔹 Criar uma Nova Loja

**Endpoint**: `/stores`

```http
POST /stores
```

**Body**:

```json
{
  "name": "Nome da Loja",
  "phone": "Telefone da Loja",
  "zip": "12345678"
}
```
## 📜 Documentação completa da API com Swagger

Para acessar a documentação Swagger, rode a aplicação e abra [http://localhost:3000/api-docs](http://localhost:3000/api-docs) no navegador. Aqui você encontrará todos os endpoints, parâmetros e exemplos de respostas.

## 🚦 Testes

Eles são fundamentais para garantir que a lógica de negócio esteja funcionando como esperado.

Para rodar os testes:

```bash
npm run test
```

ou, para rodar os testes em modo watch:

```bash
npm run test:watch
```

## 🌱 Seed de Dados

Para facilitar o desenvolvimento e testes, você pode carregar dados de exemplo nos repositórios usando os scripts de seed disponíveis em `src/infra/repositories`.

## 🎯 Middleware e Tratamento de Erros

A aplicação utiliza um middleware personalizado para tratamento de erros. No diretório `errors`, temos erros específicos, como `address-not-found-error.ts` e `invalid-zip-error.ts`, que são gerenciados pelo `errorHandler.ts`, centralizando o tratamento de erros e melhorando o feedback ao usuário.

## 📝 DTOs (Data Transfer Objects)

Os DTOs, localizados em `src/application/store/dto`, garantem a consistência de dados entre as camadas. Exemplos incluem:

- `create-store-input.dto.ts`: Dados para criar uma nova loja.
- `find-store-nearby-output.dto.ts`: Estrutura da resposta para a busca de lojas próximas.


## 🏢 Repositórios de Dados

A aplicação oferece suporte a diferentes tipos de repositórios:

- **In-Memory**: Ideal para desenvolvimento e testes.
- **MongoDB e SQLite**: Para uso em produção. Troque facilmente entre repositórios sem alterar a lógica de negócios, seguindo a interface de repositório definida em `store.repository.ts`.

## 📏 Utilitários

Funções utilitárias estão disponíveis em `src/infra/util`, incluindo:

- **Haversine**: Calcula a distância entre coordenadas geográficas para definir quais lojas estão no raio de 100 km.