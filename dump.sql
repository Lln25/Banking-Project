--Efetuar a criação do banco de dados

create database dindin

--Criação das tabelas do banco de dados 

create table usuarios (
	
  id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null

);

create table categorias (
    
    id serial primary key,
	descricao text not null
);

create table transacoes (

	id serial primary key,
  descricao text not null,
  valor integer,
  data timestamp default now(),
  categoria_id integer references categorias(id),
  usuario_id integer references usuarios(id),
  tipo text not null

)

--Comando para adicionar as categorias na tabela "descrição"

insert into categorias (descricao) VALUES
    ('Alimentação'),
    ('Assinaturas e Serviços'),
    ('Casa'),
    ('Mercado'),
    ('Cuidados Pessoais'),
    ('Educação'),
    ('Família'),
    ('Lazer'),
    ('Pets'),
    ('Presentes'),
    ('Roupas'),
    ('Saúde'),
    ('Transporte'),
    ('Salário'),
    ('Vendas'),
    ('Outras receitas'),
    ('Outras despesas');
    












