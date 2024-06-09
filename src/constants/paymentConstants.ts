export const paymentConstants = {
    paymentLinks: {
        oneHundredPayment: 
            process.env.NODE_ENV === "development"
            ? "https://buy.stripe.com/test_00g7tX5FPdHH5oI8ww"
            : "",

        clientsChoicePayment: 
            process.env.NODE_ENV === "development"
            ? "https://buy.stripe.com/test_14k6pT7NX6ff9EYcMN"
            : ""
    }
}

