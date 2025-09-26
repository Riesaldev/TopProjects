// Nuevo índice correcto 'campaigns' que reexporta desde la carpeta legacy 'campains'
// Permite migración progresiva sin romper código existente hasta eliminar la carpeta antigua.
export { createCampaignModel } from '../campains/createCampaign.ts';
export { deleteCampaignModel } from '../campains/deleteCampaign.ts';
export { getCampaignById } from '../campains/getCampaignById.ts';
export { listCampaignsModel } from '../campains/listCampaigns.ts';
export { updateCampaignModel } from '../campains/updateCampaign.ts';
export { campaignHasReferences } from '../campains/hasReferences.ts';