module.exports = {

    splitBill : (totalCost, alcCost, totalUserCount, alcUserCount) => {

        var foodTotal = Number(totalCost) - Number(alcCost);
        var foodPaymentEach = Number(foodTotal) / Number(totalUserCount);
        var onlyAlcPaymentEach = 0
        if(alcCost > 0)
             onlyAlcPaymentEach =alcCost / alcUserCount;
        return { 
            foodPaymentEach,
            onlyAlcPaymentEach,
            alcPamentEach: (foodPaymentEach + onlyAlcPaymentEach)
           }
    }


}