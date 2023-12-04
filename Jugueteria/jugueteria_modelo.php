<?php

class Jugueteria{

    public $nombre;
    public $producto;
    public $cantidad;
    public $preciopelotas;
    public $preciomuñecas;
    public $preciocarritos;

    public function _construct(){
        $this->nombre="none";
        $this->producto="none";
        $this->cantidad=0;
    }


public function calculartotal(){
    
    if($_REQUEST['producto'] == "Pelotas"){
        $total=$this->cantidad * 58;
    return $total;
        }
    
    if($_REQUEST['producto'] == "Muñecas"){
        $total=$this->cantidad * 92.8;
    return $total;
        }
    
    if($_REQUEST['producto'] == "Carritos"){
        $total=$this->cantidad * 69.6;
    return $total;
        }

}
}

?>