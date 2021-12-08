<?php
    $fileContents = file_get_contents($_FILES['xml']['tmp_name']);
    $xml = simplexml_load_string($fileContents);
    $ns = $xml->getNamespaces(true);
    $xml->registerXPathNamespace('c', $ns['cfdi']);
    $xml->registerXPathNamespace('t', $ns['tfd']);
    $emisor = "";
    $folio="";
    foreach ($xml->xpath('//cfdi:Comprobante') as $cfdiComprobante){ 
        $folio = (string)$cfdiComprobante['Serie']. (string) $cfdiComprobante['Folio'];
    }
    foreach ($xml->xpath('//cfdi:Comprobante//cfdi:Emisor') as $Emisor){ 
        $emisor=(string) $Emisor['Nombre'];
    }

    $productos=[];

    
    foreach ($xml->xpath('//cfdi:Comprobante//cfdi:Conceptos//cfdi:Concepto') as $Concepto){ 
        $productos[]=[
            "Descripcion"=> (string)   $Concepto['Descripcion'],
            "Cantidad"=> (string)  $Concepto['Cantidad'],
            "ValorUnitario"=> (string)  $Concepto['ValorUnitario'],
            "Descuento"=> (string)  $Concepto['Descuento'],
        ];  
     }

     echo json_encode([
         "emisor"=>$emisor,
         "folio"=>$folio,
         "productos"=>$productos,
     ]);

?>