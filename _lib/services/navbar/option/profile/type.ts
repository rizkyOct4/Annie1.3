export type TItemFolderDescription = {
  tar_iu_product: number;
  description: string;
  url: string;
  hashtag: string[];
  category: string[];
  total_like: number;
  total_dislike: number;
  created_at: Date;
};

export type TGetUpdateImage = {
  ref_id_product: number;
  folder_name: string;
  description: string;
  image_name: string;
  url: string;
  total_like: number;
  total_dislike: number;
  hashtag: string[];
  category: string[];
  created_at: Date;
};


export type TItemFolderVideo = {
  folder_name: string;
  ref_id_product: number;
  url: string
  duration: number;
  thumbnail_url: string;
}[]