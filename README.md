
# 🧑‍💻 User Service

Este é o **User Service**, responsável pelo gerenciamento de usuários, permissões e roles. Ele faz parte de uma arquitetura de microsserviços.

---

## ✅ Funcionalidades

- ✅ CRUD de usuários
- ✅ Gerenciamento de permissões
- ✅ Gerenciamento de roles
- ✅ Autenticação e autorização com validação de permissões e roles
- ✅ Documentação de rotas via **Swagger**
- ✅ Exposição de métricas para **Prometheus**

---

## 🚀 Como rodar

1. **Criar a Docker Network compartilhada**

Antes de subir os containers, crie a rede compartilhada:

```bash
docker network create rede-compartilhada
```

2. **Subir o serviço**

Em seguida, rode:

```bash
docker-compose up --build
```

O serviço ficará disponível em:

- API: `http://localhost:5032`
- Swagger: `http://localhost:5032/api-docs`
- Métricas: `http://localhost:5032/metrics`

---

## ⚙️ Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 📖 Documentação

Acesse a documentação completa da API gerada automaticamente pelo **Swagger**:

```
http://localhost:5032/api-docs
```

---

## 📊 Métricas

As métricas de monitoramento para o **Prometheus** podem ser acessadas em:

```
http://localhost:5032/metrics
```
