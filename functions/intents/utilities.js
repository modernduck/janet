const utilController = require("../controllers/util.controller")

const getOutputThatHaveParams = (paramNames, outputContexts) => outputContexts.find(item => {
        return paramNames.length ==  paramNames.filter(paramName => item.parameters[paramName]).length
    })


module.exports = {

   splitBills: (req, agent) => (() => {
        //var params = req.body.queryResult.parameters;
        console.log(req.body.queryResult.outputContexts)
        //var parameters = req.body.queryResult.outputContexts[1].parameters;
        var parameters = getOutputThatHaveParams(['totalCost', 'totalDrinkCost', 'total-people', 'drinkCount'], req.body.queryResult.outputContexts).parameters
        console.log(parameters)
        var result = utilController.splitBill(parameters.totalCost, parameters.totalDrinkCost.amount , parameters['total-people'], parameters.drinkCount);
        //if(params.total)
       console.log(result)
       //return agent.add("Test biatch")
       return agent.add(`Each Non Alc must pay ${result.foodPaymentEach} / Alc must pay ${result.alcPamentEach}`)
    }),
    splitBillsWithOutAlc: (req, agent) => (() => {
        //Split the bill - yes - select.number
        //Split the bill - no - total
        //var params = req.body.queryResult.parameters;
       // var parameters = req.body.queryResult.outputContexts[1].parameters;
       var parameters = getOutputThatHaveParams(['totalCost', 'total-people'], req.body.queryResult.outputContexts).parameters
       console.log(parameters)
        var result = utilController.splitBill(parameters.totalCost, 0, parameters['total-people'], 0);
        console.log('done calculate')
        console.log(result)
        return agent.add(`Each people must pay ${result.foodPaymentEach}`)
        //return utilController.splitBill(params.totalPeople, )
    })

}