import { Cuenta } from "./Cuenta.mjs";

const cuentaMarcos = new Cuenta("Marcos", 100);

console.log(cuentaMarcos.ingresar(10));
console.log(cuentaMarcos.getCantidad());
console.log(cuentaMarcos.retirar(50));
console.log(cuentaMarcos.getCantidad());
console.log(cuentaMarcos.ingresar(10));
console.log(cuentaMarcos.getCantidad());
console.log(cuentaMarcos.retirar(50));
console.log(cuentaMarcos.getCantidad());
console.log(cuentaMarcos.retirar(100));