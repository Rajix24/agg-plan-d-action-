# welcome , this is exec for any one what to learn aggregation function in mongoose-

## Journal des décisions métier — activité mensuelle

- L'API `GET /member/monthly_agg` ne retient que les prêts `RETURNED` dont `returnedAt` est dans l'intervalle UTC `[2026-03-01, 2026-05-01)`. La borne du 1er mai est exclusive.
- Les équipements archivés et les références d'équipement introuvables sont exclus après `$lookup` et `$unwind`.
- La période est une chaîne complète `YYYY-MM` calculée avec `timezone: "UTC"`, pour ne pas mélanger des années différentes.
- Le tri explicite est par période croissante, recettes décroissantes, puis catégorie croissante.

