export type TPhotoDescription = {
    idProduct: number;
    folderName: string;
    description: string;
    imageName: string;
    url: string;
    hashtag: string[],
    totalLike: number;
    totalDislike: number;
    category: string[];
    createdAt: Date
}