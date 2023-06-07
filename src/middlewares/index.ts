import validateBodyMiddleware from "./validateBody.middleware";
import validateEmailExistsMiddleware from "./validateEmailExists.middleware";
import validateCpfMiddleware from "./validateCpf.middleware";
import validateTokenMiddleware from "./validateToken.middleware";
import verifyAdvertiserMiddleware from "./verifyIsAdvertiser.middleware";
import ensureIdCarExistsMiddleware from "./ensureIdCarExists.middleware";

export {
    validateBodyMiddleware,
    validateEmailExistsMiddleware,
    validateCpfMiddleware,
    validateTokenMiddleware,
    verifyAdvertiserMiddleware,
    ensureIdCarExistsMiddleware
}