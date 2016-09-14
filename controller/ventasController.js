/**
 * Created by dev10 on 1/7/2016.
 */
var app_angular = angular.module('PedidosOnline');


//CONTROLADOR DEL MOULO DE VENTAS
app_angular.controller("pedidoController",['Conexion','$scope','$location','$http','$routeParams','$timeout',function (Conexion,$scope,$location,$http,$routeParams,$timeout) {
	//localStorage.removeItem('TABLA_BALANCE'); 
	

	$scope.validaciones;
	//$scope.validaciones.tituloTalla=false;
	$scope.CantidadTotalPedido=0;
	$scope.ejemplovista=[];
	$scope.Variables;
	$scope.tallas=[];
	$scope.empaques=[];
	$scope.recordempaque;
	$scope.TABLA_BALANCE=JSON.parse(window.localStorage.getItem("TABLA_BALANCE"));
	$scope.sessiondate=JSON.parse(window.localStorage.getItem("CUR_USER"));
	$scope.validacion=0;
	$scope.item;
	$scope.listaPrecios=[];
	$scope.pedidoDetalles=[];
	$scope.date;
	$scope.dateEntrega;
	$scope.precioItem;
	$scope.itemPrecio;
	$scope.itemsAgregadosPedido=[];
	$scope.terceroSelected=[];
    $scope.Search;
	$scope.sucursal=[];
	$scope.pedidos=[];
    $scope.list_tercero = [];
	$scope.list_Sucursales=[];
	$scope.list_precios=[];
	$scope.listprecios=[];
	$scope.list_puntoEnvio=[];
	$scope.list_items=[];
	$scope.SearchItem;
	$scope.ultimoRegistroseleccionado=[];
	$scope.ultimoRegistro=[];
	$scope.pedido_detalle=[];
	$scope.list_pedidos_detalles=[];
	$scope.valorTotal;
	$scope.sucursalDespacho=[];
	$scope.ciudadSucursal=[];
	$scope.puntoEnvio=[];
	$scope.hasfocus;
	$scope.cantidadBase;
	$scope.dataFiltro;
	$scope.SearchItem;
	$scope.filter=[];
	$scope.bandera=[];
	$scope.cantidadrefererencia=0;
	$scope.bandera.banderaEditar=false;
	$scope.criterio=[];
	$scope.bandera.itemEdit=[];
	$scope.bandera.banderaEditarDelete=0;
	$scope.empaque=[];
	$scope.cantidadprueba=0;
	$scope.cantidades=0;
	$scope.itemextension2Detalle=[];
	$scope.cantidadParcialItem=0;
	$scope.tallaInidiceColor=[];
	$scope.onChangeCantidad=function(talla,stock)
	{
		$scope.cantidadrefererencia=0;
		for (var i = 0;i<$scope.tallas.length;i++) {
			if ($scope.tallas[i].talla==talla) {

				if ($scope.item.item_custom1!="SI") {
					$scope.validacionStock=$scope.tallas[i].cantidad*12;
					//$scope.cantidadrefererencia=$scope.tallas[i].cantidad;
					//if ($scope.validacionStock>stock) {
					//	$scope.tallas[i].cantidad=0;
					//	Mensajes("La Cantidad no puede ser mayor al stock","error","");
					//}
					$scope.cantidadrefererencia+=$scope.tallas[i].cantidad;
				}else{
					$scope.validacionStock=$scope.tallas[i].cantidad;
					//if ($scope.validacionStock>stock) {
					//	$scope.tallas[i].cantidad=0;
					//	Mensajes("La Cantidad no puede ser mayor al stock","error","");
					//}
					$scope.cantidadrefererencia+=$scope.tallas[i].cantidad;
				}
				$scope.tallas[i].estadoextension2=2;
			}
		}
		$scope.calcularTotalCantidad();
	}
	$scope.calcularTotalCantidad=function(){

		$scope.cantidadrefererencia=0;
		
		for (var i = 0;i<$scope.tallas.length;i++) {
			$scope.cantidadrefererencia+=$scope.tallas[i].cantidad;
		}
	}
	$scope.eliminarColores=function(){
		for (var i =0;i< $scope.tallas.length;i++) {
			if ($scope.tallaInidiceColor.cont1==i) {
				$scope.tallas[i].detalle2=[];
				$scope.tallas[i].estadoextension2=0;
			}
		}
	}
	$scope.cantidadTalla=function(talla,accion,stock)
	{
		if (accion=="restar") {
			for (var i = 0;i<$scope.tallas.length;i++) {

				if ($scope.tallas[i].talla==talla) {
					if ($scope.tallas[i].cantidad==0) {
						return
					}
					//if ($scope.tallas[i].detalle2.length>0) {
						//Mensajes('No puedes disminuir la cantidad con Colores Asignados','error','')
					//	$('#confirmacioncolores').click();
					//	$scope.tallaInidiceColor.cont1=[];
					//	$scope.tallaInidiceColor.cont1=i;
					//	return
					//}
					if ($scope.item.item_custom1!="SI") {
						$scope.tallas[i].cantidad-=0.5;	
						$scope.tallas[i].multiplo--;
					}else{
						$scope.tallas[i].cantidad-=1;	
						$scope.tallas[i].multiplo--;
					}
					$scope.cantidadrefererencia+=$scope.tallas[i].cantidad;
					$scope.tallas[i].estadoextension2=2;
				}
			
			}
				
		}
		else
		{
			for (var i = 0;i<$scope.tallas.length;i++) {
				if ($scope.tallas[i].talla==talla) {

					if ($scope.item.item_custom1!="SI") {
						$scope.tallas[i].cantidad+=0.5;	
						$scope.tallas[i].multiplo++;
						$scope.Validarstock=$scope.tallas[i].cantidad*12;
						//if ($scope.Validarstock>stock) {
						//	$scope.tallas[i].cantidad-=0.5;	
						//	$scope.tallas[i].multiplo--;
						//	Mensajes("La Cantidad no puede ser mayor al stock","error","");
						//}
					}else{
						$scope.tallas[i].cantidad+=1;	
						$scope.tallas[i].multiplo++;
						$scope.Validarstock=$scope.tallas[i].cantidad;
						//if ($scope.Validarstock>stock) {
						//	$scope.tallas[i].cantidad-=1;	
						//	$scope.tallas[i].multiplo--;
						//	Mensajes("La Cantidad no puede ser mayor al stock","error","");
						//}
					}
					$scope.tallas[i].estadoextension2=2;
					
				}
				$scope.cantidadrefererencia+=$scope.tallas[i].cantidad;
				
			}
		}
		$scope.calcularTotalCantidad();
	}
	//var query1="select item.item_referencia||'-'||item.item_descripcion as producto,item.id_unidad,item.rowid as rowid_item,item.item_descripcion as descripcion,precios.rowid as rowid_listaprecios,precios.precio_lista as precio";
	//var query=query1+" from erp_items item inner join erp_items_precios precios on  item.rowid=precios.rowid_item ";
	//CRUD.select(query,function(elem){$scope.list_items.push(elem);});
    $scope.terceroDeTercero=$routeParams.personId;
    $scope.pedidoEditar=0;
    $scope.pedidoEditarEncabezado=[];
    $scope.pedidoEditarMovimiento=[];
    
    if ($scope.terceroDeTercero!=undefined) {
    	if ($scope.terceroDeTercero.includes('p')) {
    	$scope.pedidoEditar=1;

    	$scope.terceroDeTercero=$scope.terceroDeTercero.replace('p','');
    	CRUD.select("select pe.*,su.rowid_tercero as tercero,maestro.erp_id_maestro from t_pedidos pe inner join erp_terceros_sucursales su on pe.rowid_cliente_facturacion=su.rowid inner join erp_entidades_master  maestro  on pe.rowid_lista_precios=maestro.rowid where pe.rowid='"+$scope.terceroDeTercero+"'",function(elem){
    		$scope.pedidoEditarEncabezado=elem;
    		$scope.pedidos.orden_compra=elem.orden_compra;
    		$scope.fechaentrega(elem.fecha_entrega);
    		CRUD.select("select  * from t_pedidos_detalle where rowid_pedido='"+elem.rowid+"'",function(detallePedido){
    			
    			detallePedido.detalle2=[];
    			$scope.pedidoEditarMovimiento.push(detallePedido);
    		});
    		CRUD.select("select*from erp_terceros order by razonsocial",function(tercero){
    			$scope.list_tercero.push(tercero);
    			if (tercero.rowid==elem.tercero) {
    				$scope.terceroSelected=tercero;
    				CRUD.select("select  codigo_sucursal||'-'||nombre_sucursal as sucursal,*from erp_terceros_sucursales where rowid_tercero='"+tercero.rowid+"'",function(sucursal){
    					$scope.list_Sucursales.push(sucursal)
    					if ($scope.pedidoEditarEncabezado.rowid_cliente_facturacion==sucursal.rowid) {
    						$scope.sucursal=sucursal;
    						$scope.onChangeSucursal('edit');
    					}
    				})
    			}
    		})
    	})
    	
    }
    }
    $scope.Empaque=function(){
    	$scope.empaques=[];
    	CRUD.select("select*from m_metaclass where  class_code='PEDIDO.EMPAQUE'",
		function(elem)
		{	
			if ($scope.empaques.length==5) {

			}else{
			$scope.empaques.push(elem)
			//if (elem.tipo_reg_nombre=='SUELTO') {
			//	$scope.empaque=elem
			//}	
			}

			
		});	
    }
	$scope.Empaque();
	if ($scope.pedidoEditar==0) {
		CRUD.select('select*from erp_terceros order by razonsocial',
		function(elem)
		{
			$scope.list_tercero.push(elem);

			if ($scope.terceroDeTercero!=undefined   && elem.rowid==$scope.terceroDeTercero  && $scope.pedidoEditar==0) 
			{
				$scope.terceroSelected=elem
				//$scope.Search=$scope.terceroSelected.razonsocial;
				$scope.onChangeTercero();
				
			}
		});	
	}
	
	
	$scope.stringConsultaItems=function(parm1){
		var count='';
		var vista='';
		if (parm1.pC==1) {
			if ($scope.filter.codigoitem!=''  && $scope.filter.codigoitem!=undefined   &&  ( $scope.filter.descripcionitem==''   || $scope.filter.descripcionitem==undefined)){//  && $scope.filter.descripcionitem=='' || $scope.filter.descripcionitem==undefined ) {
				vista="select*from vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+"  and    item_codigo1 like '%"+$scope.filter.codigoitem+"%'  order by rowid LIMIT 100 ";
				count="select count(*) as cantidad from vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+"  and    item_codigo1 like '%"+$scope.filter.codigoitem+"%'  order by rowid LIMIT 100 ";
			}
			else if ($scope.filter.descripcionitem!='' && $scope.filter.descripcionitem!=undefined && ( $scope.filter.codigoitem=='' || $scope.filter.codigoitem==undefined   )) {
				vista="select*from vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+" and  (tipo_inventario = '"+parm1.p1+"')  and   (   item_referencia1 like '%"+$scope.filter.descripcionitem+"%'   or descripcion like '%"+$scope.filter.descripcionitem+"%' )   order by rowid LIMIT 100";
				count="select count(*) from vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+"  and   (tipo_inventario = '"+parm1.p1+"')  and    (   item_referencia1 like '%"+$scope.filter.descripcionitem+"%'   or descripcion like '%"+$scope.filter.descripcionitem+"%' )   order by rowid LIMIT 100";
			}
			else if ($scope.filter.descripcionitem!='' && $scope.filter.descripcionitem!=undefined && $scope.filter.codigoitem!='' && $scope.filter.codigoitem!=undefined   ) {
				vista="select*from vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+"  and  item_codigo1 like '%"+$scope.filter.codigoitem+"%' and (tipo_inventario = '"+parm1.p1+"')  and    (   item_referencia1 like '%"+$scope.filter.descripcionitem+"%'   or descripcion like '%"+$scope.filter.descripcionitem+"%' )    order by rowid LIMIT 200";
				count="select count(*) as cantidadfrom vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+"  and  item_codigo1 like '%"+$scope.filter.codigoitem+"%' and (tipo_inventario = '"+parm1.p1+"') and    (   item_referencia1 like '%"+$scope.filter.descripcionitem+"%'   or descripcion like '%"+$scope.filter.descripcionitem+"%' )    order by rowid LIMIT 200";
			}
			else {
				vista="select*from vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+" and (tipo_inventario = '"+parm1.p1+"')  order by rowid LIMIT 100 ";
				count="select 100 as cantidad ";
			}
		}
		else if (parm1.pC==2) {
			if ($scope.filter.codigoitem!=''  && $scope.filter.codigoitem!=undefined   &&  ( $scope.filter.descripcionitem==''   || $scope.filter.descripcionitem==undefined)){//  && $scope.filter.descripcionitem=='' || $scope.filter.descripcionitem==undefined ) {
				vista="select*from vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+"  and    item_codigo1 like '%"+$scope.filter.codigoitem+"%'  order by rowid LIMIT 100 ";
				count="select count(*) as cantidad from vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+"  and    item_codigo1 like '%"+$scope.filter.codigoitem+"%'  order by rowid LIMIT 100 ";
			}
			else if ($scope.filter.descripcionitem!='' && $scope.filter.descripcionitem!=undefined && ( $scope.filter.codigoitem=='' || $scope.filter.codigoitem==undefined   )) {
				vista="select*from vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+"  and   (   item_referencia1 like '%"+$scope.filter.descripcionitem+"%'   or descripcion like '%"+$scope.filter.descripcionitem+"%' )  and    (tipo_inventario = '"+parm1.p1+"'  or  tipo_inventario = '"+parm1.p2+"')  order by rowid LIMIT 100";
				count="select count(*) from vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+"  and   (   item_referencia1 like '%"+$scope.filter.descripcionitem+"%'   or descripcion like '%"+$scope.filter.descripcionitem+"%' )  and    (tipo_inventario = '"+parm1.p1+"'  or  tipo_inventario = '"+parm1.p2+"')  order by rowid LIMIT 100";
			}
			else if ($scope.filter.descripcionitem!='' && $scope.filter.descripcionitem!=undefined && $scope.filter.codigoitem!='' && $scope.filter.codigoitem!=undefined   ) {
				vista="select*from vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+"  and  item_codigo1 like '%"+$scope.filter.codigoitem+"%' and   (   item_referencia1 like '%"+$scope.filter.descripcionitem+"%'   or descripcion like '%"+$scope.filter.descripcionitem+"%' )  and    (tipo_inventario = '"+parm1.p1+"'  or  tipo_inventario = '"+parm1.p2+"')   order by rowid LIMIT 200";
				count="select count(*) as cantidadfrom vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+"  and  item_codigo1 like '%"+$scope.filter.codigoitem+"%' and   (   item_referencia1 like '%"+$scope.filter.descripcionitem+"%'   or descripcion like '%"+$scope.filter.descripcionitem+"%' )  and    (tipo_inventario = '"+parm1.p1+"'  or  tipo_inventario = '"+parm1.p2+"')   order by rowid LIMIT 200";
			}
			else {
				vista="select*from vw_items_precios  where  rowid="+$scope.pedidos.rowid_lista_precios+"  order by rowid LIMIT 100 ";
				count="select 100 as cantidad ";
			}
		}

		return vista;
	}
	$scope.onChangeListaPrecios=function(){
		
		if ($scope.pedidos.rowid_lista_precios==undefined) {$scope.list_items=[];return}
		$scope.list_items=[];
		
		$scope.filtroCO=[];
		if ($scope.sucursal.centro_operacion=='001') {
			$scope.filtroCO.p1='IN300501';
			$scope.filtroCO.pC=1;
		}
		else if ($scope.sucursal.centro_operacion=='003') 
		{
			$scope.filtroCO.p1='IN300502';
		
			$scope.filtroCO.p2='IN300503';
			$scope.filtroCO.pC=2;
		}
		$scope.result=$scope.stringConsultaItems($scope.filtroCO);
		CRUD.select($scope.result,function(elem){$scope.list_items.push(elem);if ($scope.bandera.banderaEditar==true) {$scope.item=$scope.list_items[0]}});
		
	}
	$scope.onChangeFiltro=function()
	{
		if ($scope.SearchItem=='') {$scope.item=[]}
	}
	$scope.onGetFiltro=function()
	{
		$scope.onChangeListaPrecios();		
	}
	$scope.CurrentDate=function(){
		$scope.day;
		$scope.DayNow=Date.now();
		$scope.YearS=$scope.DayNow.getFullYear();
		$scope.MonthS=$scope.DayNow.getMonth()+1;
		if ($scope.MonthS<10) {$scope.MonthS='0'+$scope.MonthS}
		$scope.DayS=$scope.DayNow.getDate();
		$scope.HourS=$scope.DayNow.getHours();
		$scope.MinuteS=$scope.DayNow.getMinutes();
		if ($scope.DayS<10) {$scope.DayS='0'+$scope.DayS}
		$scope.day=$scope.YearS+'-'+$scope.MonthS+'-'+$scope.DayS;
		return $scope.day;
	}
	$scope.SelectedDate=function(daySelected){
		$scope.day;
		$scope.DayNow=new Date(daySelected);
		$scope.YearS=$scope.DayNow.getFullYear();
		$scope.MonthS=$scope.DayNow.getMonth()+1;
		if ($scope.MonthS<10) {$scope.MonthS='0'+$scope.MonthS}
		$scope.DayS=$scope.DayNow.getDate();
		$scope.HourS=$scope.DayNow.getHours();
		$scope.MinuteS=$scope.DayNow.getMinutes();
		if ($scope.DayS<10) {$scope.DayS='0'+$scope.DayS}
		$scope.day=$scope.YearS+'-'+$scope.MonthS+'-'+$scope.DayS;
		return $scope.day;
	}


	$scope.guardarTermporal=function(){
		$scope.validacionInsert('temporal');
	}
	$scope.fechasolicitud=function(){
		$scope.pedidos.fecha_solicitud=$scope.SelectedDate($scope.date);
		$scope.datenow=new Date();
		$scope.pedidos.fechacreacion=$scope.CurrentDate();
		$scope.pedidos.fecha_pedido=$scope.CurrentDate();
		var FechaCreacion=$scope.pedidos.fechacreacion.replace('-','');
		var FechaSolicitud=$scope.pedidos.fecha_solicitud.replace('-','');
		FechaCreacion=FechaCreacion.replace('-','');
    	 FechaSolicitud=FechaSolicitud.replace('-','');
	}
	$scope.fechachange=0;
	$scope.fechaentrega=function(fechaEdit){
		if ($scope.pedidoEditar==1 && $scope.fechachange==0 && fechaEdit!=undefined) {
			var fechanueva=new Date(fechaEdit);
			fechanueva.setDate(fechanueva.getDate() + 1);
			document.getElementById("fecha_entrega").valueAsDate = fechanueva
			$scope.dateEntrega=	document.getElementById("fecha_entrega").valueAsDate;
			$scope.fechachange=1;
		}
		var hoy = new Date($scope.dateEntrega);
		//hoy.setTime(hoy.getTime()+24*60*60*1000);
		var i=hoy.getDay()
		if (i==0) {
			Mensajes('No se puede seleccionar un dia festivo','error','');
    		$scope.pedidos.fecha_entrega='';
    		document.getElementById("fecha_entrega").valueAsDate = null;
    		return;
		}
		

		$scope.pedidos.fecha_solicitud=$scope.CurrentDate();
		$scope.pedidos.fechacreacion=$scope.CurrentDate();
		$scope.pedidos.fecha_entrega=$scope.SelectedDate($scope.dateEntrega);
		$scope.pedidos.fecha_pedido=$scope.CurrentDate();
    	var FechaCreacion=$scope.pedidos.fechacreacion.replace('-','');
    	var FechaEntrega=$scope.pedidos.fecha_entrega.replace('-','');
    	 FechaCreacion=FechaCreacion.replace('-','');
    	 FechaEntrega=FechaEntrega.replace('-','');
    	if (FechaEntrega<FechaCreacion) {
    		Mensajes('Fecha Entrega No puede ser Menor que La Fecha creacion del pedido','error','');
    		$scope.pedidos.fecha_entrega='';
    		document.getElementById("fecha_entrega").valueAsDate = null;
    		return;
    	}
	}
	$scope.onChangeComboItem=function(){
		
		$scope.tallas=[];
		CRUD.select("select distinct  e.itemID,item.item_referencia,e.extencionDetalle1ID as talla,0 as cantidad,0  as multiplo,ext1_d.erp_descripcion_corta,sum(e.stock) as stock from erp_items_extenciones  e inner join erp_items item on item.rowid=e.itemID inner join  erp_item_extencion1_detalle ext1_d on ext1_d.rowid_erp=e.extencionDetalle1ID where e.itemID='"+$scope.item.rowid_item+"'  group by e.itemID,item.item_referencia,e.extencionDetalle1ID,ext1_d.erp_descripcion_corta order by ext1_d.erp_descripcion_corta ",function(elem){
			//estado 0 inicia sin colores
			elem.estadoextension2=0;
			elem.detalle2=[];
			$scope.validaciones=true;
			if ($scope.bandera.banderaEditar==true) {
				angular.forEach($scope.bandera.itemEdit.tallas,function(value,key){
					if (value.talla==elem.talla) {
						elem.cantidad=value.cantidad;
						elem.detalle2=value.detalle2
						if (value.detalle2.length>0) {
							elem.estadoextension2=1;	
						}
						
					}
				})
			}
			
			$scope.tallas.push(elem);
			$scope.calcularTotalCantidad();
		})
	}
	$scope.cantidadRestanteDetalle2=function(cantidad){
		$scope.contadorCantidades=0;
		$scope.contadorDetalle2=0;
		for (var i = 0;i<$scope.itemextension2Detalle.length;i++) {
			$scope.contadorCantidades+=$scope.itemextension2Detalle[i].cantidad;
			$scope.contadorDetalle2+=$scope.itemextension2Detalle[i].cantidad;
		}

		$scope.cantidadRestante=cantidad-$scope.contadorDetalle2;
	}
	$scope.cantidadRestante=0;
	$scope.onChangeCantidadDetalle2=function(extension,stock,cantidad){

		$scope.cantidadRestante=0;
		$scope.contadorDetalle2=0;
		if ($scope.item.item_custom1!="SI") {
			cantidad=cantidad*12;
		}
		for (var i =0;i<$scope.itemextension2Detalle.length;i++) {
			$scope.cantidadRestante+=$scope.itemextension2Detalle[i].cantidad;
			$scope.contadorDetalle2+=$scope.itemextension2Detalle[i].cantidad;
		}
		$scope.cantidadRestante=cantidad-$scope.cantidadRestante;
		for (var i = 0;i<$scope.itemextension2Detalle.length;i++) {
			if ($scope.itemextension2Detalle[i].extencionDetalle2ID==extension) {
				
				if ($scope.item.item_custom1!="SI") {
					
					$scope.validacionStock=$scope.itemextension2Detalle[i].cantidad;
					//if ($scope.validacionStock>stock) {
					//	$scope.itemextension2Detalle[i].cantidad=0;
					//	$scope.contadorDetalle2=$scope.contadorDetalle2-$scope.itemextension2Detalle[i].cantidad;
					//	Mensajes("La Cantidad no puede ser mayor al stock","error","");
					//}
					if ($scope.contadorDetalle2>cantidad) {
						$scope.itemextension2Detalle[i].cantidad=0;
						$scope.contadorDetalle2=$scope.contadorDetalle2-$scope.itemextension2Detalle[i].cantidad;
						Mensajes("La Cantidad no sobrepasar la Cantidad Inicial","error","");
					}
				}else{
					$scope.validacionStock=$scope.itemextension2Detalle[i].cantidad;
					//if ($scope.validacionStock>stock) {
					//	$scope.itemextension2Detalle[i].cantidad=0;
					//	$scope.contadorDetalle2=$scope.contadorDetalle2-$scope.itemextension2Detalle[i].cantidad;
					//	Mensajes("La Cantidad no puede ser mayor al stock","error","");
					//}
					if ($scope.validacionStock>cantidad) {
						$scope.itemextension2Detalle[i].cantidad=0;
						$scope.contadorDetalle2=$scope.contadorDetalle2-$scope.itemextension2Detalle[i].cantidad;
						Mensajes("La Cantidad no sobrepasar la Cantidad Inicial","error","");
					}
				}
					
			}
		}
		$scope.contadorDetalle2=0;
		for (var i =0;i<$scope.itemextension2Detalle.length;i++) {
			$scope.contadorDetalle2+=$scope.itemextension2Detalle[i].cantidad;
		}
		$scope.cantidadRestanteDetalle2(cantidad);
	}
	$scope.InfoItemAdicional=[];
	$scope.consultaDetalle2=function(item,talla,cantidad){
		item=item.trim();
		$scope.InfoItemAdicional=[];
		if ($scope.item.item_custom1!='SI') {
			$scope.InfoItemAdicional.cantidad=cantidad*12;	
		}
		$scope.cantidadParcialItem=$scope.InfoItemAdicional.cantidad
		$scope.InfoItemAdicional.talla=talla;
		$scope.itemextension2Detalle=[];
		$scope.contadorDetalle2=0;
		$scope.banderaConsumo=1;
		for (var i =0;i<$scope.tallas.length;i++) {

			if ($scope.tallas[i].talla==talla) {
				if ($scope.tallas[i].detalle2.length!=0) {
					for (var f=0;f<$scope.tallas[i].detalle2.length;f++) {
						$scope.tallas[i].detalle2[f].cantidadextension1=cantidad;	
					}
					$scope.itemextension2Detalle=$scope.tallas[i].detalle2;
					$scope.banderaConsumo=0;
				}
			}
		}

		if ($scope.banderaConsumo==1) {
			CRUD.select("select*,0 as cantidad,'"+cantidad+"' as cantidadextension1 from erp_items_extenciones where itemID='"+item+"'  and  extencionDetalle1ID='"+talla+"' ",function(elem){
				$scope.itemextension2Detalle.push(elem);
			})	
		}
		$scope.cantidadRestanteDetalle2($scope.InfoItemAdicional.cantidad);
		
	}
	$scope.contadorDetalle2=0;
	$scope.agregarColoresTalla=function(){
		for (var i = 0;i<$scope.tallas.length;i++) {
			if ($scope.tallas[i].talla==$scope.InfoItemAdicional.talla) {
				$scope.tallas[i].detalle2=$scope.itemextension2Detalle;

				if ($scope.contadorDetalle2==$scope.cantidadParcialItem) {
					//si se le agregaron todos los colores a la talla
					$scope.tallas[i].estadoextension2=1;
				}else if ($scope.contadorDetalle2>0) {
					$scope.tallas[i].estadoextension2=2;
				}
				else
				{
					$scope.tallas[i].estadoextension2=0;
				}

			}
		}
	}
	$scope.adicionarCantidadDetalle2=function(extension,accion,stock,cantidad){
		
		if ($scope.item.item_custom1!="SI") {
			cantidad=cantidad*12;
		}
		
		if (accion=="restar") {
			for (var i = 0;i<$scope.itemextension2Detalle.length;i++) {

				if ($scope.itemextension2Detalle[i].extencionDetalle2ID==extension) {
					if ($scope.itemextension2Detalle[i].cantidad==0) {
						return
					}
					if ($scope.item.item_custom1!="SI") {
						$scope.itemextension2Detalle[i].cantidad-=1;
						$scope.contadorDetalle2--;	
					}else{
						$scope.itemextension2Detalle[i].cantidad-=1;
						$scope.contadorDetalle2--;		
					}
					
				}
			}
				
		}
		else
		{

			if ($scope.contadorDetalle2==cantidad) {
				Mensajes('Cantidad Maxima Alcanzada','error','');
				return
			}
			for (var i = 0;i<$scope.itemextension2Detalle.length;i++) {
				if ($scope.itemextension2Detalle[i].extencionDetalle2ID==extension) {
					if ($scope.item.item_custom1!="SI") {
						$scope.itemextension2Detalle[i].cantidad+=1;	
						$scope.Validarstock=$scope.itemextension2Detalle[i].cantidad;
						$scope.contadorDetalle2++;	
						//if ($scope.Validarstock>stock) {
						//	$scope.itemextension2Detalle[i].cantidad-=1;	
						//	$scope.contadorDetalle2--;	
						//	Mensajes("La Cantidad no puede ser mayor al stock","error","");
						//}
						if ($scope.itemextension2Detalle[i].cantidad>cantidad) {
							$scope.itemextension2Detalle[i].cantidad-=1;	
							$scope.contadorDetalle2--;	
							Mensajes("La Cantidad no puede sobrepasar la Cantidad Seleccionada","error","");
						}
					}else{
						$scope.itemextension2Detalle[i].cantidad+=1;	
						$scope.contadorDetalle2++;	
						$scope.Validarstock=$scope.itemextension2Detalle[i].cantidad;
						//if ($scope.Validarstock>stock) {
						//	$scope.itemextension2Detalle[i].cantidad-=1;	
						//	$scope.contadorDetalle2--;	
						//	Mensajes("La Cantidad no puede ser mayor al stock","error","");
						//}
						if ($scope.itemextension2Detalle[i].cantidad>cantidad) {
							$scope.itemextension2Detalle[i].cantidad-=1;	
							$scope.contadorDetalle2--;	
							Mensajes("La Cantidad no puede sobrepasar la Cantidad Seleccionada","error","");
						}
					}
					
				}
			}
		}
		$scope.cantidadRestanteDetalle2(cantidad);
	}

	$scope.openModalDetalle2=function(item,talla,cantidad){
		if (cantidad==undefined) {
			Mensajes('Agregar Cantidad','error','');
			return
		}
		if (cantidad==0) {
			Mensajes('Agregar Cantidad','error','');
			return
		}
		$scope.consultaDetalle2(item,talla,cantidad);
		$('#extension2').click();

		
	}
	$scope.onChangePuntoEnvio=function()
	{
		$scope.sucursalDespacho=$scope.puntoEnvio;
		$scope.pedidos.id_punto_envio=$scope.puntoEnvio.rowid
	}
	$scope.onChangeTercero=function(){
		$scope.list_Sucursales=[];
		$scope.list_puntoEnvio=[];
		$scope.tallas=[];
		$scope.sucursalDespacho=[];
		$scope.ciudad='';
		$scope.CantidadTotalPedido=0;
		$scope.itemsAgregadosPedido=[];
		$scope.ciudadSucursal=[];
		$scope.list_items=[];
		$scope.filter=[];
		$scope.list_precios=[];
		CRUD.select("select  codigo_sucursal||'-'||nombre_sucursal as sucursal,*from erp_terceros_sucursales where rowid_tercero = '"+$scope.terceroSelected.rowid+"'   order by codigo_sucursal",function(elem){$scope.list_Sucursales.push(elem)})

		//CRUD.selectParametro('erp_terceros_sucursales','rowid_tercero',$scope.terceroSelected.rowid,function(elem){$scope.list_Sucursales.push(elem)});
		//CRUD.selectParametro('erp_terceros_punto_envio','rowid_tercero',$scope.terceroSelected.rowid,function(elem){$scope.list_puntoEnvio.push(elem)});	''
		//$scope.pedidos.rowid_tercero=$scope.terceroSelected.rowid
	}
	CRUD.select("select count(*) as cantidad from erp_entidades_master ",function(elem){console.log(elem.cantidad)})
	$scope.contadoritemEditados=0;
	$scope.onChangeSucursal=function(parm){
		
		if ($scope.sucursal==undefined) {$scope.pedidos.rowid_lista_precios='';$scope.list_items=[];return}
		$scope.list_precios=[];
		var consultacriterio="select*from erp_entidades_master where id_tipo_maestro='CRITERIO_CLASIFICACION' and erp_id_maestro='"+$scope.sucursal.id_criterio_clasificacion.trim()+"'"
		CRUD.select(consultacriterio,function(elem){
			$scope.criterio=elem;
		})
		CRUD.select("select count(*) as dataValidacion,erp_id_maestro||'-'||erp_descripcion as concatenado ,*from erp_entidades_master where erp_id_maestro = '"+$scope.sucursal.id_lista_precios+"'  and id_tipo_maestro='LISTA_PRECIOS' order by rowid LIMIT 1",
			
			function(elem){
				
				if (elem.dataValidacion==0) {
					
					CRUD.select("select erp_id_maestro||'-'||erp_descripcion as concatenado , * from erp_entidades_master where erp_id_maestro = '001' and id_tipo_maestro='LISTA_PRECIOS'",function(elem){
						
						$scope.list_precios.push(elem);$scope.listaPrecios=$scope.list_precios[0];$scope.pedidos.rowid_lista_precios=$scope.listaPrecios.rowid;//$scope.onChangeListaPrecios();
					})
				}
				else
				{
					$scope.list_precios.push(elem);$scope.listaPrecios=$scope.list_precios[0];$scope.pedidos.rowid_lista_precios=$scope.listaPrecios.rowid;//$scope.onChangeListaPrecios();		
					if (parm=='edit') {
						$scope.onAddItemsEdit();
					}

				}
			});
		//CRUD.selectParametro('erp_entidades_master','erp_id_maestro',$scope.sucursal.id_lista_precios,function(elem){$scope.list_precios.push(elem)});
		$scope.pedidos.rowid_cliente_facturacion=$scope.sucursal.rowid;
		$scope.sucursalDespacho=$scope.sucursal;
		//$scope.sucursalDespacho=$scope.sucursal;
		$scope.onChangeSucursalDespacho();
	}
	$scope.onAddItemsEdit=function(){
		
		$scope.detallesPedidoEdit=[];
		$scope.items=[];
		$scope.contadores=[];
		$scope.contadores.cont1=0;
		CRUD.select("select distinct dt.rowid_item,dt.linea_descripcion,dt.rowid_pedido,item.item_referencia,dt.empaque from t_pedidos_detalle dt inner join erp_items item on item.rowid=dt.rowid_item  where dt.rowid_pedido='"+$scope.pedidoEditarEncabezado.rowid+"'",function(detalle){
			
			detalle.tallas=[];
			$scope.detallesPedidoEdit.push(detalle);
			CRUD.select("select*from vw_items_precios  where  rowid="+$scope.pedidoEditarEncabezado.rowid_lista_precios+" and rowid_item='"+detalle.rowid_item+"'",function(items){
				items.empaque='';
				items.empaqueshow='';
				items.tallas=[];
				$scope.items.unshift(items)
			})
			CRUD.select("select count(*) as c,'"+detalle.rowid_item+"' as rowid_item from t_pedidos_detalle where rowid_pedido='"+$scope.pedidoEditarEncabezado.rowid+"'  and  rowid_item='"+detalle.rowid_item+"'",function(detalle1){
				
				CRUD.select("select  '"+detalle1.c+"' as contador ,dt.*,item.item_referencia from t_pedidos_detalle dt inner join erp_items item on item.rowid=dt.rowid_item  where rowid_pedido='"+$scope.pedidoEditarEncabezado.rowid+"'  and  rowid_item='"+detalle1.rowid_item+"'",function(tallas){
					
					$scope.contadores.cont1++;
					for (var i =0;i<$scope.items.length;i++) {
						if (tallas.rowid_item==$scope.items[i].rowid_item) {
							$scope.talla=[];
							
							$scope.talla.cantidad=tallas.cantidad/12;
							$scope.talla.talla=tallas.item_ext1;
							$scope.talla.detalle2=[];
							$scope.talla.estadoextension2=1;
							$scope.talla.item_referencia=tallas.item_referencia;
							$scope.talla.erp_descripcion_corta=tallas.rowid_item_ext;
							$scope.items[i].tallas.push($scope.talla);
							$scope.items[i].empaque=tallas.empaque;
							$scope.items[i].empaqueshow=tallas.empaque;

						}
					}
					if ($scope.contadores.cont1==tallas.contador) {
						
						for (var i =0;i<$scope.items.length;i++) {
							if (tallas.rowid_item==$scope.items[i].rowid_item) {

								$scope.item=$scope.items[i];

								$scope.tallas=$scope.items[i].tallas;
								$scope.adicionaritem('edit');
							}
						}
						$scope.contadores.cont1=0;
					}
				})
			})
		})

		$timeout(function () {
		     //agregar array de colores a tallas
			CRUD.select("select tpdd.*,tpd.rowid_item,tpd.item_ext1,tpd.cantidad as cantidadextension1,i.item_custom1,tpd.rowid_item from t_pedidos_detalle_detalle tpdd inner join t_pedidos_detalle tpd on tpd.rowid=tpdd.pedidoDetalle inner join t_pedidos tp on tp.rowid=tpd.rowid_pedido left join erp_items i on tpd.rowid_item=i.rowid   where tp.rowid='"+$scope.terceroDeTercero+"' ",function(elem){
				if (elem.item_custom1!='SI') {
					elem.cantidadextension1=elem.cantidadextension1/12;
				}
				debugger
				CRUD.select("select*,"+elem.cantidad+" as cantidad,'"+elem.cantidadextension1+"' as cantidadextension1 from erp_items_extenciones where itemID='"+elem.rowid_item+"'  and  extencionDetalle1ID='"+elem.item_ext1+"' ",function(colors){
					
					for (var i = 0;i<$scope.itemsAgregadosPedido.length;i++ ) {
						if (colors.itemID==$scope.itemsAgregadosPedido[i].rowid_item) {
							for (var f=0;f<$scope.itemsAgregadosPedido[i].tallas.length;f++) {
								if (colors.extencionDetalle1ID==$scope.itemsAgregadosPedido[i].tallas[f].talla) {
									debugger
									$scope.itemextension2Detalle.push(colors);
								}
							}
						}
					}
				})	
				
			})   
		    }, 3000);

	}
	$scope.confimar=[];
	$scope.confimar.next=[]
	$scope.confimar.current=[]
	$scope.confimar.salir=false
	$scope.onConfirmarSalida=function(accion){
		if (accion=='salir') {
			var a='';
			if ($scope.confimar.next.params.modulo==undefined) {
				a='/';
			}
			else{
				a='/'+$scope.confimar.next.params.modulo+'/'+$scope.confimar.next.params.url;
			}

			$timeout(function () {
		        $location.path(a)
		    }, 100);
			
		}else if (accion=='permanecer') {
			$scope.confimar.salir=false;
			
		}
		else if (accion=='guardar') {
			$scope.confimar.salir=false;
			$scope.validacionInsert()
		}
	}
	$scope.$on('$routeChangeStart', function(event,next, current) { 
		if ($scope.confimar.salir==false) {
			$scope.confimar.next=next;
			  $scope.confimar.current=current
			  $scope.confimar.salir=true;
			  event.preventDefault();
			  $('#confirmacion').click();
		}
		
		  
	 });
	$scope.onChangeSucursalDespacho=function()
	{
		//console.log("select  *from erp_terceros_punto_envio where rowid_tercero = '"+$scope.terceroSelected.rowid+"'  and  codigo_sucursal = '"+$scope.sucursalDespacho.codigo_sucursal+"'   order by rowid  LIMIT 1  ");
		$scope.pedidos.rowid_cliente_despacho=$scope.sucursalDespacho.rowid;
		//CRUD.select("select pais.nombre||'-'||ciudad.nombre as nombre from m_localizacion  pais inner join m_localizacion ciudad  on ciudad.id_pais=pais.id_pais and pais.id_depto='' and pais.id_ciudad=''  where ciudad.id_ciudad='"+$scope.sucursalDespacho.id_ciudad+"' and ciudad.id_depto='"+$scope.sucursalDespacho.id_depto+"' and ciudad.id_pais='"+$scope.sucursalDespacho.id_pais+"'",
		//	function(elem){$scope.ciudadSucursal=elem});
		
		CRUD.select("select direccion ||'-'|| nombre_punto_envio as concatenado, *from erp_terceros_punto_envio where rowid_tercero = '"+$scope.terceroSelected.rowid+"'  and  codigo_sucursal = '"+$scope.sucursalDespacho.codigo_sucursal+"'   order by direccion ",
			function(elem){$scope.list_puntoEnvio.push(elem);
				//$scope.pedidos.id_punto_envio=elem.rowid;$scope.puntoEnvio=elem
				if ($scope.pedidoEditar==1) {
					if (elem.rowid==$scope.pedidoEditarEncabezado.id_punto_envio) {
						$scope.puntoEnvio=elem;
					}
				}
			});
	}

	$scope.finalizarPedido=function(destino){

		if($scope.itemsAgregadosPedido.length==0)
		{
			Mensajes('Debe Seleccionar al menos un item de la lista','error','');
			$('#btnGuardar').removeAttr('disabled');
			return
		}
		$scope.guardarCabezera(destino);
		window.setTimeout(function(){
			$scope.guardarDetalle(destino);
		},2000)
		Mensajes('Pedido Guardado Correctamente','success','');
		window.setTimeout(function(){
			$scope.confimar.salir=true
			window.location.href = '#/ventas/pedidos_ingresados';
		},2200)
		
	}
	$scope.onChangeFiltroTercero=function(){
		if ($scope.Search=='') {$scope.terceroSelected=[];}
	}
	$scope.adicionaritem=function(parm){
		if (parm!='edit') {
			if($scope.item==null)
			{
				Mensajes('Seleccione un item de la lista','error','');
				return
			}
			if($scope.item==null)
			{
				Mensajes('Seleccione un item de la lista','error','');
				return
			}
			if($scope.item.length==0)
			{
				Mensajes('Seleccione un item de la lista','error','');
				return
			}
			if($scope.empaque.length==0)
			{
				Mensajes('Seleccione el empaque','error','');
				return
			}
		}
		$scope.banderacoloresincompletos=false;
		for (var i =0;i< $scope.tallas.length ;i++) {
			if ($scope.tallas[i].cantidad==0) {
				$scope.tallas[i].detalle2=[];
			}
			if ($scope.tallas[i].cantidad>0 && $scope.tallas[i].estadoextension2!=1) {
				$scope.banderacoloresincompletos=true;
			}
		}
		if ($scope.banderacoloresincompletos) {
			Mensajes('Asignar todos los colores a las tallas.','error','');
			return
		}
		$scope.validarExistencia=false;
		
		angular.forEach($scope.itemsAgregadosPedido,function(value,key){
			if ($scope.item.rowid_item==value.rowid_item) {
				if ($scope.bandera.banderaEditar==true) {
					$scope.delete($scope.bandera.banderaEditarDelete)
				}
				else
				{
					$scope.validarExistencia=true;
				}
			}
		})
		if($scope.validarExistencia)
		{
			Mensajes('Item ya existe en el pedido','error','');
			return
		}
		$scope.multiplo=0;
		$scope.validacionCantidades=0;
		$scope.item.iva=$scope.item.precio*$scope.item.impuesto_porcentaje/100;
		$scope.item.valorTotal=0;
		$scope.tallasAgregar=[];
		$scope.item.cantidad=0;
		$scope.validacionprimerofiltro=false;
		$scope.validacionCantidadesmutiplo=false;
		$scope.longitudarray=$scope.tallas.length;
		for (var i=1;i<9;i++) {
			
			$scope.banderaSimilar=true;
			for (var f=0;f<$scope.tallas.length;f++) {
				$scope.i=parseInt($scope.tallas[f].erp_descripcion_corta);
				if ($scope.i==i) {
					$scope.var1=0;
					if ($scope.item.item_custom1!="SI") {
						$scope.var1=$scope.tallas[f].cantidad*12;
					}else{
						$scope.var1=$scope.tallas[f].cantidad;	
					}
					
					$scope.tallas[f].cantidad1=parseInt($scope.var1);
					$scope.multiplo=$scope.tallas[f].multiplo;
					$scope.item.cantidad+=$scope.tallas[f].cantidad1;
					$scope.validacionCantidades++;
					$scope.tallasAgregar.push($scope.tallas[f]);
					$scope.banderaSimilar=false;
				}
			}
			if ($scope.banderaSimilar) {
					$scope.tallas1=[];
					$scope.tallas1.itemID="0";
					$scope.tallas1.item_referencia1="0";
					$scope.tallas1.talla="0";
					$scope.tallas1.cantidad="0";
					$scope.tallas1.cantidad1=0;
					$scope.tallas1.multiplo="0";
					$scope.tallas1.erp_descripcion_corta="0";
					$scope.tallasAgregar.push($scope.tallas1);
				}
		}

			
		if ($scope.item.cantidad<1) {
			Mensajes('Tallas sin Cantidades','error','');
		return
		}
		$scope.item.multiplo=$scope.multiplo;
		$scope.item.tallas=$scope.tallasAgregar;
		if ($scope.Variables==undefined) {
			$scope.item.observaciones='';	
		}else{
			$scope.item.observaciones=$scope.Variables.descripcion;	
		}
		if (parm!='edit') {
			$scope.item.empaque=$scope.empaque.tipo_reg_nombre;
			$scope.item.empaqueshow=$scope.empaque.tipo_reg_nombre.slice(0,3);	
		}
		else{
			$scope.item.empaqueshow=$scope.item.empaqueshow.slice(0,3);	
		}
		
		$scope.itemsAgregadosPedido.unshift($scope.item);
		Mensajes('Item Agregado','success','');
		$scope.CantidadTotalPedido=0;
		for (var i = 0;i<$scope.itemsAgregadosPedido.length;i++) {
			$scope.CantidadTotalPedido+=$scope.itemsAgregadosPedido[i].cantidad;
		}
		$scope.item=[];
		$scope.SearchItem='';
		$scope.cantidadBase='';
		$scope.CalcularCantidadValorTotal();
		$scope.filter=[];
		$scope.empaque=[];
		$scope.tallas=[];
		$scope.list_items=[];
		$scope.Variables=undefined;
		$scope.tallasAgregar=[];
		$scope.validaciones=false;
		$scope.bandera.banderaEditar=false;
		$scope.cantidadrefererencia=0;
		$scope.Empaque();
		$('#rowid_item').focus();

	}


	$scope.CalcularCantidadValorTotal=function(){
		$scope.valortotal=0;
		$scope.iva=0;
		$scope.cantidad=0;
		$scope.ivatotal=0;
		$scope.precioEstandar=0;
		$scope.precioEstandar1=0;
		angular.forEach($scope.itemsAgregadosPedido,function(value,key){
			$scope.precioEstandar1+=value.precio*value.cantidad;
			$scope.precioEstandar=value.precio*value.cantidad;
			$scope.valortotal+=$scope.precioEstandar;
			$scope.cantidad+=value.cantidad;
			$scope.ivatotal+=value.iva*value.cantidad;
		})
		$scope.pedidoDetalles.neto=$scope.precioEstandar1;
		$scope.pedidoDetalles.iva=$scope.ivatotal;
		$scope.pedidoDetalles.cantidad=$scope.cantidad;
		$scope.pedidoDetalles.total=$scope.valortotal+$scope.ivatotal;
		localStorage.removeItem('valores'); 
		localStorage.setItem('valores',JSON.stringify($scope.pedidoDetalles));
	}
	$scope.editItem=function(item,index){
		$scope.filter.descripcionitem=item.item_referencia1;
		$scope.onChangeListaPrecios();
		$scope.bandera.banderaEditar=true;
		$scope.bandera.banderaEditarDelete=index;
		$scope.bandera.itemEdit=item;
		$scope.empaque.tipo_reg_nombre=item.empaque;
		$scope.empaques=[];
		CRUD.select("select*from m_metaclass where  class_code='PEDIDO.EMPAQUE'",
		function(elem)
		{
			$scope.empaques.push(elem)
			if (elem.tipo_reg_nombre==item.empaque) {
				$scope.empaque=elem;
			}
			
		});
		$scope.item=item;
		$scope.Variables=[];
		$scope.Variables.descripcion=item.observaciones;
		$scope.onChangeComboItem();
		//console.log(index)
    	//$scope.itemsAgregadosPedido.splice(index, 1);
    	//$scope.CalcularCantidadValorTotal();
    	$scope.actualizarPrecio();

    	$scope.CambiarTab('3','atras');
	}
	$scope.delete = function (index) {
		console.log(index)
    	$scope.itemsAgregadosPedido.splice(index, 1);
    	$scope.CalcularCantidadValorTotal();
    	$scope.CalcularCantidadTotal();
	}
	$scope.CalcularCantidadTotal=function(){
		
		$scope.CantidadTotalPedido=0;
		angular.forEach($scope.itemsAgregadosPedido,function(value,key){
			$scope.CantidadTotalPedido+=value.cantidad;
		})
	};

	$scope.guardarDetalle=function(destino){
		$scope.tablaEncabezadoDestino='';
		$scope.tablaMovimientoDestino='';
		if (destino=='temporal') {
			$scope.tablaEncabezadoDestino='t_pedidos_temporal';
			$scope.tablaMovimientoDestino='t_pedidos_detalle_temporal';
		}else{
			$scope.tablaEncabezadoDestino='t_pedidos';
			$scope.tablaMovimientoDestino='t_pedidos_detalle';
		}
		CRUD.select('select max(rowid) as rowid from t_pedidos',function(elem){
			$scope.pedidos.rowid=elem.rowid;
			angular.forEach($scope.itemsAgregadosPedido,function(value,key){
			angular.forEach(value.tallas,function(detalle,key){
				$scope.detalle=[];
				if (detalle.cantidad==0) {
					return
				}
				detalle.cantidad=detalle.cantidad1;
				$scope.detalle.rowid_item=value.rowid_item;
				$scope.detalle.rowid_pedido=$scope.pedidos.rowid;
				$scope.detalle.linea_descripcion=value.descripcion;
				$scope.detalle.id_unidad=value.id_unidad;
				$scope.detalle.cantidad=detalle.cantidad;
				$scope.detalle.factor=0;
				$scope.detalle.cantidad_base=detalle.cantidad;
				$scope.detalle.stock=0;
				$scope.detalle.porcen_descuento=value.impuesto_porcentaje;
				$scope.calculo=[];
				$scope.calculo.valor_base=value.precio*detalle.cantidad;
				$scope.calculo.iva=$scope.calculo.valor_base*value.impuesto_porcentaje/100;
				$scope.detalle.valor_impuesto=$scope.calculo.iva
				$scope.calculo.total=$scope.calculo.valor_base+$scope.calculo.iva;
				$scope.detalle.valor_descuento=0;
				$scope.detalle.rowid_item_ext=parseInt(detalle.erp_descripcion_corta);
				$scope.detalle.valor_total_linea=$scope.calculo.total;
				$scope.detalle.precio_unitario=value.precio;
				$scope.detalle.valor_base=value.precio*detalle.cantidad;
				$scope.detalle.usuariocreacion=$scope.sessiondate.nombre_usuario;
				$scope.detalle.empaque=value.empaque;
				$scope.detalle.item_ext1=detalle.talla;
				$scope.detalle.observaciones=value.observaciones;
				$scope.detalle.fechacreacion=$scope.CurrentDate();
				CRUD.insert($scope.tablaMovimientoDestino,$scope.detalle);
				CRUD.select("select max(rowid) as rowid from t_pedidos_detalle",function(Detalle){
					for (var i = 0;i<detalle.detalle2.length;i++) {
					if (detalle.detalle2[i].cantidad>0) {
						$scope.extensionInsert=[];
						$scope.extensionInsert.cantidad=detalle.detalle2[i].cantidad;
						debugger
						$scope.extensionInsert.pedidoDetalle=parseInt(Detalle.rowid)
						$scope.extensionInsert.itemExtension2Detalle=detalle.detalle2[i].extencionDetalle2ID
						$scope.extensionInsert.usuariocreacion=$scope.sessiondate.nombre_usuario;
						CRUD.insert("t_pedidos_detalle_detalle",$scope.extensionInsert);
					}
					
				}	
				})
				
			})
			
			
		})









		})
		var a=0;
		
		
		CRUD.select('SELECT  SUM (valor_base)  as total,SUM (cantidad)  as cantidad FROM  t_pedidos_detalle  where rowid_pedido='+$scope.pedidos.rowid+'',function(elem){$scope.pedidoDetalles.push(elem)});
	}
	$scope.actualizarPrecio=function(){
		$scope.CalcularCantidadValorTotal();
	}
	$scope.guardarCabezera=function(destino){
		if ($scope.pedidoEditar==1) {
			CRUD.Delete('t_pedidos',$scope.terceroDeTercero);
			CRUD.DeleteDetalle('t_pedidos_detalle',$scope.terceroDeTercero);
		}
		$scope.tablaDestino='';
		if (destino=='temporal') {
			$scope.tablaDestino='t_pedidos_temporal';
		}else{
			$scope.tablaDestino='t_pedidos';
		}
		debugger
		//$scope.pedido_detalle.rowid_pedido=$scope.pedidos.rowid;
		$scope.pedidos.modulo_creacion='MOBILE';
		$scope.pedidos.valor_total=$scope.pedidoDetalles.total;
		$scope.pedidos.valor_base=$scope.pedidoDetalles.neto;
		$scope.pedidos.usuariocreacion=$scope.sessiondate.nombre_usuario;
		$scope.pedidos.rowid_empresa=4;
		$scope.pedidos.id_cia=1;
		$scope.pedidos.fecha_solicitud=$scope.pedidos.fecha_pedido;
		$scope.pedidos.valor_impuesto=$scope.pedidoDetalles.iva;
		$scope.pedidos.valor_descuento=0;
		$scope.pedidos.id_estado=101;
		$scope.pedidos.ind_estado_erp=0;
		$scope.pedidos.valor_facturado=0;
		$scope.pedidos.id_punto_envio=$scope.puntoEnvio.rowid
		$scope.pedidos.sincronizado='false';
		$scope.pedidos.estado_sincronizacion=0;
		
		CRUD.insert($scope.tablaDestino,$scope.pedidos)
	}
	$scope.validacionInsert=function(accion)
	{
		$('#btnGuardar').attr('disabled','disabled');
		if ($scope.pedidos.rowid_cliente_facturacion =='' || $scope.pedidos.rowid_cliente_facturacion==undefined) {
			Mensajes("Verifique Que Todos lo campos esten Llenos","error","")
			$('#btnGuardar').removeAttr('disabled');
			return
		}
		if ($scope.puntoEnvio.rowid==undefined) {
			Mensajes("Verifique Que Todos lo campos esten Llenos","error","")
			$('#btnGuardar').removeAttr('disabled');
			return
		}
		if ($scope.pedidos.rowid_cliente_despacho =='' || $scope.pedidos.rowid_cliente_despacho==undefined) {
			Mensajes("Verifique Que Todos lo campos esten Llenos","error","")
			$('#btnGuardar').removeAttr('disabled');
			return
		}
		if ($scope.pedidos.rowid_lista_precios =='' || $scope.pedidos.rowid_lista_precios==undefined) {
			Mensajes("Verifique Que Todos lo campos esten Llenos","error","")
			$('#btnGuardar').removeAttr('disabled');
			return
		}
		if ($scope.pedidos.fecha_solicitud =='' || $scope.pedidos.fecha_solicitud==undefined) {
			Mensajes("Verifique Que Todos lo campos esten Llenos","error","")
			$('#btnGuardar').removeAttr('disabled');
			return
		}
		if ($scope.pedidos.fecha_entrega =='' || $scope.pedidos.fecha_entrega==undefined) {
			Mensajes("Verifique Que Todos lo campos esten Llenos","error","")
			$('#btnGuardar').removeAttr('disabled');
			return
		}
		if($scope.itemsAgregadosPedido.length==0)
		{
			Mensajes('Debe Seleccionar al menos un item de la lista','error','');
			$('#btnGuardar').removeAttr('disabled');
			return
		}
		if (accion=='temporal') {
			$scope.finalizarPedido('temporal')
		}else
		{
			$scope.finalizarPedido('normal')
		}
		
	}
	$scope.ValidacionCabezera=function()
    {
    	$scope.CambiarTab('3','atras');
    	$scope.hasfocus=true;
    }
	$scope.modulo=MODULO_PEDIDO_NUEVO;
    angular.element('ul.tabs li').click(function () {

        var tab_id = angular.element(this).find('a').data('tab');
        angular.element('ul.tabs li').removeClass('active');
        angular.element('.tab-pane').removeClass('active');
        angular.element(this).toggleClass('active');
        angular.element("#" + tab_id).toggleClass('active');
    });
    $scope.CambiarTab = function (tab_actual, accion) {
        $scope.tab_id = null;

        if (tab_actual == '2' && accion == 'atras')
            $scope.tab_id = 'tab_1';
        else if (tab_actual == '2' && accion == 'siguiente')
            $scope.tab_id = 'tab_3';
        else if (tab_actual == '3' && accion == 'atras')
            $scope.tab_id = 'tab_2';

        angular.element('ul.tabs li').removeClass('active');
        angular.element('.tab-pane').removeClass('active');

        angular.element("ul.tabs").find("[data-tab='" + $scope.tab_id + "']").toggleClass('active');
        angular.element("#" + $scope.tab_id).toggleClass('active');
    };
    angular.element('#ui-id-1').mouseover(function (){
        angular.element('#ui-id-1').show();
    });
    if ( $scope.terceroDeTercero==undefined || !$scope.terceroDeTercero.includes('p') ) {
    	var hoy = new Date();
		var i=0;
		while (i<3) {
		  hoy.setTime(hoy.getTime()+24*60*60*1000); // añadimos 1 día
		  if ( hoy.getDay() != 0)
		    i++;  
		}
		var mes=parseInt(hoy.getMonth())+1;
		var fecha = mes+ '/' +hoy.getDate()+ '/' + hoy.getFullYear();
		//console.log(fecha);    
		
		hoy=new Date(fecha);
		hoy.setDate(hoy.getDate() + 1);
		document.getElementById("fecha_entrega").valueAsDate = hoy
		$scope.dateEntrega=	document.getElementById("fecha_entrega").valueAsDate;
		$scope.fechaentrega();
    }
}]);

app_angular.controller("PedidosController",['Conexion','$scope',function (Conexion,$scope) {
	$scope.validacion=false;
	$scope.pedidos = [];
	$scope.TABLA_BALANCE=JSON.parse(window.localStorage.getItem("TABLA_BALANCE"));
	$scope.pedidoSeleccionado=[];
	$scope.detallespedido=[];
    CRUD.select('select distinct pedidos.valor_impuesto,pedidos.fecha_solicitud,pedidos.sincronizado, pedidos.rowid as rowidpedido,terceros.razonsocial,sucursal.nombre_sucursal,punto_envio.nombre_punto_envio,pedidos.valor_total,detalle.rowid_pedido,count(detalle.rowid_pedido) cantidaddetalles,sum(detalle.cantidad) as cantidadproductos from  t_pedidos pedidos inner join erp_terceros_sucursales sucursal on sucursal.rowid=pedidos.rowid_cliente_facturacion  inner join erp_terceros terceros on terceros.rowid=sucursal.rowid_tercero  left  join t_pedidos_detalle detalle on detalle.rowid_pedido=pedidos.rowid left join erp_terceros_punto_envio punto_envio on punto_envio.rowid=pedidos.id_punto_envio group by  pedidos.fecha_solicitud,detalle.rowid_pedido,pedidos.rowid,terceros.razonsocial,sucursal.nombre_sucursal,punto_envio.nombre_punto_envio,pedidos.valor_total order by pedidos.rowid desc    LIMIT 50',
    	function(elem) {$scope.pedidos.push(elem)});
    CRUD.select("select count(*) as cantidad",function(elem){
    	if (elem.cantidad==0) {
    		$scope.validacion=true;
    	}
    })
    $scope.ConsultarDatos=function(pedido){
    	$scope.detallespedido=[];
		$scope.pedidoSeleccionado=pedido;
		$scope.contadores=[];
		$scope.tallasAgregar=[];
		$scope.contadores.cont1=0;
		$scope.contadores.cont2=0;
		$scope.contadores.cont3=0;
		$scope.contadores.cont4=0;
		$scope.contadores.cont5=0;
		CRUD.select("select distinct dt.rowid_item,dt.linea_descripcion,dt.rowid_pedido,item.item_referencia,dt.empaque  from t_pedidos_detalle dt inner join erp_items item on item.rowid=dt.rowid_item where dt.rowid_pedido ='"+pedido.rowidpedido+"'",function(elem){
			
			elem.tallas=[];
			elem.cantidadtotal=0;
			$scope.detallespedido.unshift(elem);
			$scope.contadores.cont1++;
			CRUD.select("select count(*) as c   from t_pedidos_detalle where rowid_item='"+elem.rowid_item+"'  and  rowid_pedido='"+elem.rowid_pedido+"' ",function(contadorItems){
				
				CRUD.select("select "+contadorItems.c+" as contador ,rowid_item_ext, item_ext1 as talla,cantidad,rowid_item from t_pedidos_detalle where rowid_item='"+elem.rowid_item+"'  and  rowid_pedido='"+elem.rowid_pedido+"' order by rowid_item_ext asc",function(tallas){
					$scope.contadores.cont4++;
					$scope.indicePush=true;
					$scope.indicemenor=true;
					for (var i =0;i<$scope.detallespedido.length;i++) {
						var a=$scope.detallespedido[i].rowid_item;
						if (a==tallas.rowid_item) {
							$scope.generico=[];
							$scope.generico.contador=0;
							$scope.generico.talla=0;
							$scope.generico.cantidad=0;
							$scope.generico.rowid_item=0;
							for (var f=1;f<9;f++) {
								$scope.generico.rowid_item_ext=f;
								if (f<tallas.rowid_item_ext && $scope.detallespedido[i].tallas.length+1!=tallas.rowid_item_ext && $scope.indicemenor) {
									$scope.detallespedido[i].tallas.push($scope.generico)
									
								}
								else if ( ($scope.indicePush && f==tallas.rowid_item_ext) || ($scope.detallespedido[i].tallas.length+1==tallas.rowid_item_ext  && $scope.indicePush))
								{
									$scope.detallespedido[i].tallas.push(tallas)
									$scope.detallespedido[i].cantidadtotal+=tallas.cantidad;
									$scope.contadores.cont5+=tallas.cantidad;
									$scope.indicemenor=false;
									$scope.indicePush=false;
								}
								else if ($scope.contadores.cont4>=tallas.contador) {
									
									if ($scope.detallespedido[i].tallas.length<8) {
										$scope.detallespedido[i].tallas.push($scope.generico)
									}
									if ($scope.detallespedido[i].tallas.length+1==9) {
										$scope.contadores.cont4=0;
									}
									
								}
								
							}
							
							
						}
						
					}
				})
			})
			
			
		})
			
    }
	$scope.Refrescar =function(){
    	CRUD.selectAll('t_pedidos',function(elem) {$scope.pedidos.push(elem)});
		$scope.Search = '';
		
	}
	
	angular.element('ul.tabs li').click(function () {

        var tab_id = angular.element(this).find('a').data('tab');
        angular.element('ul.tabs li').removeClass('active');
        angular.element('.tab-pane').removeClass('active');
        angular.element(this).toggleClass('active');
        angular.element("#" + tab_id).toggleClass('active');
    });
	
	$scope.abrirModal=function(pedido){
		$('#pedidoOpenModal').click();
		$scope.ConsultarDatos(pedido);
	}
	$scope.onretomarPedido=function(rowid_pedido){
	}
	
	$scope.CambiarTab = function (tab_actual, accion) {
        var tab_id = null;

        if (tab_actual == '1' && accion == 'siguiente')
            tab_id = 'tab_2';

        angular.element('ul.tabs li').removeClass('active');
        angular.element('.tab-pane').removeClass('active');

        angular.element("ul.tabs").find("[data-tab='" + tab_id + "']").toggleClass('active');
        angular.element("#" + tab_id).toggleClass('active');
    };
    angular.element('#ui-id-1').mouseover(function (){
        angular.element('#ui-id-1').show();
    });
	
}]);


app_angular.controller("PedidosTemporalesController",['Conexion','$scope',function (Conexion,$scope) {
	
	
}]);



