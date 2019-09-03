Para este teste usei ReactJS com o pacote create-react-app usando o máximo possível o paradigma functional com React Hooks.

## Recursos adicionais

- Yarn (gerenciador de dependências);
- Material UI (Componentes de interface);
- Axios (Cliente HTTP);
- PropTypes (Tipagem de propriedades);
- React-input-mask (Máscaras em campo de texto);
- Redux (Gerenciador de estado global);
- Redux-saga (Requisições assíncronas);
- Testing-library/react (Biblioteca de testes integrados ao Jest).

## Instalação

O projeto está no GitHub, abra uma pasta no terminal do seu computador e use os comandos abaixo:

```sh
$ git clone https://github.com/leandrocorso/easycarros.git
$ cd easycarros
$ yarn install
$ yarn start
```

A aplicação irá rodar em [http://localhost:3000](http://localhost:3000) e depende da API fornecida rodando em [http://localhost:8181](http://localhost:8181).

## Testando

Para os testes tentei seguir as instruções de uso como uma `User Story`, não me preocupei tanto com a renderização em si, mas ao seu funcionamento dentro da proposta. Não usei mocks, então para os testes funcionarem a API precisa estar rodando. Para executar os testes abra a pasta do projeto no terminal e digite:

```sh
$ yarn test
```

## Problemas enfrentados

Tive dificuldades em acessar a API por causa da diretiva de segurança `CORS (Cross-Origin Resource Sharing)`. Não quis alterar a API para desabilitar o CORS na aplicação, então optei por desativar no Chrome com o seguinte comando:

### Linux

```sh
$ google-chrome --disable-web-security --user-data-dir="/var/tmp/Chrome"
```

Não testei no Windows e nem no MacOS, mas segundo o que encontrei na internet o comando é similar.

### Windows

```sh
C:\Program Files (x86)\Google\Chrome\Application\chrome.exe --disable-web-security --user-data-dir="c:/MinhaPasta"
```

### MacOS

```sh
open -n -a /Applications/Google\ Chrome.app --args --user-data-dir="/tmp/MiCarpeta" --disable-web-security
```
