# TaskListSignalR

Com o docker file devidamente criado só nos resta a seguir os próximos passos

1- Gerar imagem docker utilizando o comando 'docker build -t nome-da-imagem:1.0 .' na raiz do repositório

2- Com a imagem gerada é só subir no servidor.

3- Para subir no heroku (ambiente de teste) basta utilizar o Heroku CLI

4- Realize o login utilizando o comando 'heroku login'

5- Agora é necessário criar a aplicação no ambiente do heroku, pelo comando: 'heroku apps:create nome-da-aplicacao ou
pela própria plataforma do heroku

6- Também é necessário logar no container do heroku com o comando: 'heroku container:login'

7- Agora é só fazer o push da imagem gerada utilizando o comando: 'heroku container:push web -a nome-da-aplicacao-no-heroku'

8- Para finalizar é só fazer o release com o comando: 'heroku container:release web -a nome-da-aplicacao-no-heroku'
