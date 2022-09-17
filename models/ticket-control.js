const path = require('path'); // Este es el path de donde lo vamos a guardar
const fs = require('fs'); // metodo para grabar un archivo

class Ticket { 

    constructor ( numero, escritorio ){ // Constructor -> recibo de argumento un numero y un escritorio
        this.numero = numero;
        this.escritorio = escritorio;
    }

}

class TickeControl { 


    constructor(){ //Constructor con todas las propiedades que vamos a utilizar
        this.ultimo  = 0; // ultimo ticket que estamos atendiendo
        this.hoy = new Date().getDate(); // 17 : Fecha actual solo el "dia"
        this.tickets = []; // Arreglo de tickets
        this.ultimos4 = []; //Arreglo de los ultimos 4 tickets que se mostraran en el front

        this.init(); // leamos el archivo de la ../db/data.json y leamos sus propiedades

    }

    get toJson(){ // Sirve para serializar y guardarlos en la base de datos/data.json
        return{
            ultimo:this.ultimo,
            hoy:this.hoy,
            tickets:this.tickets,
            ultimos4:this.ultimos4,
        }
    }

    init(){ // Inicializamos nuestro servidor para guardar en la base de datos, establecemos los valores si es el mismo dia

        const {hoy, tickets, ultimo, ultimos4} = require('../db/data.json'); // data.json se conviernte en un {} -> que es un objeto de javascript
        
        if( hoy === this.hoy){ //Si "hoy" se encuentra en este archivo es igual al hoy de la propiedad de mi clase (this.hoy)
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }
        else {
            // Es otro dia, lo guardamos en la base de datos
            this.guardarDB();
        }
    }

    guardarDB() { // Forma de grabar en la base de datos.
        //TODO: hacer la carpeta db que permita accesos a lectura y escritura
        const dbPath = path.join( __dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson)); //Se graba el dbPath y un string en este caso como data.json es un "JSON" 
        //y no un string se utiliza una propiedad de JSON el "Stringify"
    };


    siguiente() { //Asignar cual es el siguiente ticket

        this.ultimo += 1; // forma rapida de hacer un acumulador
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push( ticket );
        this.guardarDB();

        return 'Ticket ' + ticket.numero;

    }


    atenderTicket( escritorio ){

        //No tenemos tickets
        if (this.tickets.length === 0) {
            return null;
        }

        /*const ticket = this.tickets[0];  */// quiero saber cual es el numero de ticket y quiero el primero
        const ticket = this.tickets.shift() // .tickets[0]; con esto elimino un elemento del array de tickets

        ticket.escritorio = escritorio; // Este es el ticket que necesito atender ahora
        this.ultimos4.unshift(ticket); // "unshift" añade al principio un elemento nuevo al arreglo


        if (this.ultimos4.length > 4) { // Debemos validar que los ultimos sean 4
            this.ultimos4.splice(-1,1); // Solamente elimine o corte el ultimo elemento del arreglo
        }

        console.log(this.ultimos4); // Mostramos los ultimos 4 elementos del array
        
        this.guardarDB(); //guardamos en la base de datos

        return ticket // mostramos el ticket que estamos atendiendo en el escritorio


    }



}


module.exports = TickeControl











