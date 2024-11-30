import { PhoneUtils } from "../core/phone";
import { ApplicationContext } from "../global";

function parseOne(root: any, args: { phoneNumber: string }, context: ApplicationContext, info: any) {
    let entry = new PhoneUtils(args.phoneNumber);
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

function parseMultiple(root: any, args: { phoneNumbers: string[] }, context: ApplicationContext, info: any) {
    return args.phoneNumbers.map((value) => {
        return {
            number: value,
            result: parseOne(root, { phoneNumber: value }, context, info)
        }
    });
}

export const Resolvers = {
    Query: {
        parseOne,
        parseMultiple
    },
}