import { useActionState } from 'react'
import { useCreateRef } from '@/hooks/useRefs'
import type { CreateRefInput } from '@/types'

export function AddRefForm() {
    // useCreateRef() vient de @/hooks/useRefs.ts
    // C'est un wrapper autour de useMutation (React Query)
    // useMutation expose mutateAsync : une fonction async qui déclenche le POST vers Django
    // Quand mutateAsync réussit, onSuccess invalide le cache ['refs'] → React Query refetch la liste
    const { mutateAsync } = useCreateRef()

    // useActionState est un hook React 19 conçu pour les formulaires.
    // Il remplace le pattern classique : useState(loading) + useState(error) + onSubmit handler
    //
    // Signature : useActionState(actionFn, initialState)
    //   → retourne [state, action, isPending]
    //
    // - actionFn   : la fonction async appelée à chaque soumission du form
    //                elle reçoit (prevState, formData) et retourne le nouvel état
    // - initialState : la valeur initiale du state (ici null = pas d'erreur)
    // - state      : ici on l'appelle "error" — c'est ce que retourne actionFn (string | null)
    // - action     : une fonction passée directement à <form action={action}>
    //                React intercepte la soumission et appelle actionFn avec le FormData
    // - isPending  : true pendant que actionFn est en cours d'exécution
    const [error, action, isPending] = useActionState(
        // actionFn : appelée à chaque submit
        // _prev = state de la soumission précédente (on n'en a pas besoin ici)
        // formData = l'objet natif du navigateur avec tous les champs du form
        async (_prev: string | null, formData: FormData) => {
            try {
                // On extrait les valeurs des champs via formData.get()
                // "as string" car TypeScript ne sait pas que ces champs existent
                const data: CreateRefInput = {
                    title: formData.get('title') as string,
                    url: formData.get('url') as string,
                    category: formData.get('category') as string,
                }

                // mutateAsync envoie le POST à Django via fetch (défini dans api.ts)
                // await bloque jusqu'à la réponse — isPending est true pendant ce temps
                // En cas de succès : React Query invalide ['refs'] → la liste se met à jour
                await mutateAsync(data)

                // On retourne null pour signifier "pas d'erreur"
                // Ce null devient le nouveau "error" state
                return null
            } catch (e) {
                // En cas d'erreur réseau ou HTTP, on retourne le message
                // Ce string devient le nouveau "error" state → affiché dans le JSX
                return e instanceof Error ? e.message : 'Une erreur est survenue'
            }
        },
        null, // état initial : pas d'erreur
    )

    return (
        // action (de useActionState) est passé à form.action
        // React 19 intercepte la soumission et appelle notre actionFn avec le FormData
        // Plus besoin de event.preventDefault() — React le fait automatiquement
        <form action={action}>
            <input name="title" placeholder="Titre" required />
            <input name="url" type="url" placeholder="URL" required />
            <input name="category" placeholder="Catégorie" required />

            {/* isPending = true tant que mutateAsync n'a pas résolu */}
            <button type="submit" disabled={isPending}>
                {isPending ? 'Ajout en cours...' : 'Ajouter'}
            </button>

            {/* error est null par défaut, string si actionFn a throw */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    )
}
