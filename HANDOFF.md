Éxecution de l'appli :

- npm install
- npm run dev

Test des API calls :

- POST - /api/shorten sert à obtenir le lien court, il attends juste un lien "originalUrl" en paramètre
- GET - /api/redirect/[code] n'est pas utilisé dans l'appli (j'ai "trouvé" une meilleure solution pendant le développement), et renvoie un objet originalUrl": {
  "originalUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "shortCode": "ASlQ1B"
  }
- GET - /api/reflect renvoie simplement le contenu du storage pour s'assurer du bon fonctionnement des autres méthodes

Détails d'implémentations :

- J'ai choisi Netxjs pour ce MVP car il fait le travail de express + react/vite automatiquement, et le projet devant être livré en un temps limité il était préférable de ne pas avoir à paramétrer express et router-dom (bien que ce ne soit que quelques minutes d'épargnées). J'en parle plus en détail dans le PROPOSAL.md.
- La génération de code aléatoire via une chaîne de caractère suffit pour un petit MVP de la sorte, pas besoin d'installer des librairies d'uuid (ou autre) & peu de chance de tomber sur le même code assez de fois pour que la requête plante - le code se regénérant si la première génération tombre sur un existant.
- Le choix de deux/trois endpoints est justifiable par la simplicité de l'énoncé, pas besoin d'en faire plus : un endpoint pour l'enregistrement, un pour la lecture, et un dernier pour le debug.
- J'ai choisi de ne pas faire de dashboard car premièrement je ne pense pas que ce soit pertinent (et il est conseillé de rester au plus simple), et deuxièmement par peur de manquer de temps, ce qui au final n'a pas été le cas. Peut-être aurais-je dû faire une page pour gérer les liens au lieu de faire du css sur les trois derniers quarts d'heure.
- J'ai choisi de ne plus utiliser l'endpoint /api/redirect/[code] parce que j'ai trouvé une autre solution, mais en fonction de ce que veut le client (ex: 5s de pub pendant la redirection), je ne l'ai pas supprimé pour autant.

Limitations connues :

- Je ne sais pas si ça peut réarriver car c'est un problème qui s'est réglé comme par magie, mais avant mes dernières exécutions de Node parfois le storage n'était pas persistant pendant une même exécution (même avec export const runtime = "nodejs";). Je ne sais pas si ça peut se reproduire sur ma machine ou d'autres mais dans ce cas il faut relancer le serveur node avec npm run dev. Je n'ai pas identifié la cause mais j'ai relancé toutes les méthodes API, et même en causant intentionnellement des erreurs le storage reste persistant alors le problème est probablement réglé.

Considération de production :
Cela dépend du sens de la question : - Si c'est la mise en ligne du MVP, j'ajouterais un stockage persistant sûr, même faible (style SQLite ou un simple fichier JSON) et ferait un exemple de back-office avec un CRON régénérant les données toutes les X heures/minutes. - Si c'est la production du projet terminé, alors il me faudrait plus d'informations du client évidemment. Mais en considérant que je sois mon propre client, je vais tout mettre dans améliorations futures (j'espère avoir bien tout compris).

Améliorations futures :
J'ai réfléchi à deux systèmes différents, l'un nécessitant un système d'authentification, et l'autre non.

    Pour le système d'authentification :
     - Évidemment une table utilisateur (admin/users) offrant différents avantages si on enregistre un lien en étant connecté (compte non-obligatoire, on privilégie l'instantanéité)
     - Un système de report, une page dédiée sur le site avec un CTA sur la homepage incitant les utilisateurs à indiquer ici s'ils ont été victime d'une redirection malveillante. Il y aurait sur le dashboard admin une section report permettant aux administrateurs de parcourir les reports et bannir l'utilisateur ou lui envoyer un avertissement (si un utilisateur y est lié) et de supprimer le lien. Tout lien supprimé ainsi entraînera le banissement du nom de domaine sur le site, et donc empêchera qui que ce soit de remettre le même lien. Un lien qui a été précédemment report plusieurs fois mais pas encore supprimé sera lors de la redirection signalé comme "potentiellement frauduleux" et nécessitera une intéraction de l'utilisateur pour qu'il soit redirigé.
     - En fonction de l'économie du site, des pubs sur la homepage, des URLs personnalisés/plus courts payants, des pubs lors de la redirection (horrible pour l'utilisateur)...

    Sans système d'authentification :
     - Globalement le même système de modération, mais sans utilisateurs.
     - De même pour le système économique se basant sur les pubs
     - Le but de l'appli étant simple, il n'est pas nécessaire de s'authentifier pour créer un lien personnalisé. Une fois créé, on y touche plus (et aucune raison de faire s'expirer un lien "payant"). Il est donc concevable de juste demander l'adresse mail d'un utilisateur avant de payer. Ce système offre moins de clic, donc plus de potentiels acheteurs. Une création de compte pour quelque chose d'aussi simple et rapide peut freiner.
