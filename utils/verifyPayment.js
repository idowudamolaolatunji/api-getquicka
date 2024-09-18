
const verifyPayment = async(reference) => {
    try {
        const checkVerification = fetch(`
            https://api.paystack.co/transaction/verify/${reference}
        `, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        });

        const response = await checkVerification.json();
        console.log(response)

        if (response.data.data.status !== "success") {
            res.status(400).json({
                message: "Unable to Verify Payment"
            });
        }
        return response;
    } catch(err) {
        return err;
    }
}

module.exports = verifyPayment;