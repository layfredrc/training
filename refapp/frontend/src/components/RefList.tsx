import { useOptimistic, useTransition } from 'react'
import { useRefs, useDeleteRef } from '@/hooks/useRefs'
import type { Ref } from '@/types'

export function RefList() {
    // useRefs() vient de @/hooks/useRefs.ts
    // C'est un wrapper autour de useQuery (React Query)
    // useQuery gère automatiquement : le fetch, le cache, les états loading/error/data
    //
    // Flow de données :
    //   Django API → fetch (api.ts) → useQuery → select: data.results → refs[]
    //
    // "select" dans useQuery extrait juste results du PaginatedResponse,
    // donc on reçoit directement Ref[] et non { count, next, previous, results }
    //
    // refs = [] par défaut pour éviter d'avoir refs undefined avant le premier fetch
    const { data: refs = [], isLoading, isError } = useRefs()

    // useDeleteRef() vient de @/hooks/useRefs.ts
    // C'est un wrapper autour de useMutation (React Query)
    // mutateAsync(id) → DELETE /api/refs/{id}/ → onSuccess invalide ['refs'] → refetch
    const { mutateAsync } = useDeleteRef()

    // useTransition permet de marquer une mise à jour comme "non urgente"
    // C'est requis pour useOptimistic : sans transition, le revert automatique ne fonctionne pas
    // startTransition() prend une fonction async et React la gère dans une transition
    // Le premier élément (ignoré ici avec ,) est isPending de la transition — on ne s'en sert pas
    const [, startTransition] = useTransition()

    // useOptimistic : permet de modifier l'UI AVANT que le serveur réponde
    //
    // Signature : useOptimistic(state, updateFn)
    //   → retourne [optimisticState, dispatchFn]
    //
    // - state         : la source de vérité (refs[], depuis React Query)
    // - updateFn      : (state actuel, action) → nouvel état optimiste
    //                   ici on filtre le tableau pour retirer l'id supprimé
    // - optimisticRefs: le tableau affiché — peut différer de refs pendant la requête
    // - removeOptimistic: la fonction dispatch — appelle updateFn avec l'id à supprimer
    //
    // Comportement :
    //   1. removeOptimistic(id) → optimisticRefs perd l'élément immédiatement (UI update)
    //   2. mutateAsync(id) → requête DELETE en cours (la liste affiche déjà sans l'élément)
    //   3a. Succès → invalidateQueries → refs se met à jour → optimisticRefs = refs (stable)
    //   3b. Échec  → React revert automatiquement optimisticRefs à la valeur de refs (revert)
    const [optimisticRefs, removeOptimistic] = useOptimistic(
        refs,
        (state: Ref[], idToRemove: string) =>
            state.filter((r) => r.id !== idToRemove),
    )

    function handleDelete(id: string) {
        // On wrappe dans startTransition pour activer le mécanisme de revert de useOptimistic
        startTransition(async () => {
            // 1. Mise à jour locale immédiate → l'élément disparaît de l'UI sans attendre
            removeOptimistic(id)
            // 2. Requête DELETE vers Django — si elle échoue, React revert optimisticRefs
            await mutateAsync(id)
        })
    }

    // États gérés automatiquement par React Query
    if (isLoading) return <p>Chargement...</p>
    if (isError) return <p>Erreur de chargement des refs.</p>
    if (optimisticRefs.length === 0) return <p>Aucune ref pour l'instant.</p>

    return (
        // On itère sur optimisticRefs (pas refs) pour refléter l'état optimiste
        // key={ref.id} est obligatoire pour que React identifie chaque élément
        <ul>
            {optimisticRefs.map((ref) => (
                <li key={ref.id}>
                    <a href={ref.url} target="_blank" rel="noreferrer">
                        {ref.title}
                    </a>
                    <span> — {ref.category}</span>
                    <button onClick={() => handleDelete(ref.id)}>
                        Supprimer
                    </button>
                </li>
            ))}
        </ul>
    )
}
