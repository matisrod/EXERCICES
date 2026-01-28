# TP Context API & useReducer

L'exercice devra se faire dans le dossier context-api.

### **1.Création et utilisation de Context**

L'exercice devra se faire dans le dossier context-api.

Votre tâche consiste à ajouter une fonctionnalité de **"thème"** à une application de démonstration fournie par un collègue. Cette fonctionnalité doit être implémentée à l’aide de **l’API Context de React**.

**Votre objectif principal** est de vous assurer que le bouton **"Toggle Theme"** dans le composant **Header** déclenche une fonction **`toggleTheme()`** (que vous devrez ajouter) exposée via le contexte.

### **Exigences techniques :**
1. **Gestion dynamique du contexte** :
   - La valeur du contexte doit être gérée dans le fichier **`ThemeContextProvider.tsx`**.
   - Le thème actuel doit être une valeur pouvant être soit **`'light'`**, soit **`'dark'`**, et exposée via une propriété **`theme`** dans l’objet de contexte.

2. **Fonction `toggleTheme()`** :
   - L’objet de contexte doit également exposer une méthode **`toggleTheme()`** qui alterne la valeur de la propriété **`theme`** entre **`'light'`** et **`'dark'`**.

3. **Utilisation du contexte** :
   - Le composant **Header** doit accéder au contexte pour appeler la fonction **`toggleTheme()`**.
   - Le composant **Page** doit utiliser le contexte pour appliquer la classe CSS **`'light'`** (si `theme === 'light'`) ou **`'dark'`** (si `theme === 'dark'`) à la `<div id="app">`.

### **Résultat attendu :**
- Si le thème n’a pas été modifié ou a été basculé un nombre pair de fois, l’application doit afficher le **mode clair** (comme illustré dans la première capture).

![light_theme](light_theme.png)

- Si le thème est basculé en **`'dark'`**, l’application doit afficher le **mode sombre** (comme illustré dans la deuxième capture).

![dark_theme](dark_theme.png)


### **2.Utilisation de `useReducer()`**

Votre tâche consiste à créer une application de **compteur basique** en utilisant le hook **`useReducer()`** de React pour la gestion d’état, et non le hook **`useState()`**.

Pour atteindre cet objectif, vous devez **améliorer la fonction `counterReducer`** déjà existante, située à côté du composant **App** (ne supprimez pas le mot-clé `export` !).

**Dans le composant App**, vous devrez :
1. Utiliser le hook **`useReducer()`** avec cette fonction `counterReducer` pour gérer l’état du compteur.
2. **Connecter les trois boutons** `<button>` à l’état géré par le réducteur (c’est-à-dire qu’ils doivent déclencher des changements d’état).
3. Le paragraphe `<p id="counter">` doit afficher la valeur du compteur (`count`).

**Structure obligatoire de l’état** :
L’état géré par le réducteur doit être un objet de la forme suivante :
```javascript
{
  count: 0; // Bien sûr, 0 n’est pas statique et change en fonction des clics sur les boutons
}
```

**Actions à dispatcher** :
Lorsque vous dispatcherez des actions, assurez-vous que chaque action soit un objet possédant une propriété **`type`** (le nom doit être exactement `type`, sinon les vérifications automatiques échoueront). Cette propriété doit contenir l’une des valeurs suivantes :
- **`'INCREMENT'`** (pour incrémenter le compteur),
- **`'DECREMENT'`** (pour décrémenter le compteur),
- **`'RESET'`** (pour réinitialiser le compteur à 0).