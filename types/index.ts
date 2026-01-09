export type TProfile = {
  total_views: number;
  total_followers: number;
  total_image: number;
  total_music: number;
  total_video: number;
  total_report: number;
  interest: string[];
  id: string;
  username: string;
  email: string;
  image: string | undefined;
  role: string;
}[];
