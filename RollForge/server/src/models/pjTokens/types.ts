export type PJTokenRow = {
  id: number;
  name: string;
  image_url: string | null;
  character_id: number | null;
  campaign_id: number;
  user_id: number;
};

export type CreateTokenModelInput = Omit<PJTokenRow, 'id'>;
export type UpdateTokenModelInput = Partial<Pick<PJTokenRow, 'name' | 'image_url' | 'character_id' | 'user_id' | 'campaign_id'>>;