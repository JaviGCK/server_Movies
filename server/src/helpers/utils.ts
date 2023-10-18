import { DATA_SOURCE } from '../db/clientPrisma'

export const converToType = (id: string) => {
    if (DATA_SOURCE === "postgres") {
        return Number(id)
    } else {
        return id
    }
}
