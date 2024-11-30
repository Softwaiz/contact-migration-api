import parsePhoneNumberFromString from "libphonenumber-js";
import { PhoneUtils } from "../core/phone";
import { ApplicationContext } from "../global";

export const Resolvers = {
    Query: {
        checkMigration: (root: any, args: { number: string }, context: ApplicationContext, info: any) => {
            let entry = new PhoneUtils(args.number);
            let parsed = entry.parsedItem;
            return {
                isValid: parsed?.isValid,
                countryCode: parsed?.countryCode,
                countryIso2: parsed?.countryIso2,
                countryIso3: parsed?.countryIso3,
                number: parsed?.phoneNumber,
                mustRewrite: parsed?.shouldRewrite,
                rewriteTo: parsed?.rewriteResult()
            }
        }
    },
}