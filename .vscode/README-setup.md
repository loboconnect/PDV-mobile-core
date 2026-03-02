# Configurações e próximos passos (VS Code workspace)

Resumo rápido das ações aplicadas automaticamente neste workspace:

- Arquivos adicionados em `.vscode/`:
  - `settings.json` — formatOnSave, Prettier como formatter, Codeium configs, ESLint, icon theme, etc.
  - `launch.json` — configuração de debug Node + Chrome (Debug PDV App)
  - `tasks.json` — tarefas npm (install, start, dev, ESLint, prettier, npm audit)
  - `extensions.json` — recomendações de extensões solicitadas

O que precisa de autorização manual / ações do usuário:

- Instalar as extensões recomendadas (VS Code Web/Server):

  ```bash
  code --install-extension dbaeumer.vscode-eslint
  code --install-extension esbenp.prettier-vscode
  code --install-extension Codeium.codeium
  code --install-extension eamodio.gitlens
  code --install-extension ritwickdey.live-server
  code --install-extension rangav.vscode-thunder-client
  code --install-extension PKief.material-icon-theme
  code --install-extension christian-kohler.path-intellisense
  code --install-extension formulahendry.auto-rename-tag
  code --install-extension Coenraads.bracket-pair-colorizer-2
  code --install-extension ms-vscode.vscode-typescript-next
  code --install-extension ms-vscode-remote.remote-ssh
  code --install-extension ms-azuretools.vscode-docker
  code --install-extension ms-mssql.mssql
  code --install-extension noldi.error-lens
  ```

- Ativação do modo agente IA / MCPs / privacidade: revisar e ajustar as políticas da organização e extensões de IA (Codeium, GitHub Copilot, etc.). Algumas configurações sensíveis não podem ser forçadas por arquivos de workspace.

- Segurança automática sugerida (manual/ops):
  - Habilitar um scanner contínuo (ex.: CI rodando `npm audit` e ferramentas SCA)
  - Adicionar pré-commit hooks (husky) para rodar `npm audit` / `eslint` / `prettier`
  - Revisar variáveis de ambiente e evitar commitar `.env` (use `.gitignore`)

Comandos rápidos úteis:

```bash
# Rodar auditoria de dependências
npm audit --audit-level=moderate

# Instalar dependências do projeto
npm install

# Rodar linter
npx eslint src/**/*.js

# Formatar todo o código do src
npx prettier --write "src/**/*.{js,jsx,ts,tsx}"
```

Se quiser, eu posso também:

- Instalar automaticamente as extensões no dev container (se permitido).
- Adicionar hooks de commit (`husky`) e pipeline básico de CI para auditoria e scan de segredos.
- Criar templates de PR e CHANGELOG automático básico.
