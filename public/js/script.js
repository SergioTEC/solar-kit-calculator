$(document).ready(function () { 
    $("#calculate").click(function () {
        const dailyConsumption = $("#dailyConsumption").val();
        const sunlightHours = $("#sunlightHours").val();
        const modulePower = $("#modulePower").val();
        const inverterPower = $("#inverterPower").val();
        const numberInverters = $("#numberInverters").val();
        const inverterType = $("#inverterType").val();

        if (!dailyConsumption || !sunlightHours || !modulePower || !inverterPower || !numberInverters) {
            alert("Fill in all the fields.");
            return;
        }

        $.ajax({
            type: "POST",
            url: "../controller/SolarController.php",
            data: {
                daily_consumption: dailyConsumption,
                sunlight_hours: sunlightHours,
                module_power: modulePower,
                inverter_power: inverterPower,
                number_inverters: numberInverters,
                inverter_type: inverterType
            },
            dataType: "json",
            success: function (data) {
                try {
                    $("#modules").text(data.number_of_modules);
                    $("#modulePowerResult").text(modulePower);
                    $("#batteries").text(data.battery_capacity ? data.battery_capacity : "N/A");
                    $("#inverters").text(data.number_of_inverters);
                    $("#inverterPowerResult").text(inverterPower);
                    $("#totalInverterCapacity").text(data.total_inverter_capacity.toFixed(2));
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