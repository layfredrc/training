// type User = {
//     id: string
//     name: string
// }

// type Order = {
//     id: string
//     userId: string
//     total: number
// }

// const users: User[] = [
//     { id: 'u1', name: 'Alice' },
//     { id: 'u2', name: 'Bob' },
// ]

// const orders: Order[] = [
//     { id: 'o1', userId: 'u1', total: 120 },
//     { id: 'o2', userId: 'u1', total: 80 },
//     { id: 'o3', userId: 'u2', total: 50 },
// ]

// type GroupedUserAndOrders = {
//     user: User
//     orders: Order[]
//     totalAmount: number
// }

// // {
// //   u1: {
// //     user: { id: "u1", name: "Alice" },
// //     orders: [
// //       { id: "o1", userId: "u1", total: 120 },
// //       { id: "o2", userId: "u1", total: 80 }
// //     ],
// //     totalAmount: 200
// //   },
// //   u2: {
// //     user: { id: "u2", name: "Bob" },
// //     orders: [
// //       { id: "o3", userId: "u2", total: 50 }
// //     ],
// //     totalAmount: 50
// //   }
// // }

// function normalize(
//     users: User[],
//     orders: Order[],
// ): Record<string, GroupedUserAndOrders> {
//     const byUser = {} as Record<string, GroupedUserAndOrders>
//     // normalize la structure
//     for (const user of users) {
//         byUser[user.id] = {
//             user,
//             orders: [] as Order[],
//             totalAmount: 0,
//         }
//     }

//     for (const order of orders) {
//         const hasOrder = byUser[order.userId]
//         if (!hasOrder) {
//             continue
//         }
//         byUser[order.userId].orders.push(order)
//         byUser[order.userId].totalAmount += order.total
//     }

//     return byUser
// }

// EXO 2

// type User = {
//     id: string
//     name: string
//     active: boolean
// }

// const users: User[] = [
//     { id: 'u1', name: 'Alice', active: true },
//     { id: 'u2', name: 'Bob', active: false },
//     { id: 'u3', name: 'Charlie', active: true },
// ]

// function setUserActive(users: User[], id: string, active: boolean): User[] {
//     const indexToUpdate = users.findIndex((u) => u.id === id)
//     if (indexToUpdate === -1) {
//         return users
//     }
//     return users.map((u) => (u.id === id ? { ...u, active: active } : u))
// }

// EXO 3

// async function fetchUser() {
//     return { id: 'u1', name: 'Alice' }
// }

// async function fetchOrders(userId: string) {
//     return [{ id: 'o1', total: 100 }]
// }

// async function sequentielle() {
//     const user = await fetchUser()
//     const orders = await fetchOrders(user.id)

//     return { user, orders }
// }

// EXO 4

// function createCounter() {
//   let count = 0
//   return () => ++count
// }
