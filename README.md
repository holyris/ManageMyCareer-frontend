# Tuto bonnes pratiques git

Pour synchroniser avec la branch master distance (origin/master), à faire avant de commit->push !! :

Si vous avez des modif en cours : git stash (mettre vos modifs de côté) 

git pull --rebase (récupérer modifs distantes) git stash pop (récupérer vos modifs)


On fait git stash car c'est impossible de git pull avec des modifs en cours.

Pour push : commit avant (via vscode c'est plus simple) 

git push origin HEAD:votre branche distante

Si ça marche pas, faire git push -f origin HEAD:votre branche distante


Puis si vous avez des doutes demandez moi sur discord avec @

