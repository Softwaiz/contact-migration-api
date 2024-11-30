import { GraphQLError } from "graphql";

export function inputValidationError(errors: any) {
    return new GraphQLError(
        'Veuillez verifier les champs',
        {
            extensions: {
                code: "INPUT_VALIDATION_ERROR",
                errors
            }
        }
    )
}