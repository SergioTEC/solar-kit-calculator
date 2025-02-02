<?php

class SolarModel {

    public function calculate($daily_consumption, $sunlight_hours, $module_power, $inverter_power, $inverter_type) {
        
        $url = 'http://localhost:8081/calculate';

        $data = [
            'daily_consumption' => (float) $daily_consumption,
            'sunlight_hours' => (float) $sunlight_hours,
            'module_power' => (float) $module_power,
            'inverter_power' => (float) $inverter_power,
            'inverter_type' => $inverter_type,
        ];

        $options = [
            'http' => [
                'header' => "Content-Type: application/json\r\n",
                'method' => 'POST',
                'content' => json_encode($data),
                'timeout' => 10,
            ],
        ];

        $context = stream_context_create($options);
        $result = @file_get_contents($url, false, $context);

        if ($result === FALSE) {
            return ["error" => true, "message" => "Failed to connect to the calculation service."];
        }

        $decode_result = json_decode($result, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return ["error" => true, "message" => "Invalid response format from the calculation service."];
        }

        return $decode_result;
    }
}