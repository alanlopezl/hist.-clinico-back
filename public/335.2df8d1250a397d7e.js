"use strict";(self.webpackChunkFrontEnd_Historial_Clinico=self.webpackChunkFrontEnd_Historial_Clinico||[]).push([[335],{9335:(Ne,x,a)=>{a.r(x),a.d(x,{PersonasModule:()=>Pe});var _=a(6814),h=a(3403),d=a(9347),e=a(5879),C=a(737),f=a(6405),P=a(1429),g=a(2296),m=a(5195),v=a(2032),p=a(9157),y=a(8525),L=a(3680),T=a(8034),c=a(6223);function M(n,s){1&n&&(e.TgZ(0,"mat-hint",22)(1,"strong",23),e._uU(2,"Campo requerido!"),e.qZA()())}function J(n,s){1&n&&(e.TgZ(0,"mat-hint",22)(1,"strong",23),e._uU(2,"Campo requerido!"),e.qZA()())}function D(n,s){1&n&&(e.TgZ(0,"mat-hint",22)(1,"strong",23),e._uU(2,"Campo requerido!"),e.qZA()())}function k(n,s){1&n&&(e.TgZ(0,"mat-hint",22)(1,"strong",23),e._uU(2,"Campo requerido!"),e.qZA()())}let O=(()=>{class n{constructor(t,i,o,r){this._service=t,this.dialogref=i,this._sweet=o,this._bitacora=r,this.fecha=new Date}ngOnInit(){}clear(){this._service.register.reset(),this._service.inicializarForm()}cerrarmodal(){this.dialogref.close()}get validateOpinion(){return this._service.register.controls}guardar(){if(this._service.register.valid)if(this._service.register.get("COD_PERSONA")?.value){let t=this._service.register.value;this._service.actualizar({id:t.COD_PERSONA,primern:t.PRIMER_NOMBRE,segudon:t.SEGUNDO_NOMBRE||"",primera:t.PRIMER_APELLIDO,segundoa:t.SEGUNDO_APELLIDO||"",dni:t.DNI,nacimiento:t.FEC_NACIMIENTO,estado:t.EST_CIVIL,sexo:t.SEXO}).subscribe(o=>{this._sweet.mensajeSimple("Actualizado correctamente","PERSONAS","success");let r={operacion:"ACTUALIZO",fecha:new Date,idusuario:localStorage.getItem("user"),tabla:"PERSONAS"};this._bitacora.crear(r).subscribe(),this._service.mostrar(),this.cerrarmodal()})}else{let t=this._service.register.value;this._service.crear({primern:t.PRIMER_NOMBRE,segudon:t.SEGUNDO_NOMBRE||"",primera:t.PRIMER_APELLIDO,segundoa:t.SEGUNDO_APELLIDO||"",dni:t.DNI||"",nacimiento:t.FEC_NACIMIENTO,estado:t.EST_CIVIL,sexo:t.SEXO}).subscribe(o=>{if(console.log(o),o.ok){this._sweet.mensajeSimple("Creado correctamente","PERSONAS","success");let r={operacion:"INSERTO",fecha:new Date,idusuario:localStorage.getItem("user"),tabla:"PERSONAS"};this._bitacora.crear(r).subscribe()}else this._sweet.mensajeSimple(o.msg,"PERSONAS","warning");this._service.mostrar()}),this.cerrarmodal()}}static#e=this.\u0275fac=function(i){return new(i||n)(e.Y36(C.C),e.Y36(d.so),e.Y36(f.T),e.Y36(P.D))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-personas-insert-update"]],decls:63,vars:10,consts:[[1,"p-3"],[1,"text-center"],[1,"texto"],[3,"formGroup"],[1,"row"],[1,"col-lg-6"],["appearance","outline",1,"example-full-width"],["matInput","","placeholder","Ingrese primer nombre","formControlName","PRIMER_NOMBRE","maxlength","15","onkeypress","return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122))","onkeyup","javascript:this.value=this.value.toUpperCase();","oncopy","return false","onpaste","return false"],["align","start",4,"ngIf"],["matInput","","placeholder","Ingrese segundo nombre","formControlName","SEGUNDO_NOMBRE","maxlength","15","onkeypress","return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122))","onkeyup","javascript:this.value=this.value.toUpperCase();","oncopy","return false","onpaste","return false"],["matInput","","placeholder","Ingrese primer apellido","formControlName","PRIMER_APELLIDO","maxlength","15","required","","onkeypress","return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122))","onkeyup","javascript:this.value=this.value.toUpperCase();","oncopy","return false","onpaste","return false"],["matInput","","placeholder","Ingrese segundo apellido","formControlName","SEGUNDO_APELLIDO","maxlength","15","onkeypress","return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122))","onkeyup","javascript:this.value=this.value.toUpperCase();","oncopy","return false","onpaste","return false"],["appearance","outline"],["matInput","","formControlName","FEC_NACIMIENTO","onkeydown","return false",3,"matDatepicker","max"],["matSuffix","",3,"for"],["picker",""],["formControlName","SEXO"],["value","MASCULINO"],["value","FEMENINO"],["matInput","","placeholder","Ingrese identidad","formControlName","DNI","maxlength","13","minlength","13","required","","onkeypress","return ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode >= 45 && event.charCode <= 45) )","oncopy","return false","onpaste","return false"],["mat-raised-button","","color","primary",1,"m-3","botonnegro",3,"click"],["mat-raised-button","","color","warn",3,"click"],["align","start"],[1,"text-danger"]],template:function(i,o){if(1&i&&(e.TgZ(0,"mat-card",0)(1,"mat-card-title")(2,"h4",1)(3,"strong",2),e._uU(4),e.qZA()()(),e.TgZ(5,"mat-card-subtitle")(6,"form",3)(7,"div",4)(8,"div",5)(9,"mat-form-field",6)(10,"mat-label"),e._uU(11,"Primer Nombre"),e.qZA(),e._UZ(12,"input",7),e.YNc(13,M,3,0,"mat-hint",8),e.qZA()(),e.TgZ(14,"div",5)(15,"mat-form-field",6)(16,"mat-label"),e._uU(17,"Segundo Nombre"),e.qZA(),e._UZ(18,"input",9),e.qZA()(),e.TgZ(19,"div",5)(20,"mat-form-field",6)(21,"mat-label"),e._uU(22,"Primer Apellido"),e.qZA(),e._UZ(23,"input",10),e.YNc(24,J,3,0,"mat-hint",8),e.qZA()(),e.TgZ(25,"div",5)(26,"mat-form-field",6)(27,"mat-label"),e._uU(28,"Segundo Apellido"),e.qZA(),e._UZ(29,"input",11),e.qZA()()(),e.TgZ(30,"div",4)(31,"div",5)(32,"mat-form-field",12)(33,"mat-label"),e._uU(34,"Fecha Nacimiento"),e.qZA(),e._UZ(35,"input",13),e.TgZ(36,"mat-hint"),e._uU(37,"DD/MM/YYYY"),e.qZA(),e._UZ(38,"mat-datepicker-toggle",14)(39,"mat-datepicker",null,15),e.qZA()(),e.TgZ(41,"div",5)(42,"mat-form-field",12)(43,"mat-label"),e._uU(44,"Sexo"),e.qZA(),e.TgZ(45,"mat-select",16)(46,"mat-option",17),e._uU(47,"Masculino"),e.qZA(),e.TgZ(48,"mat-option",18),e._uU(49,"Femenino"),e.qZA()(),e.YNc(50,D,3,0,"mat-hint",8),e.qZA()()(),e.TgZ(51,"div",4)(52,"div",5)(53,"mat-form-field",6)(54,"mat-label"),e._uU(55,"Identidad"),e.qZA(),e._UZ(56,"input",19),e.YNc(57,k,3,0,"mat-hint",8),e.qZA()()()()(),e.TgZ(58,"mat-card-actions")(59,"button",20),e.NdJ("click",function(){return o.guardar()}),e._uU(60),e.qZA(),e.TgZ(61,"button",21),e.NdJ("click",function(){return o.cerrarmodal()}),e._uU(62,"Cerrar"),e.qZA()()()),2&i){const r=e.MAs(40);let l,u;e.xp6(4),e.Oqu(null!=(l=o._service.register.get("COD_PERSONA"))&&l.value?"ACTUALIZAR":"CREAR"),e.xp6(2),e.Q6J("formGroup",o._service.register),e.xp6(7),e.Q6J("ngIf",o.validateOpinion.PRIMER_NOMBRE.hasError("required")),e.xp6(11),e.Q6J("ngIf",o.validateOpinion.PRIMER_APELLIDO.hasError("required")),e.xp6(11),e.Q6J("matDatepicker",r)("max",o.fecha),e.xp6(3),e.Q6J("for",r),e.xp6(12),e.Q6J("ngIf",o.validateOpinion.SEXO.hasError("required")),e.xp6(7),e.Q6J("ngIf",o.validateOpinion.DNI.hasError("required")),e.xp6(3),e.Oqu(null!=(u=o._service.register.get("COD_PERSONA"))&&u.value?"Actualizar":"Crear")}},dependencies:[_.O5,g.lW,m.a8,m.hq,m.$j,m.n5,v.Nt,p.KE,p.hX,p.bx,p.R9,y.gD,L.ey,T.Mq,T.hl,T.nW,c._Y,c.Fj,c.JJ,c.JL,c.Q7,c.wO,c.nD,c.sg,c.u],styles:["mat-form-field[_ngcontent-%COMP%]{width:100%}"]})}return n})();var N=a(3808),Z=a(1486),A=a(2322),b=a(3365),S=a(617),E=a(5940);function Y(n,s){1&n&&(e.TgZ(0,"div",10),e._UZ(1,"mat-spinner"),e.qZA())}function F(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"button",19),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2);return e.KtG(o.crear())}),e.TgZ(1,"mat-icon"),e._uU(2," account_circle "),e.qZA(),e._uU(3," Agregar "),e.qZA()}}function $(n,s){1&n&&(e.TgZ(0,"div")(1,"div",20),e._uU(2," No existen roles para mostrar "),e.qZA()())}function j(n,s){1&n&&(e.TgZ(0,"th",32),e._uU(1,"Opciones"),e.qZA())}function Q(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"button",40),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2).$implicit,r=e.oxw(4);return e.KtG(r.editar(o))}),e.TgZ(1,"mat-icon"),e._uU(2,"create"),e.qZA()()}}function z(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"button",41),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2).$implicit,r=e.oxw(4);return e.KtG(r.eliminar(o.COD_PERSONA))}),e.TgZ(1,"mat-icon"),e._uU(2,"delete_forever"),e.qZA()()}}function G(n,s){if(1&n&&(e.TgZ(0,"td",36)(1,"div",37),e.YNc(2,Q,3,0,"button",38),e.YNc(3,z,3,0,"button",39),e.qZA()()),2&n){const t=e.oxw(5);e.xp6(2),e.Q6J("ngIf","SI"==(null==t.permisos?null:t.permisos.ACTUALIZAR)),e.xp6(1),e.Q6J("ngIf","SI"==(null==t.permisos?null:t.permisos.ELIMINAR))}}function H(n,s){if(1&n&&(e.TgZ(0,"tr",33)(1,"td",34),e._uU(2),e.qZA(),e.TgZ(3,"td",34),e._uU(4),e.qZA(),e.TgZ(5,"td",34),e._uU(6),e.qZA(),e.TgZ(7,"td",34),e._uU(8),e.qZA(),e.TgZ(9,"td",34),e._uU(10),e.qZA(),e.YNc(11,G,4,2,"td",35),e.qZA()),2&n){const t=s.$implicit,i=s.index,o=e.oxw(4);e.uIk("data-index",i),e.xp6(2),e.hij(" ",t.COD_PERSONA,""),e.xp6(2),e.AsE(" ",t.PRIMER_NOMBRE," ",t.PRIMER_APELLIDO,""),e.xp6(2),e.hij(" ",t.DNI,""),e.xp6(2),e.hij(" ",t.FEC_NACIMIENTO,""),e.xp6(2),e.hij(" ",t.SEXO,""),e.xp6(1),e.Q6J("ngIf","SI"==(null==o.permisos?null:o.permisos.ACTUALIZAR)||"SI"==(null==o.permisos?null:o.permisos.ELIMINAR))}}const K=function(n){return[25,50,100,n]};function B(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",23)(1,"table",24)(2,"thead",25)(3,"tr",26)(4,"th",27),e._uU(5,"Id"),e.qZA(),e.TgZ(6,"th",27),e._uU(7,"Nombre"),e.qZA(),e.TgZ(8,"th",27),e._uU(9,"DNI"),e.qZA(),e.TgZ(10,"th",27),e._uU(11,"Fecha Nacimiento"),e.qZA(),e.TgZ(12,"th",27),e._uU(13,"Sexo"),e.qZA(),e.YNc(14,j,2,0,"th",28),e.qZA()(),e.TgZ(15,"tbody",29),e.YNc(16,H,12,8,"tr",30),e.ALo(17,"slice"),e.ALo(18,"async"),e.qZA()(),e.TgZ(19,"mat-paginator",31),e.NdJ("page",function(o){e.CHM(t);const r=e.oxw(3);return e.KtG(r.cambioPagina(o))}),e.ALo(20,"async"),e.ALo(21,"async"),e.qZA()()}if(2&n){const t=e.oxw(3);let i,o;e.xp6(14),e.Q6J("ngIf","SI"==(null==t.permisos?null:t.permisos.ACTUALIZAR)||"SI"==(null==t.permisos?null:t.permisos.ELIMINAR)),e.xp6(2),e.Q6J("ngForOf",e.Dn7(17,5,e.lcZ(18,9,t._service.response$),t.d,t.h)),e.xp6(3),e.Q6J("length",null==(i=e.lcZ(20,11,t._service.response$))?null:i.length)("pageSize",t.pageSize)("pageSizeOptions",e.VKq(15,K,null==(o=e.lcZ(21,13,t._service.response$))?null:o.length))}}function X(n,s){if(1&n&&(e.TgZ(0,"div",21),e.YNc(1,B,22,17,"div",22),e.ALo(2,"async"),e.qZA()),2&n){const t=e.oxw(2);e.xp6(1),e.Q6J("ngIf",0!=e.lcZ(2,1,t._service.response$).length)}}function W(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"section")(1,"div",11)(2,"div",12),e.YNc(3,F,4,0,"button",13),e.qZA(),e.TgZ(4,"div",14)(5,"mat-form-field",15)(6,"mat-label"),e._uU(7,"Busqueda"),e.qZA(),e.TgZ(8,"input",16),e.NdJ("ngModelChange",function(o){e.CHM(t);const r=e.oxw();return e.KtG(r.buscar=o)})("change",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.busqueda())}),e.qZA(),e.TgZ(9,"mat-icon",17),e._uU(10,"search"),e.qZA()()()(),e.YNc(11,$,3,0,"div",9),e.ALo(12,"async"),e.ALo(13,"async"),e.YNc(14,X,3,3,"div",18),e.ALo(15,"async"),e.ALo(16,"async"),e.qZA()}if(2&n){const t=e.oxw();e.xp6(3),e.Q6J("ngIf","SI"==(null==t.permisos?null:t.permisos.INSERTAR)),e.xp6(5),e.Q6J("ngModel",t.buscar),e.xp6(3),e.Q6J("ngIf",0==e.lcZ(12,4,t._service.response$).length&&!e.lcZ(13,6,t._service.responseCargando$)),e.xp6(3),e.Q6J("ngIf",!e.lcZ(15,8,t._service.responseCargando$)&&0!=e.lcZ(16,10,t._service.response$).length)}}const V=function(){return["/dashboard"]};let ee=(()=>{class n{busqueda(){this._service.mostrar(this.buscar)}constructor(t,i,o,r,l,u){this._service=t,this._dialog=i,this._bitacora=o,this._sweet=r,this._router=l,this.paginator=u,this.pageSize=25,this.pageSizeOptions=[25,50,100],this.d=0,this.h=25,this.buscar="",this.campo=["PRIMER_NOMBRE","DNI","SEXO"],this.reporte=!1,this.data=[],this.item=[],this.i=0,this.permisos=[],u.itemsPerPageLabel="Cantidad por p\xe1gina",this._service.mostrar(),this._service.mostrarpermiso(localStorage.getItem("rol"),9),this._service.responsepermiso$.subscribe(Oe=>{this.permisos=Oe[0]})}excel(){let t=[];this._service.mostrar(this.buscar),this._service.response$.subscribe(r=>{t=r});let i=Z.P6.book_new(),o=Z.P6.json_to_sheet(t);i.SheetNames.push("Hoja 1"),i.Sheets["Hoja 1"]=o,Z.Fv(i,"Personas.xlsx",{})}ngOnInit(){}ngOnDestroy(){}cambioPagina(t){this.d=t.pageIndex*t.pageSize,this.h=this.d+t.pageSize}crear(){const t=new d.vA;t.disableClose=!0,t.autoFocus=!0,t.width="20%",this._dialog.open(O),this._service.inicializarForm()}editar(t){const i=new d.vA;i.disableClose=!0,i.autoFocus=!0,i.width="25%",this._dialog.open(O),this._service.popForm(t)}eliminar(t){this._sweet.mensajeConConfirmacion("Eliminar","\xbfDesea eliminar el registro?","warning").then(i=>{i&&this._service.eliminar(t).subscribe(o=>{if(this._service.mostrar(this.buscar),o.ok){let r={operacion:"ELIMINO",fecha:new Date,idusuario:localStorage.getItem("user"),tabla:"PERSONAS"};this._bitacora.crear(r).subscribe(),this._sweet.mensajeSimple("Eliminado correctamente","PERSONAS","success")}else this._sweet.mensajeSimple("Ocurrio un error","PERSONAS","error")})})}impo(){let o=`\n  <div id="otra">\n  <img src="../../../assets/logo.jpg" alt="">\n  <div class="parraf">\n  <h5>Agrocomercial "Libertad"</h5>\n  <h5>Listado de Personas</h5>\n  <h6>${(new Date).toLocaleString()}</h6>\n  </div>\n  </div><br>`;N({printable:"reporte2",type:"html",header:o,css:"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",style:"@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }",scanStyles:!1,documentTitle:"Personas",font_size:"10pt",ignoreElements:["d"]});let r={operacion:"DESCARGO PDF",fecha:new Date,idusuario:localStorage.getItem("user"),tabla:"PERSONAS"};this._bitacora.crear(r).subscribe(l=>l)}static#e=this.\u0275fac=function(i){return new(i||n)(e.Y36(C.C),e.Y36(d.uw),e.Y36(A.U),e.Y36(f.T),e.Y36(h.F0),e.Y36(b.ye))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-personas"]],decls:19,vars:8,consts:[[1,"col-lg-6"],["aria-label","breadcrumb"],[1,"text"],[1,"breadcrumb"],[1,"breadcrumb-item"],[3,"routerLink"],[1,"breadcrumb-item","active"],["routerLink","/legalizacion/ver-registro"],["style","display: flex; align-items: center; justify-content: center;",4,"ngIf"],[4,"ngIf"],[2,"display","flex","align-items","center","justify-content","center"],[1,"row"],[1,"col-md-6"],["mat-raised-button","","color","accent","class","m-1 botonnegro",3,"click",4,"ngIf"],[1,"col-md-6","d-flex","justify-content-end"],["appearance","outline"],["matInput","","placeholder","Buscar",3,"ngModel","ngModelChange","change"],["matSuffix",""],["class","mt-4",4,"ngIf"],["mat-raised-button","","color","accent",1,"m-1","botonnegro",3,"click"],["role","alert",1,"alert","alert-warning","text-center"],[1,"mt-4"],["id","reporte","class","table-responsive",4,"ngIf"],["id","reporte",1,"table-responsive"],["role","table",1,"table","bordeTabla","tablep"],[1,"theadp"],[1,"botonnegro","text-center"],["scope","col","role","columnheader",1,"thp"],["id","d","class","thp","scope","col","role","columnheader",4,"ngIf"],["role","rowgroup",1,"tbodyp"],["class","text-center trp","role","row",4,"ngFor","ngForOf"],["id","d",3,"length","pageSize","pageSizeOptions","page"],["id","d","scope","col","role","columnheader",1,"thp"],["role","row",1,"text-center","trp"],["role","cell","data-title","Nombre",1,"tdp"],["id","d","role","cell","data-title","Opciones","class","tdp",4,"ngIf"],["id","d","role","cell","data-title","Opciones",1,"tdp"],[1,"text-center"],["class","botonnegro","mat-mini-fab","",3,"click",4,"ngIf"],["mat-mini-fab","","color","warn",3,"click",4,"ngIf"],["mat-mini-fab","",1,"botonnegro",3,"click"],["mat-mini-fab","","color","warn",3,"click"]],template:function(i,o){1&i&&(e.TgZ(0,"div")(1,"div",0)(2,"nav",1)(3,"h1")(4,"strong",2),e._uU(5,"Personas"),e.qZA()(),e.TgZ(6,"ol",3)(7,"li",4)(8,"a",5),e._uU(9,"Inicio"),e.qZA()(),e.TgZ(10,"li",6)(11,"a",7),e._uU(12,"Personas"),e.qZA()()()()(),e.TgZ(13,"mat-card")(14,"mat-card-content"),e.YNc(15,Y,2,0,"div",8),e.ALo(16,"async"),e.YNc(17,W,17,12,"section",9),e.ALo(18,"async"),e.qZA()()()),2&i&&(e.xp6(8),e.Q6J("routerLink",e.DdM(7,V)),e.xp6(7),e.Q6J("ngIf",e.lcZ(16,3,o._service.responseCargando$)),e.xp6(2),e.Q6J("ngIf",!e.lcZ(18,5,o._service.responseCargando$)))},dependencies:[_.sg,_.O5,h.rH,S.Hw,g.lW,g.nh,m.a8,m.dn,v.Nt,p.KE,p.hX,p.R9,E.Ou,b.NW,c.Fj,c.JJ,c.On,_.Ov,_.OU]})}return n})();var I=a(5619),U=a(9397),q=a(7398),te=a(7337),ne=a(9862);let w=(()=>{class n{constructor(t,i){this._http=t,this._globals=i,this.tipo=new I.X([]),this.response$=this.tipo.asObservable(),this.permiso=new I.X([]),this.responsepermiso$=this.permiso.asObservable(),this.Cargando$=new I.X(!1),this.responseCargando$=this.Cargando$.asObservable(),this.url=`${te.N.url}tipo-persona`,this.register=new c.cw({ID_TIPO_PERSONA:new c.NI(null),TIPO:new c.NI("",c.kI.required)})}inicializarForm(){this.register.setValue({ID_TIPO_PERSONA:null,TIPO:""})}popForm(t){this.register.setValue(t)}mostrar(t=""){return this.Cargando$.next(!0),this._globals.obtener("tipo-persona?busqueda="+t).pipe((0,U.b)(o=>{this.Cargando$.next(!1),this.tipo.next(o)})).subscribe()}mostrarpermiso(t,i){return this._globals.obtener(`permisossistemaid/${t}/${i}`).pipe((0,U.b)(r=>{this.permiso.next(r)})).subscribe()}crear(t){return this._http.post(this.url,t).pipe((0,q.U)(i=>i))}actualizar(t){return this._http.put(this.url,t).pipe((0,q.U)(i=>i))}eliminar(t){return this._http.delete(this.url+"/"+t)}static#e=this.\u0275fac=function(i){return new(i||n)(e.LFG(ne.eN),e.LFG(A.U))};static#t=this.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function oe(n,s){1&n&&(e.TgZ(0,"mat-hint",8)(1,"strong",9),e._uU(2,"Campo requerido!"),e.qZA()())}let R=(()=>{class n{constructor(t,i,o,r){this._service=t,this.dialogref=i,this._sweet=o,this._bitacora=r}ngOnInit(){}clear(){this._service.register.reset(),this._service.inicializarForm()}cerrarmodal(){this.dialogref.close()}get validateOpinion(){return this._service.register.controls}guardar(){if(this._service.register.valid)if(this._service.register.get("ID_TIPO_PERSONA")?.value){let t=this._service.register.value;this._service.actualizar({id:t.ID_TIPO_PERSONA,tipo:t.TIPO}).subscribe(o=>{if(o.ok){this._sweet.mensajeSimple("Actualizado correctamente","Tipo persona","success");let r={operacion:"ACTUALIZO",fecha:new Date,idusuario:localStorage.getItem("user"),tabla:"TIPO PERSONA"};this._bitacora.crear(r).subscribe()}else this._sweet.mensajeSimple(o.msg,"TIPO PERSONA","warning");this._service.mostrar(),this.cerrarmodal()})}else this._service.crear({tipo:this._service.register.value.TIPO}).subscribe(o=>{if(o.ok){this._sweet.mensajeSimple("Creado correctamente","Tipo persona","success");let r={operacion:"INSERTO",fecha:new Date,idusuario:localStorage.getItem("user"),tabla:"TIPO PERSONA"};this._bitacora.crear(r).subscribe()}else this._sweet.mensajeSimple(o.msg,"TIPO PERSONA","warning");this._service.mostrar()}),this.cerrarmodal()}static#e=this.\u0275fac=function(i){return new(i||n)(e.Y36(w),e.Y36(d.so),e.Y36(f.T),e.Y36(P.D))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-tipo-persona-insert-update"]],decls:18,vars:5,consts:[[1,"p-4"],[1,"text-center","texto"],[3,"formGroup"],["appearance","outline",1,"example-full-width"],["matInput","","placeholder","Ingrese tipo persona","formControlName","TIPO","onkeypress","return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122))","onkeyup","javascript:this.value=this.value.toUpperCase();","oncopy","return false","onpaste","return false","minlength","3","maxlength","20"],["align","start",4,"ngIf"],["mat-raised-button","","color","primary",1,"m-1","botonnegro",3,"disabled","click"],["mat-raised-button","","color","warn",3,"click"],["align","start"],[1,"text-danger"]],template:function(i,o){if(1&i&&(e.TgZ(0,"mat-card",0)(1,"mat-card-title")(2,"h4",1)(3,"strong"),e._uU(4),e.qZA()()(),e.TgZ(5,"mat-card-subtitle")(6,"form",2)(7,"mat-form-field",3)(8,"mat-label"),e._uU(9,"Tipo Persona"),e.qZA(),e._UZ(10,"input",4),e.YNc(11,oe,3,0,"mat-hint",5),e.qZA(),e._UZ(12,"br"),e.qZA()(),e.TgZ(13,"mat-card-actions")(14,"button",6),e.NdJ("click",function(){return o.guardar()}),e._uU(15),e.qZA(),e.TgZ(16,"button",7),e.NdJ("click",function(){return o.cerrarmodal()}),e._uU(17,"Cerrar"),e.qZA()()()),2&i){let r,l;e.xp6(4),e.Oqu(null!=(r=o._service.register.get("ID_ROL"))&&r.value?"ACTUALIZAR":"CREAR"),e.xp6(2),e.Q6J("formGroup",o._service.register),e.xp6(5),e.Q6J("ngIf",o.validateOpinion.TIPO.hasError("required")),e.xp6(3),e.Q6J("disabled",!o._service.register),e.xp6(1),e.Oqu(null!=(l=o._service.register.get("ID_TIPO_PERSONA"))&&l.value?"Actualizar":"Crear")}},dependencies:[_.O5,g.lW,m.a8,m.hq,m.$j,m.n5,v.Nt,p.KE,p.hX,p.bx,c._Y,c.Fj,c.JJ,c.JL,c.wO,c.nD,c.sg,c.u]})}return n})();function ie(n,s){1&n&&(e.TgZ(0,"div",17),e._UZ(1,"mat-spinner"),e.qZA())}function re(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"button",26),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2);return e.KtG(o.crear())}),e.TgZ(1,"mat-icon"),e._uU(2," account_circle "),e.qZA(),e._uU(3," Agregar "),e.qZA()}}function se(n,s){1&n&&(e.TgZ(0,"div",27)(1,"div",28),e._uU(2," No existen roles para mostrar "),e.qZA()())}function ae(n,s){1&n&&(e.TgZ(0,"th",39),e._uU(1,"Opciones"),e.qZA())}function ce(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"button",47),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2).$implicit,r=e.oxw(4);return e.KtG(r.editar(o))}),e.TgZ(1,"mat-icon"),e._uU(2,"create"),e.qZA()()}}function le(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"button",48),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2).$implicit,r=e.oxw(4);return e.KtG(r.eliminar(o.ID_TIPO_PERSONA))}),e.TgZ(1,"mat-icon"),e._uU(2,"delete_forever"),e.qZA()()}}function pe(n,s){if(1&n&&(e.TgZ(0,"td",43)(1,"div",44),e.YNc(2,ce,3,0,"button",45),e.YNc(3,le,3,0,"button",46),e.qZA()()),2&n){const t=e.oxw(5);e.xp6(2),e.Q6J("ngIf","SI"==(null==t.permisos?null:t.permisos.ACTUALIZAR)),e.xp6(1),e.Q6J("ngIf","SI"==(null==t.permisos?null:t.permisos.ELIMINAR))}}function _e(n,s){if(1&n&&(e.TgZ(0,"tr",40)(1,"td",41),e._uU(2),e.qZA(),e.TgZ(3,"td",41),e._uU(4),e.ALo(5,"uppercase"),e.qZA(),e.YNc(6,pe,4,2,"td",42),e.qZA()),2&n){const t=s.$implicit,i=s.index,o=e.oxw(4);e.uIk("data-index",i)("data-index",i),e.xp6(2),e.hij(" ",i+1,""),e.xp6(2),e.hij(" ",e.lcZ(5,5,t.TIPO),""),e.xp6(2),e.Q6J("ngIf","SI"==(null==o.permisos?null:o.permisos.ACTUALIZAR)||"SI"==(null==o.permisos?null:o.permisos.ELIMINAR))}}const me=function(n){return[25,50,100,n]};function de(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"div",30)(1,"table",31)(2,"thead",32)(3,"tr",33)(4,"th",34),e._uU(5,"Id"),e.qZA(),e.TgZ(6,"th",34),e._uU(7,"Tipo Persona"),e.qZA(),e.YNc(8,ae,2,0,"th",35),e.qZA()(),e.TgZ(9,"tbody",36),e.YNc(10,_e,7,7,"tr",37),e.ALo(11,"slice"),e.ALo(12,"async"),e.qZA()(),e.TgZ(13,"mat-paginator",38),e.NdJ("page",function(o){e.CHM(t);const r=e.oxw(3);return e.KtG(r.cambioPagina(o))}),e.ALo(14,"async"),e.ALo(15,"async"),e.qZA()()}if(2&n){const t=e.oxw(3);let i,o;e.xp6(8),e.Q6J("ngIf","SI"==(null==t.permisos?null:t.permisos.ACTUALIZAR)||"SI"==(null==t.permisos?null:t.permisos.ELIMINAR)),e.xp6(2),e.Q6J("ngForOf",e.Dn7(11,5,e.lcZ(12,9,t._service.response$),t.d,t.h)),e.xp6(3),e.Q6J("length",null==(i=e.lcZ(14,11,t._service.response$))?null:i.length)("pageSizeOptions",e.VKq(15,me,null==(o=e.lcZ(15,13,t._service.response$))?null:o.length))("pageSize",t.pageSize)}}function ue(n,s){if(1&n&&(e.TgZ(0,"div",27),e.YNc(1,de,16,17,"div",29),e.ALo(2,"async"),e.qZA()),2&n){const t=e.oxw(2);e.xp6(1),e.Q6J("ngIf",0!=e.lcZ(2,1,t._service.response$).length)}}function ge(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"section")(1,"div",18)(2,"div",19),e.YNc(3,re,4,0,"button",20),e.qZA(),e.TgZ(4,"div",21)(5,"mat-form-field",22)(6,"mat-label"),e._uU(7,"Busqueda"),e.qZA(),e.TgZ(8,"input",23),e.NdJ("ngModelChange",function(o){e.CHM(t);const r=e.oxw();return e.KtG(r.buscar=o)})("change",function(){e.CHM(t);const o=e.oxw();return e.KtG(o.busqueda())}),e.qZA(),e.TgZ(9,"mat-icon",24),e._uU(10,"search"),e.qZA()()()(),e.YNc(11,se,3,0,"div",25),e.ALo(12,"async"),e.ALo(13,"async"),e.YNc(14,ue,3,3,"div",25),e.ALo(15,"async"),e.ALo(16,"async"),e.qZA()}if(2&n){const t=e.oxw();e.xp6(3),e.Q6J("ngIf","SI"==(null==t.permisos?null:t.permisos.INSERTAR)),e.xp6(5),e.Q6J("ngModel",t.buscar),e.xp6(3),e.Q6J("ngIf",0==e.lcZ(12,4,t._service.response$).length&&!e.lcZ(13,6,t._service.responseCargando$)),e.xp6(3),e.Q6J("ngIf",!e.lcZ(15,8,t._service.responseCargando$)&&0!=e.lcZ(16,10,t._service.response$).length)}}function he(n,s){1&n&&(e.TgZ(0,"th",39),e._uU(1,"Opciones"),e.qZA())}function fe(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"button",52),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2).$implicit,r=e.oxw(2);return e.KtG(r.editar(o))}),e.TgZ(1,"mat-icon"),e._uU(2,"create"),e.qZA()()}}function ve(n,s){if(1&n){const t=e.EpF();e.TgZ(0,"button",48),e.NdJ("click",function(){e.CHM(t);const o=e.oxw(2).$implicit,r=e.oxw(2);return e.KtG(r.eliminar(o.ID_TIPO_PERSONA))}),e.TgZ(1,"mat-icon"),e._uU(2,"delete_forever"),e.qZA()()}}function be(n,s){if(1&n&&(e.TgZ(0,"td",43)(1,"div",44),e.YNc(2,fe,3,0,"button",51),e.YNc(3,ve,3,0,"button",46),e.qZA()()),2&n){const t=e.oxw(3);e.xp6(2),e.Q6J("ngIf","SI"==(null==t.permisos?null:t.permisos.ACTUALIZAR)),e.xp6(1),e.Q6J("ngIf","SI"==(null==t.permisos?null:t.permisos.ELIMINAR))}}function Te(n,s){if(1&n&&(e.TgZ(0,"tr",40)(1,"td",41),e._uU(2),e.qZA(),e.TgZ(3,"td",41),e._uU(4),e.ALo(5,"uppercase"),e.qZA(),e.YNc(6,be,4,2,"td",42),e.qZA()),2&n){const t=s.$implicit,i=s.index,o=e.oxw(2);e.uIk("data-index",i)("data-index",i),e.xp6(2),e.hij(" ",i+1,""),e.xp6(2),e.hij(" ",e.lcZ(5,5,t.TIPO),""),e.xp6(2),e.Q6J("ngIf","SI"==(null==o.permisos?null:o.permisos.ACTUALIZAR)||"SI"==(null==o.permisos?null:o.permisos.ELIMINAR))}}function Ze(n,s){if(1&n&&(e.TgZ(0,"div",49)(1,"table",31)(2,"thead",32)(3,"tr",50)(4,"th",34),e._uU(5,"Id"),e.qZA(),e.TgZ(6,"th",34),e._uU(7,"Tipo"),e.qZA(),e.YNc(8,he,2,0,"th",35),e.qZA()(),e.TgZ(9,"tbody",36),e.YNc(10,Te,7,7,"tr",37),e.ALo(11,"async"),e.qZA()()()),2&n){const t=e.oxw();e.xp6(8),e.Q6J("ngIf","SI"==(null==t.permisos?null:t.permisos.ACTUALIZAR)||"SI"==(null==t.permisos?null:t.permisos.ELIMINAR)),e.xp6(2),e.Q6J("ngForOf",e.lcZ(11,2,t._service.response$))}}const Ae=function(){return["/dashboard"]},Ie=[{path:"personas",component:ee},{path:"tipo-persona",component:(()=>{class n{constructor(t,i,o,r,l){this._service=t,this._dialog=i,this._bitacora=o,this._sweet=r,this.paginator=l,this.pageSize=25,this.pageSizeOptions=[25,50,100],this.d=0,this.h=25,this.buscar="",this.campo=["TIPO"],this.reporte=!1,this.data=[],this.item=[],this.permisos=[],l.itemsPerPageLabel="Cantidad por p\xe1gina",this._service.mostrar(this.buscar),this._service.mostrarpermiso(localStorage.getItem("rol"),14),this._service.responsepermiso$.subscribe(u=>{this.permisos=u[0]})}ngOnInit(){}busqueda(){this._service.mostrar(this.buscar)}ngOnDestroy(){}cambioPagina(t){this.d=t.pageIndex*t.pageSize,this.h=this.d+t.pageSize}crear(){const t=new d.vA;t.disableClose=!0,t.autoFocus=!0,t.width="20%",this._dialog.open(R),this._service.inicializarForm()}editar(t){const i=new d.vA;i.disableClose=!0,i.autoFocus=!0,i.width="25%",this._dialog.open(R),this._service.popForm(t)}eliminar(t){this._sweet.mensajeConConfirmacion("Eliminar","\xbfDesea eliminar el registro?","warning").then(i=>{console.log(i),i&&this._service.eliminar(t).subscribe(o=>{if(this._service.mostrar(this.buscar),o.ok){let r={operacion:"ELIMINO",fecha:new Date,idusuario:localStorage.getItem("user"),tabla:"TIPO PERSONA"};this._bitacora.crear(r).subscribe(),this._sweet.mensajeSimple("Eliminado correctamente","TIPO PERSONA","success")}else console.log(o),this._sweet.mensajeSimple("No se puede eliminar","TIPO PERSONA","error")})})}impo(){let o=`\n  <div id="otra">\n  <img src="../../../assets/logo.jpg" alt="">\n  <div class="parraf">\n  <h5></h5>\n  <h5>Listado de Tipo Persona</h5>\n  <h6>${(new Date).toLocaleString()}</h6>\n  </div>\n  </div><br>`;N({printable:"reporte2",type:"html",header:o,css:"https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",style:"@page {   margin-left: 10%; } #otra {display: block  } #otra img { max-width: 140px;} .parraf { width: 100%; padding: 0px; text-align: center;  max-height: 80px, margin-left: 90%; }",scanStyles:!1,documentTitle:"Roles",font_size:"10pt",ignoreElements:["d"]});let r={operacion:"DESCARGO PDF",fecha:new Date,idusuario:localStorage.getItem("user"),tabla:"TIPO PERSONA"};this._bitacora.crear(r).subscribe(l=>l)}static#e=this.\u0275fac=function(i){return new(i||n)(e.Y36(w),e.Y36(d.uw),e.Y36(A.U),e.Y36(f.T),e.Y36(b.ye))};static#t=this.\u0275cmp=e.Xpm({type:n,selectors:[["app-tipo-persona"]],decls:28,vars:11,consts:[[1,"col-lg-6"],["aria-label","breadcrumb"],[1,"texto"],[1,"breadcrumb"],[1,"breadcrumb-item"],[3,"routerLink"],[1,"breadcrumb-item","active"],["routerLink","/roles"],["style","display: flex; align-items: center; justify-content: center;",4,"ngIf"],[4,"ngIf"],["tabindex","-1",1,"modal"],[1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],["id","reporte2","class","table-responsive",4,"ngIf"],[2,"display","flex","align-items","center","justify-content","center"],[1,"row"],[1,"col-md-6"],["mat-raised-button","","color","accent","class","m-1 botonnegro",3,"click",4,"ngIf"],[1,"col-md-6","d-flex","justify-content-end"],["appearance","outline"],["matInput","","placeholder","Buscar",3,"ngModel","ngModelChange","change"],["matSuffix",""],["class","mt-4",4,"ngIf"],["mat-raised-button","","color","accent",1,"m-1","botonnegro",3,"click"],[1,"mt-4"],["role","alert",1,"alert","alert-warning","text-center"],["id","reporte","class","table-responsive",4,"ngIf"],["id","reporte",1,"table-responsive"],["role","table",1,"table","bordeTabla","tablep"],[1,"theadp"],[1,"botonnegro","text-center"],["scope","col","role","columnheader",1,"thp"],["id","d","class","thp","scope","col","role","columnheader",4,"ngIf"],["role","rowgroup",1,"tbodyp"],["class","text-center trp","role","row",4,"ngFor","ngForOf"],["id","d",3,"length","pageSizeOptions","pageSize","page"],["id","d","scope","col","role","columnheader",1,"thp"],["role","row",1,"text-center","trp"],["role","cell","data-title","Nombre",1,"tdp"],["id","d","role","cell","data-title","Opciones","class","tdp",4,"ngIf"],["id","d","role","cell","data-title","Opciones",1,"tdp"],[1,"text-center"],["mat-mini-fab","","class","botonnegro",3,"click",4,"ngIf"],["mat-mini-fab","","color","warn",3,"click",4,"ngIf"],["mat-mini-fab","",1,"botonnegro",3,"click"],["mat-mini-fab","","color","warn",3,"click"],["id","reporte2",1,"table-responsive"],[1,"tablebg","text-center"],["mat-mini-fab","","class","buttonSecundary",3,"click",4,"ngIf"],["mat-mini-fab","",1,"buttonSecundary",3,"click"]],template:function(i,o){1&i&&(e.TgZ(0,"div")(1,"div",0)(2,"nav",1)(3,"h1")(4,"strong",2),e._uU(5,"Tipo persona"),e.qZA()(),e.TgZ(6,"ol",3)(7,"li",4)(8,"a",5),e._uU(9,"Inicio"),e.qZA()(),e.TgZ(10,"li",6)(11,"a",7),e._uU(12,"Tipo persona"),e.qZA()()()()(),e.TgZ(13,"mat-card")(14,"mat-card-content"),e.YNc(15,ie,2,0,"div",8),e.ALo(16,"async"),e.YNc(17,ge,17,12,"section",9),e.ALo(18,"async"),e.qZA()()(),e.TgZ(19,"div",10)(20,"div",11)(21,"div",12)(22,"div",13)(23,"h5",14),e._uU(24,"Modal title"),e.qZA(),e._UZ(25,"button",15),e.qZA(),e.YNc(26,Ze,12,4,"div",16),e.ALo(27,"async"),e.qZA()()()),2&i&&(e.xp6(8),e.Q6J("routerLink",e.DdM(10,Ae)),e.xp6(7),e.Q6J("ngIf",e.lcZ(16,4,o._service.responseCargando$)),e.xp6(2),e.Q6J("ngIf",!e.lcZ(18,6,o._service.responseCargando$)),e.xp6(9),e.Q6J("ngIf",0!=e.lcZ(27,8,o._service.response$).length))},dependencies:[_.sg,_.O5,h.rH,S.Hw,g.lW,g.nh,m.a8,m.dn,v.Nt,p.KE,p.hX,p.R9,E.Ou,b.NW,c.Fj,c.JJ,c.On,_.Ov,_.gd,_.OU]})}return n})()}];let xe=(()=>{class n{static#e=this.\u0275fac=function(i){return new(i||n)};static#t=this.\u0275mod=e.oAB({type:n});static#n=this.\u0275inj=e.cJS({imports:[h.Bz.forChild(Ie),h.Bz]})}return n})();var Ce=a(5089);let Pe=(()=>{class n{static#e=this.\u0275fac=function(i){return new(i||n)};static#t=this.\u0275mod=e.oAB({type:n});static#n=this.\u0275inj=e.cJS({imports:[_.ez,xe,Ce.q,c.u5,c.UX]})}return n})()}}]);