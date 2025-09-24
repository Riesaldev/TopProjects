import { Router } from 'express';
import { authUser, zodValidator } from '@/middlewares/index.ts';
import { idParamSchema, createTokenSchema, updateTokenSchema, listTokensQuerySchema } from '@/schemas/tokens.ts';
import { createToken, deleteToken, getToken, listTokens, updateToken } from '@/controllers/pjTokens/index.ts';

export const tokensRouter = Router();

// Todas las rutas de tokens requieren estar autenticado
tokensRouter.use(authUser);

tokensRouter.get('/', zodValidator(listTokensQuerySchema, 'query'), listTokens);
tokensRouter.get('/:id', zodValidator(idParamSchema, 'params'), getToken);
tokensRouter.post('/', zodValidator(createTokenSchema), createToken);
tokensRouter.put('/:id', zodValidator(idParamSchema, 'params'), zodValidator(updateTokenSchema), updateToken);
tokensRouter.delete('/:id', zodValidator(idParamSchema, 'params'), deleteToken);

export default tokensRouter;
