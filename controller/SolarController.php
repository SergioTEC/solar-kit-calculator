<?php 
require_once '../model/SolarModel.php';

class SolarController {
 
    public function kitCalculation() {
        if (
            !empty($_POST['daily_consumption']) &&
            !empty($_POST['sunlight_hours']) &&
            !empty($_POST['module_power']) &&
            !empty($_POST['inverter_power']) &&
            !empty($_POST['inverter_type'])
        ) {
        
            $result = (new SolarModel())->calculate(
                $_POST['daily_consumption'], 
                $_POST['sunlight_hours'], 
                $_POST['module_power'], 
                $_POST['inverter_power'], 
                $_POST['inverter_type']
            );
        
            echo json_encode(["error" => false, "result" => $result]);
            exit;
        
        } else {
            echo json_encode(["error" => true]);
            exit;
        }
    }
}

if (
    isset($_POST['action']) &&
    $_POST['action'] === 'kitCalculation'
) {
    (new SolarController())->kitCalculation();
}