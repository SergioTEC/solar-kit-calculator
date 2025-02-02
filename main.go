package main

import (
	"encoding/json"
	"math"
	"net/http"
	"log"
)

type SolarInput struct {
	DailyConsumption float64 `json:"daily_consumption"`
	SunlightHours	 float64 `json:"sunlight_hours"`
	ModulePower		 float64 `json:"module_power"`
	InverterPower    float64 `json:"inverter_power"`
	InverterType     string  `json:"inverter_type"`
}

type SolarOutput struct {
	NumberOfModules       int     `json:"number_of_modules"`
	BatteryCapacity       float64 `json:"battery_capacity,omitempty"`
	NumberOfInverters     int     `json:"number_of_inverters"`
	TotalInverterCapacity float64 `json:"total_inverter_capacity"`
}

func main() {
	http.HandleFunc("/calculate", calculateHandler)
	log.Println("Solar Calculation Service running on http://localhost:8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}

func calculateHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var input SolarInput

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid input data", http.StatusBadRequest)
		return
	}

	output := calculateSolarSystem(input)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(output)
}

func calculateSolarSystem(input SolarInput) SolarOutput {
	moduleEnergyPerDay := (input.ModulePower / 1000) * input.SunlightHours

	numberOfModules := int(math.Ceil(input.DailyConsumption / moduleEnergyPerDay))

	totalCapacityNeeded := input.DailyConsumption / input.SunlightHours

	numberOfInverters := int(math.Ceil(totalCapacityNeeded / input.InverterPower))

	totalInverterCapacity := float64(numberOfInverters) * input.InverterPower

	var batteryCapacity float64
	if input.InverterType == "offgrid" {
		batteryCapacity = input.DailyConsumption
	}

	return SolarOutput{
		NumberOfModules:       numberOfModules,
		BatteryCapacity:       batteryCapacity,
		NumberOfInverters:     numberOfInverters,
		TotalInverterCapacity: totalInverterCapacity,
	}
}