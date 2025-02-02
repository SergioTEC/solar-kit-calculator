$(document).ready(function () { 
    $("#calculate").click(function () {
        const dailyConsumption = $("#dailyConsumption").val();
        const sunlightHours = $("#sunlightHours").val();
        const modulePower = $("#modulePower").val();
        const inverterPower = $("#inverterPower").val();
        const inverterType = $("#inverterType").val();

        if (!dailyConsumption || !sunlightHours || !modulePower || !inverterPower || !inverterType) {
            alert("Fill in all the fields.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "../controller/SolarController.php",
            data: {
                action: "kitCalculation",
                daily_consumption: dailyConsumption,
                sunlight_hours: sunlightHours,
                module_power: modulePower,
                inverter_power: inverterPower,
                inverter_type: inverterType
            },
            dataType: "json",
            success: function (data) {
                try {
                    $("#modules").text(data.result.number_of_modules);
                    $("#modulePowerResult").text(modulePower);
                    $("#batteries").text(data.result.battery_capacity ? data.result.battery_capacity : "N/A");
                    $("#inverters").text(data.result.number_of_inverters);
                    $("#inverterPowerResult").text(inverterPower);
                    $("#totalInverterCapacity").text(data.result.total_inverter_capacity.toFixed(2));
                } catch (error) {
                    alert("An unexpected error occurred while processing the results.");
                }
            },
            error: function () {
                alert("An error occurred while communicating with the server.");
            }
        });
    });
 });