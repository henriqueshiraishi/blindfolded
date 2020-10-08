## Projeto UML Blindfolded

### Instalação das dependências

* Plataforma Blindfolded

Cria a pasta do projeto: ```mkdir plataforma_blindfolded```

Acessa a pasta do projeto: ```cd plataforma_blindfolded```

Clona o projeto: ```git clone https://github.com/henriqueshiraishi/blindfolded.git .```

* RVM e Ruby 2.5.1

Install GPG keys: ```gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB```

Install RVM: ```\curl -sSL https://get.rvm.io | bash -s stable```

Install Ruby 2.5.1: ```rvm install 2.5.1```

Set Ruby 2.5.1 default: ```rvm --default use 2.5.1```

* Ruby on Rails 5.1.7

Install Rails: ```gem install rails -v 5.1.7```

### Start do projeto Blindfolded

* Na raiz do projeto, instala as gems: ```bundle install```
* Cria o banco e execute as migrações: ```rails db:create db:migrate```
* Cria as sementes do projeto: ```rails db:seed```
* Inicia o servidor: ```rails server```
* E acessa a plataforma: [localhost:3000](http://localhost:3000/)
