# leaky_bucket

# Gera o token

Para gerar um token de acesso JWT, execute o seguinte comando:

```bash
npm run gen-token
```

# Inicia o servidor

```bash
npm run dev
```

# Simulação de consulta pix

A mutation queryPixKey simula uma consulta pix, onde a consulta é feita com um random de 80% de sucesso, onde retorna mensagem de erro caso não seja sucesso, o token só é consumido caso a consulta seja sucesso.

# Leaky Bucket - TenantStore:

Logica de controle de requisicoes baseada em LB e implementada por usuário multi-tenant.

## Regras:

- Cada usuário começa com 10 tokens.
- A cada 1 hora, 1 token é reposto.
- Tokens são armazenados em memória, (poderia ser substituido por Redis ou banco de dados)

Elapsed recebe o que se passou desde a última recarga.
RefillCount calcula quantos "ciclos de recarga" já passaram. Exemplo: se o intervalo de recarga (REFILL_INTERVAL_MS) é de 1h (3600000ms) e se passaram 2 horas, ele retorna 2.
Conta com uma validação que adiciona tokens ao balde, garante que não ultrapasse o limite e atualiza o timestamp da última recarga.
