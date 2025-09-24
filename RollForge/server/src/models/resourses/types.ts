export type ResourceRow = {
  id: number;
  name: string;
  type: 'image' | 'audio' | 'pdf' | 'other';
  url: string;
  campaign_id: number;
  uploaded_by: number | null;
};
