<?php

// get data from api
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, "https://hplussport.com/api/products/order/price");
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
$output = curl_exec($curl);
curl_close($curl);

?>