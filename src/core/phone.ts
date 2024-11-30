import { phone, PhoneValidResult } from "phone";
import parsePhoneNumber from "libphonenumber-js";

const PHONE_NUMBER_EXPRESSION = /^(?<has01>01)?(\s|-?)(?<number>(\d{2})(\s|-?)(\d{2})(\s|-?)(\d{2})(\s*|-?)(\d{2}))$/gm;

interface TestPhoneResult extends PhoneValidResult {
    shouldRewrite: boolean;
    rewriteResult(): string;
}

export class PhoneUtils {
    item: string;

    constructor(phoneNumber: string) {
        this.item = phoneNumber;
    }

    get parsedItem() {
        let phoneNumber = this.item || '';
        let output = parsePhoneNumber(phoneNumber, 'BJ');

        if (output) {

            if (output.country === 'BJ') {
                let parsed = PHONE_NUMBER_EXPRESSION.exec(output.nationalNumber.toString());
                if (parsed?.groups) {

                    let groups = parsed.groups;
                    let has01 = Boolean(groups?.has01);
                    let finalNumber = groups?.number;
                    const shouldMigrate = !has01;

                    return {
                        isValid: true,
                        countryCode: "+229",
                        countryIso2: "BJ",
                        countryIso3: "BEN",
                        phoneNumber: phoneNumber,
                        shouldRewrite: shouldMigrate,
                        rewriteResult() {
                            return `+229 01 ${finalNumber}`;
                        },
                    }
                }
            }
        }

        let parsed = PHONE_NUMBER_EXPRESSION.exec(phoneNumber);

        console.log("final groups: ", parsed?.groups);

        if (parsed?.groups) {
            /// check if BJ number has 01 prefix
            let groups = parsed.groups;
            let has01 = Boolean(groups?.has01);
            let finalNumber = groups?.number;

            const shouldMigrate = !has01;

            return {
                isValid: true,
                countryCode: "+229",
                countryIso2: "BJ",
                countryIso3: "BEN",
                phoneNumber: phoneNumber,
                shouldRewrite: shouldMigrate,
                rewriteResult() {
                    return `+229 01 ${finalNumber}`;
                },
            }
        }

        let result = phone(phoneNumber, {
            validateMobilePrefix: false
        });

        if (result.isValid) {
            return {
                ...result,
                shouldRewrite: false,
                rewriteResult() {
                    return phoneNumber;
                },
            } as TestPhoneResult;
        }
    }

    get mustRewrite() {
        return this.parsedItem?.shouldRewrite;
    }

    get rewriteTo() {
        return this.parsedItem?.rewriteResult();
    }

}