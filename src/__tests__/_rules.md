### Rules for Components

- [x] Ne pas tout tester (si sous composants testés, ne pas tester composant parent)
- [x] Tester ce qui est ux-critique (fondamental - pas le style mais les fonctions)
- [x] Categoriser les tests :
  - [x] test de rendu (affichage basique)
  - [x] test de fonctions (creer fonctions pures et exporter en dehors du composant, si test de fonction ok -> no need test rendu component)
  - [x] test de l'effet des props (verifier les donnees recu et l’affichage consequent)
- [x] Rendre les composants stupides (juste affichage)
