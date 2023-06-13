import ensureIdCarExistsMiddleware from "./ensureIdCarExists.middleware";
import validateBodyMiddleware from "./validateBody.middleware";
import validateCpfMiddleware from "./validateCpf.middleware";
import validateEmailExistsMiddleware from "./validateEmailExists.middleware";
import validateTokenMiddleware from "./validateToken.middleware";
import verifyAdvertiserMiddleware from "./verifyIsAdvertiser.middleware";
import verifyUserIsDeletedMiddleware from "./verifyUserIsDeleted.middleware";

export {
  validateBodyMiddleware,
  validateEmailExistsMiddleware,
  validateCpfMiddleware,
  validateTokenMiddleware,
  verifyAdvertiserMiddleware,
  ensureIdCarExistsMiddleware,
  verifyUserIsDeletedMiddleware,
};
