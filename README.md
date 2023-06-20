# MBDS Madagascar2022_2023_api

## Membre du groupe 
- N° 51, RASOAHARISOA Nantenaina Zotoavina
- N° 47, RANDRIANARIVELO Herimanarivo Finoana Mandresy

## Repositories
- Front : https://github.com/zotoavina/mbds_assignement_front.git
- Api : https://github.com/Finoana71/mbds_assignment_api.git

## Lien sur Render.com
- Front : https://mbds-assignment-51-47-front.onrender.com/
- Api : https://mbds-assignment-51-47-api.onrender.com/

## Prérequis techniques
- Version node : v18.16.0
- Version npm: 9.5.1

## Fonctionnalités
### 1) Collections
Nouvelles collections:
	  - Utilisateurs
	  - Elèves
	  - Matières
Peuplement de la base dans le back end: utilisateurs, elèves, matières et assignements. 
### 2) Connexion
Utilisation de jwt token, bcrypt pour hacher les mots de passes
### 3) Matières
Récupérations des toutes les lignes
### 4) Elèves
Récupérations des toutes les lignes
### 5) Assignements
	- Création	
	- Mise à jour
	- Liste avec pagination
	- Récupération par id
	- Suppression
	- Rendre un assignment
Utilisation des services et controllers

## Lancement du projet
- Installez les dépendances:
	npm install
- Démarrer l'application:
	node server.js


## Documentations et aides
https://dev.to/ifeanyichima/what-is-ref-in-mongoosejs-4o2h
Pour ajouter les references eleve, matiere dans assignement avec l'aide de chatGPT


https://www.geeksforgeeks.org/mongoose-insertmany-function/
Pour inserer les données d'initialisation

https://www.tabnine.com/code/javascript/functions/bcryptjs/hashSync
Pour hacher les mot de passes

Aide de chatGpt pour peupler la collection d'assignments
