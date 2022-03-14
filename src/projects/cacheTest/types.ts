export interface CardData {
    createdAt: string
    updatedAt: null | string,
    status: string,
    id: null | number,
    user_id: number,
    metadatas:{
        name: string,
        digits: number,
        limit: number
    }
}

export interface UpdateCardData {
    data: CardData
    id: number
}