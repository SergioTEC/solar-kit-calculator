<?php

class SolarModel {

    public function calculate($daily_consumption, $sunlight_hours, $module_power, $inverter_power, $number_inverters, $inverter_type) {
        $url = 'http://localhost:8081/calculate';
    }
}